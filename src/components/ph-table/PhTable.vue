<!-- 该组件的文档：https://www.yuque.com/u910556/ch1be0/suxa6h -->
<template>
  <div :class="['ph-page-table', { 'sticky-head': stickyHead }]">
    <div v-loading="tableConfig.loading" class="ph-page-table__content">
      <tableWarp></tableWarp>
      <descriptionToolTip></descriptionToolTip>
    </div>
    <div
      v-if="(pagination || tableConfig.pagination) && !tableConfig.error && tableConfig.pageTotal"
      class="ph-page-table__pagination"
    >
      <ElPagination
        :current-page="tableConfig.pageIndex"
        :page-size="tableConfig.pageSize"
        :page-sizes="pageSizeList"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableConfig.pageTotal"
        :disabled="tableConfig.loading"
        @update:current-page="handleCurrentPage"
        @update:page-size="handlePageSize"
      />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import { useFormatter } from '@/components/ph-table/composition/useFormatter'
import { isUndefined, get, difference, isFunction, isNil } from 'lodash'
import { useTableProps } from '@/components/ph-table/composition/useTableTools'
import { mergeProps } from 'vue'
import { TABLE_SORT_ORDERS } from '@/global/constants/index'
import { useDescription } from '@/components/ph-table/composition/useDescription'
import type { PhTableColumn, PhTableColumnFormatter } from '@/components/ph-table/index'
import type { idFn } from '@/components/ph-table/composition/useHeaderDragend'
import {  useHeaderDragend } from '@/components/ph-table/composition/useHeaderDragend'
import { i18n } from '@/utils/vue-i18n'
import { cellForced } from 'element-plus/es/components/table/src/config'
import { useCustomSelection } from '@/components/ph-table/composition/useCustomSelection'
import PhEmpty from '@/components/ph-empty/PhEmpty.vue'
import { useSelectionBatchSelect } from '@/components/ph-table/composition/useSelectionBatchSelect'

interface TableProps {
  /**
   * Table数据源
   */
  data?: Array<any>
  headers: Array<PhTableColumn>
  /**
   * 表头悬浮
   */
  stickyHead?: boolean
  /**
   * Border
   */
  border?: boolean
  /**
   * 选择器
   */
  selection?: boolean
  /**
   * 支持整行选中
   */
  selectionRowClick?: boolean
  /**
   * selection渲染函数
   */
  selectionRender?: any
  modelValue?: Array<any>
  selectionDefaultList?: Array<string>
  selectionPage?: boolean
  selectionAttr?: any
  /**
   * 表格loading
   */
  loading?: boolean
  error?: boolean
  errorQuery?: () => void
  /**
   * 分页器
   */
  pagination?: boolean
  pageSize?: number
  pageIndex?: number
  pageTotal?: number
  pageSizeList?: Array<number>
  headerDragendCacheId?: string | idFn
  /**
   * 空文本
   */
  emptyText?: string
  errorText?: string
  emptyCellPlaceholder?: string
  /**
   *
   */
  cellProps?: any
  /**
   * 虚拟化
   */
  virtualized?: boolean
  /**
   * 表格控制器
   */
  tableController?: any
  /**
   * 是开启首次自动查询
   */
  immediate?: boolean
  /**
   * 是否开启自定义 复选框
   */
  customSelection?: boolean
  /**
   * 自定义 复选框的属性值
   */
  customSelectionAttr?: any
  /**
   * 是否开启shift批量选中数据
   */
  shiftBatchSelect?: boolean
}

defineOptions({
  name: 'ph-table'
})

const { t } = i18n.global

const $tableRef = ref<InstanceType<typeof ElTable>>()
const tableProps = withDefaults(defineProps<TableProps>(), {
  pageSize: 10,
  pageIndex: 0,
  pageTotal: 0,
  pageSizeList: () => [10, 20, 50],
  immediate: true,
  shiftBatchSelect: true
})

const emit = defineEmits([
  'update:modelValue',
  'update:pageIndex',
  'update:pageSize',
  'paginationChange',
  'sortChange',
  'select',
  'selectionChange',
  'rowClick'
])

// ----------------------------selection 双向绑定------------------------------------
if (tableProps.selection) {
  watch(() => tableProps.modelValue, handleModelValueChanged)
}

/**
 * 处理modelValue变更
 */
