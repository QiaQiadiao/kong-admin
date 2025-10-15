import { ElCheckbox } from 'element-plus'
import type { Store } from 'element-plus/es/components/table/src/store'
import type { TableColumnCtx } from 'element-plus/es/components'
import { isArray, isBoolean } from 'lodash'
import { h, computed, ref } from 'vue'

interface CellInterface<T> {
  row: T
  column: TableColumnCtx<T>
  store: Store<T>
  index: number
  checkboxNode: any
}

interface Props {
  selectable: (row: any) => boolean
  rowKey: string
}

export const useCustomSelection = (customSelectionAttr: Props, tableConfig: any) => {
  const computedRowKey = computed(() => customSelectionAttr?.rowKey || 'id')

  const computedRowKeySelection = computed(() => {
    return (selection.value || [])
      .map((item) => item[computedRowKey.value])
      .filter((item) => item !== undefined && item !== null)
  })

  const computedRowKeyTableCurShowData = computed(() => {
    return (tableConfig?.data || [])
      .map((item: any) => item[computedRowKey.value])
      .filter((item: any) => item !== undefined && item !== null)
  })

  // 表头是否为全选状态
  const isHeaderSelectAll = computed(() => {
    if (selection.value?.length === 0) {
      return false
    }
    return curTableRowDataAllInSelection(
      computedRowKeySelection.value,
      computedRowKeyTableCurShowData.value
    )
  })

  // 表头是否为半全选状态
  const isHeaderHalfSelected = computed(() => {
    if (selection.value?.length === 0) {
      return false
    }
    return (
      !isHeaderSelectAll.value &&
      arr1HasItemInArr2(computedRowKeySelection.value, computedRowKeyTableCurShowData.value)
    )
  })

  // 当前选中的数据（支持跨页多选）
  const selection: Ref<any[]> = ref([])

  // 表格行是否处于选中状态
  const isCellSelected = (row: any) => {
    return computedRowKeySelection.value.includes(row[computedRowKey.value])
  }

  // 表格行是否处于半选中状态
  const isCellIndeterminate = (row: any) => {
    // 是否有子节点
    const hasChildren = row.children && !!row?.children?.length
    // 选中的数据中存在其中一个子节点
    const hasSelected = selection.value.some((item) => row.children && row.children.includes(item))
    // 获取当前的子节点中，已勾选了几条数据
    const selectCount = selection.value.filter(
      (item) => row.children && row.children.includes(item)
    ).length
    return hasChildren && hasSelected && selectCount !== row.children.length
  }

  /**
   * 找到父级数据
   * @param row 当前数据项
   * @param dataList 表格全部数据
   * @returns
   */
  function findParent(row: any, dataList = []): { children: any[] } | undefined {
    return dataList.find(
      (item: any) => Reflect.has(item, 'children') && item.children?.includes(row)
    )
  }

  /**
   * 校验父级数据是否选中
   * @param row 当前数据
   * @param store
   */
  function checkAllSelected(row: any, store: Store<any>) {
    // 找到父级数据
    const parent = findParent(row, store.states.data.value)
    if (parent) {
      // 获取当前的子节点中，已勾选了几条数据
      const selectCount = selection.value.filter(
        (item) => parent.children && parent.children.includes(item)
      ).length
      if (parent && !isCellSelected(parent)) {
        selection.value.push(parent)
      } else if (parent && isCellSelected(parent) && !selectCount) {
        // 反选，删除父级元素
        selection.value.splice(selection.value.indexOf(parent), 1)
      }
    }
  }

  /**
   * 切换行数据的选中状态
   */
  function toggleRowStatus(row: any, newVal?: boolean) {
    const index = computedRowKeySelection.value.indexOf(row[computedRowKey.value])
    const included = index !== -1

    const toggleStatus = (type: 'add' | 'remove') => {
      if (type === 'add') {
        selection.value.push(row)
      } else {
        selection.value.splice(index, 1)
      }
      if (isArray(row.children)) {
        row.children.forEach((item: any) => {
          toggleRowStatus(item, newVal ?? !included)
        })
      }
    }

    if (isBoolean(newVal)) {
      if (newVal && !included) {
        toggleStatus('add')
      } else if (!newVal && included) {
        toggleStatus('remove')
      }
    } else {
      included ? toggleStatus('remove') : toggleStatus('add')
    }
  }

  /**
   * 渲染复选框单元格
   */
  const renderSelectionCell = ({ row, column, store, index }: CellInterface<any>) => {
    return h(ElCheckbox, {
      disabled: column.selectable ? !column.selectable.call(null, row, index) : false,
      size: store.states.tableSize.value,
      indeterminate: isCellIndeterminate(row),
      onChange: (val) => {
        toggleRowStatus(row, !!val)
        checkAllSelected(row, store)
      },
      onClick: (event: Event) => event.stopPropagation(),
      modelValue: isCellSelected(row)
    })
  }

  /**
   * 渲染复选框单元格头部
   */
  const renderSelectionHeader = ({ store }: { store: Store<any> }) => {
    function isDisabled() {
      return store.states.data.value && store.states.data.value.length === 0
    }

    /**
     * 全部切换
     */
    function toggleAllSelection(value: any) {
      store.states.data.value.forEach((item: any) => {
        if (customSelectionAttr.selectable(item)) {
          toggleRowStatus(item, !!value)
        }
        if (customSelectionAttr.selectable(item) && isArray(item.children)) {
          item.children.forEach((child: any) => {
            toggleRowStatus(child, !!value)
          })
        }
      })
    }

    return h(ElCheckbox, {
      disabled: isDisabled(),
      size: store.states.tableSize.value,
      indeterminate: isHeaderHalfSelected.value,
      'onUpdate:modelValue': toggleAllSelection,
      modelValue: isHeaderSelectAll.value
    })
  }

  /**
   * 数组1是否存在元素在数组2里
   * @param arr1
   * @param arr2
   * @returns
   */
  function arr1HasItemInArr2(arr1: any[], arr2: any[]) {
    const set1 = new Set(arr1)
    const set2 = new Set(arr2)
    for (const item of set1) {
      if (set2.has(item)) {
        return true
      }
    }
    return false
  }

  /**
   * 当前表格的所有行数据是否都被勾选上
   * @param selectList 勾选的数组
   * @param showList 当前表格展示的行数据
   * @returns
   */
  function curTableRowDataAllInSelection(selectList: any[], showList: any[]) {
    const set1 = new Set(selectList)
    const set2 = new Set(showList)

    for (const item of set2) {
      if (!set1.has(item)) {
        return false
      }
    }

    return true
  }

  return {
    renderSelectionCell,
    renderSelectionHeader,
    selection
  }
}