function handleModelValueChanged() {
  if (tableProps.modelValue) {
    const { toggleRowSelection } = $tableRef.value

    const willSetNoChecked = difference(selectionCheckList.value, tableProps.modelValue)
    const willSetChecked = difference(tableProps.modelValue, selectionCheckList.value)

    willSetNoChecked.forEach((i) => toggleRowSelection(i, false))
    willSetChecked.forEach((i) => toggleRowSelection(i, true))
  }
}

// ---------------------------- 控制器逻辑 ----------------------------
const { isHasTableController, tableConfig, tableList } = useTableProps(tableProps)

// ---------------------------- 自动缓存列宽 ------------------------------------
let _headers: any
let onHeaderDragend: any
let clearCache: any
if (tableProps.headerDragendCacheId) {
  const useResult = useHeaderDragend(tableProps.headerDragendCacheId, toRef(tableProps, 'headers'))
  _headers = useResult.headers
  onHeaderDragend = useResult.onHeaderDragend
  clearCache = function () {
    useResult.clearCache()
    // tableKey.value = String(new Date().getTime())
  }
}

/**
 * 排序相关
 */
function handleSortChange(sortProp: any) {
  emit('sortChange', sortProp)
}

// ----------------------------------- 分页
function handleCurrentPage(pageIndex: number) {
  emit('update:pageIndex', pageIndex)
  emitPage(pageIndex)
}
function handlePageSize(pageSize: number) {
  emit('update:pageSize', pageSize)
  emit('update:pageIndex', 1)
  emitPage(1, pageSize)
}
function emitPage(pageIndex: number, pageSize: number = tableConfig.value.pageSize) {
  if (isHasTableController.value) {
    // 设置分页
    tableConfig.value.pageIndex = pageIndex
    tableConfig.value.pageSize = pageSize
    tableProps.tableController?.query()
  }
  emit('paginationChange', {
    pageSize,
    pageIndex
  })
}

// ----------------------------------- 多选
const selectionCheckList = ref<Array<any>>([])

// 按shift 批量选中数据
const { rowSelectionChange } = useSelectionBatchSelect(
  $tableRef as Ref<InstanceType<typeof ElTable>>,
  tableList
)

/**
 * 表格复选框选中事件
 * @param selection
 * @param row
 */
function handleSelectionClick(selection: any[], row: any) {
  tableProps.shiftBatchSelect && rowSelectionChange(row, selection.includes(row))
  emit('select', selection, row)
}

/**
 * 处理选中
 */
function handleSelectionChange(selection: Array<any>) {
  selectionCheckList.value = selection
  emitModelValue()
  emit('selectionChange', selection)
}

/**
 * 处理整行点击
 * @param row
 * @param column
 * @param event
 */
function handleRowClick(row: any, column: any, event: any) {
  const rowDisabled = tableProps.selectionAttr?.selectable
    ? !tableProps.selectionAttr.selectable.call(null, row)
    : false
  if (tableProps.selectionRowClick && !rowDisabled) {
    $tableRef.value?.toggleRowSelection(row)
  }
  emit('rowClick', row, column, event)
}

function emitModelValue() {
  emit('update:modelValue', selectionCheckList.value)
}

// ----------------------------------- 对外
/**
 * 刷新表格
 */
function refreshTable(resetPage = false) {
  if (!isHasTableController.value) {
    console.warn('不是tableController模式')
    return false
  }

  tableProps.tableController?.resetData(false, resetPage)
}

/**
 * 初始化TableHeader
 */
function createTableHeader(): Array<any> {
  const tableHeaderProp = tableProps.headerDragendCacheId ? unref(_headers) : tableProps.headers

  const _tableHeader = tableHeaderProp.map(
    (item: Partial<PhTableColumn<unknown>>, index: number) => {
      let _cacheItem = { ...item } as Partial<PhTableColumn>

      // 替换format
      if (
        typeof _cacheItem.formatter === 'string' &&
        !!tableFormatter[_cacheItem.formatter as PhTableColumnFormatter]
      ) {
        _cacheItem = {
          ..._cacheItem,
          ...tableFormatter[_cacheItem.formatter as PhTableColumnFormatter]
        }
      }

      // sort
      if (_cacheItem.sort && isUndefined(_cacheItem.sortable)) {
        _cacheItem.sortable = 'custom'
      }

      // 指定数据在排序时所使用排序策略的轮转顺序
      if (_cacheItem.sortable && isUndefined(_cacheItem?.sortOrders)) {
        _cacheItem.sortOrders = TABLE_SORT_ORDERS
      }

      // 添加不可拖动
      if (index === tableProps.headers.length - 1) {
        _cacheItem.resizable = false
      }

      delete _cacheItem.type

      return _cacheItem
    }
  )

  if (tableProps.selection) {
    const selectionAttr = { ...tableProps.selectionAttr }

    // 默认忽略合计
    const defaultSelectable = (row: any) => {
      return !row.isSummary
    }

    if (selectionAttr.selectable) {
      const _selectable = selectionAttr.selectable
      selectionAttr.selectable = (row: any, index: number) => {
        return defaultSelectable(row) && _selectable(row, index)
      }
    } else {
      selectionAttr.selectable = defaultSelectable
    }
    _tableHeader.unshift({
      type: 'selection',
      ...selectionAttr
    })
  }

  if (tableProps.customSelection) {
    _tableHeader.unshift({
      type: 'customSelection',
      width: 48,
      minWidth: 48,
      realWidth: 48,
      order: '',
      ...tableProps.customSelectionAttr
    })
  }

  return _tableHeader
}

/**
 * 重试
 */
function retry() {
  if (isHasTableController) {
    tableProps.tableController?.query()
  } else {
    console.warn('不是tableController模式')
  }

  if (tableProps.errorQuery) {
    tableProps.errorQuery()
  }
}

// ----------------------------------- description tooltip ------------------------
const { DescriptionToolTip, tableHeaderDescriptionCell } = useDescription()

const {
  renderSelectionCell,
  renderSelectionHeader,
  selection: customSelectionValue
} = useCustomSelection(tableProps.customSelectionAttr, tableConfig)

const tableSlot = useSlots()
const tableAttrs = useAttrs()
const tableFormatter = useFormatter()

const { selection } = cellForced

const tableWarp = () => {
  /**
   * 列
   */
  const columnList = createTableHeader().map((item) => {
    let customRender = item.render
    if (customRender) {
      if (
        Object.prototype.toString.call(customRender) !== '[object Function]' &&
        customRender.render
      ) {
        customRender = (props: any) => h(item.render, props)
      }
    }

    const columnItemRender = customRender || tableSlot[`item.${item.prop}`]
    const _cacheItem = { ...item }

    // 接管Cell渲染
    const defaultSlot = (props: any) => {
      // 存在嵌套
      if (item.children && item.children.length) {
        return item.children.map((child: any) =>
          h(ElTableColumn, child, {
            default: tableSlot[`item.${child.prop}`]
          })
        )
      }

      const { row, column, $index: index, store } = props
      const cellValue = get(row, column.property)

      let formatValue: string | undefined

      if (column.formatter) {
        formatValue = column.formatter(row, { ...item, ...column }, cellValue, index)
      }

      if (item.type === 'selection') {
        const selectionRender = tableSlot?.selection || tableProps.selectionRender
        const checkboxNode = () => selection.renderCell(props)
        const isDisabled = column.selectable ? !column.selectable.call(null, row, index) : false
        return selectionRender
          ? selectionRender({
              cellValue,
              row,
              store,
              column,
              index,
              formatValue,
              isDisabled,
              checkboxNode
            })
          : null
      }

      if (item.type === 'customSelection') {
        const selectionRender =
          tableSlot?.customSelection ||
          tableProps.customSelectionAttr.selectionRender ||
          renderSelectionCell
        const checkboxNode = () => renderSelectionCell(props)
        return selectionRender
          ? selectionRender({
              row,
              store,
              column,
              index,
              checkboxNode
            })
          : null
      }

      if (!columnItemRender) {
        // 只有为空的时候才展示默认展位符，否则正常展示数据
        return isNil(formatValue || cellValue) ? item.cellPlaceholder || tableProps.emptyCellPlaceholder :  formatValue || cellValue
      }

      const customProp = isFunction(tableProps.cellProps)
        ? tableProps.cellProps()
        : tableProps.cellProps

      return columnItemRender({
        cellValue,
        row,
        store,
        column,
        index,
        formatValue,
        customProp
      })
    }

    // 接管Header渲染
    const headerSlot = (props: any) => {
      let _columnHeaderRender = item.headerRender

      if (_columnHeaderRender) {
        if (
          Object.prototype.toString.call(_columnHeaderRender) !== '[object Function]' &&
          _columnHeaderRender.render
        ) {
          _columnHeaderRender = (props: any) => h(item.headerRender, props)
        }
      }

      const columnHeaderRender = _columnHeaderRender || tableSlot[`header.${item.prop}`]

      const { column, store } = props

      if (columnHeaderRender) {
        return columnHeaderRender(props)
      }

      if (item.description) {
        return tableHeaderDescriptionCell(item.description, column.label, item.showDescIcon)
      }

      if (item.type === 'customSelection') {
        return renderSelectionHeader({ store })
      }

      return column.label
    }

    return h(ElTableColumn, _cacheItem, {
      default: defaultSlot,
      header: headerSlot
    })
  })

  /**
   * 空提示文本
   */
  const emptyTip = computed(() => {
    if (tableConfig.value.error) {
      return tableProps.errorText || t('common.msg.network_error')
    } else {
      return tableProps.emptyText
    }
  })

  /**
   * 空
   */
  const emptyVNode =
    (tableSlot.empty && tableSlot.empty()) ||
    (tableConfig.value.loading
      ? h('div', { class: 'ph-page-table_loading' })
      : h(
          PhEmpty,
          {
            type: tableConfig.value.error ? 'network' : 'default',
            tip: emptyTip.value
          },
          {
            default: tableConfig.value.error
              ? h(ElButton, { onClick: retry }, t('common.msg.retry'))
              : null
          }
        ))

  // 支持默认插槽
  const tableDefaultSlot = tableSlot.default ? tableSlot.default() : null

  return h(
    ElTable,
    mergeProps(tableAttrs, {
      ref: $tableRef,
      class: [{ 'is-border': tableProps.border, 'is-row-click': tableProps.selectionRowClick }],
      data: tableConfig.value.error ? [] : tableList.value,
      border: true,
      tooltipEffect: 'light',
      onSortChange: handleSortChange,
      onSelect: handleSelectionClick,
      onSelectionChange: handleSelectionChange,
      onRowClick: handleRowClick,
      onHeaderDragend
    }),
    {
      default: () => [tableDefaultSlot, columnList],
      empty: () => emptyVNode,
      append: tableSlot.append
    }
  )
}

defineExpose({
  $tableRef,
  clearCache,
  refreshTable,
  customSelectionValue
})
</script>

<style lang="scss">
.ph-page-table {
  &__header-description {
    position: relative;
    &_container {
      position: absolute;
      top: 0;
    }
  }

  .el-table {
    .el-table__cell {
      &.ascending {
        .sort-caret.ascending {
          color: $ph-fill-color-5;
        }
      }
      &.descending {
        .sort-caret.descending {
          color: $ph-fill-color-5;
        }
      }
    }

    &.is-row-click {
      .hover-row,
      .el-table__row {
        cursor: pointer;
      }
    }

    .sort-caret {
      display: inline-block;
      font-family: 'phicon' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      border: 0;
      width: 16px;
      height: 10px;
      line-height: 10px;
      left: 6px;
      color: #c9cdd4;
      &:before {
        content: '\e65d';
      }
      &.ascending {
        transform: rotate(180deg);
        top: -3px;
      }
      &.descending {
        bottom: -1px;
      }
    }

    &.el-table--border:not(.is-border) {
      &::before,
      &::after,
      .el-table__border-left-patch {
        display: none;
      }
      .el-table__header {
        th {
          border-width: 1px 0;
          .cell {
            border-right: 1px solid $ph-border-color;
          }

          &:first-child {
            border-left: 0;
          }
          &.el-table-fixed-column--left.is-last-column {
            .cell {
              margin-right: -1px;
            }
          }
          &:last-child {
            .cell {
              border-right: 0;
            }
          }
        }
      }

      .el-table__body {
        td {
          border-width: 1px 0;

          &:first-child {
            border-left: 0;
          }
          &:last-child {
            .cell {
              border-right: 0;
            }
          }
        }
      }
      .el-table__empty-block {
        // 兼容使用自定义空状态表插槽出现表格高度计算异常
        min-height: 550px;
      }
    }
  }

  @include Global.element(pagination, &) {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
  }

  @include Global.modifier(loading) {
    min-height: 550px;
  }

  &.sticky-head {
    .el-table,
    .el-table__fixed {
      overflow: visible;
    }
    .el-table__header-wrapper,
    .el-table__fixed-header-wrapper {
      // overflow: hidden; 实现表格body部分滚动时，header部分也滚动;
      // overflow: visible; 实现不了这个效果
      overflow: hidden;
      position: sticky !important;
      top: 0;
      z-index: 1;
    }
    .el-table__fixed-body-wrapper {
      width: 100%;
      overflow: hidden;
    }
    table {
      position: sticky;
      top: 0;
    }
    .el-table__fixed {
      .el-table__row {
        td.is-hidden {
          // 设为不可见 如果display 的话 他的高度不能继承
          visibility: hidden;
        }
      }
    }
  }
}
</style>
