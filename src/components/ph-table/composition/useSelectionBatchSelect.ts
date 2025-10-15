import { useKeyboardListener } from '@/views/asset/Creative/composables/hook-keyboard-listener'
import type { ElTable } from 'element-plus'
import { findIndex, isNumber } from 'lodash'
import  { nextTick, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
export const useSelectionBatchSelect = (
  tableRef: Ref<InstanceType<typeof ElTable>>,
  tableData: Ref<any[]>
) => {
  const { isShiftPress } = useKeyboardListener()

  // 当前选中的区间下标
  const indexInterval = ref<Array<number>>([])

  /**
   * 设置选中区间数据
   */
  function checkedInterval() {
    const willAddData = tableData.value.slice(...indexInterval.value.sort((a, b) => a - b))

    nextTick(() => {
      willAddData.forEach((item) => {
        tableRef.value?.toggleRowSelection(item, true)
      })
    })

    // 去重
    isShiftPress.value = false
    indexInterval.value = []
  }

  /**
   * 复选框选中事件
   * @param row
   */
  function rowSelectionChange(row: any, isCheck: boolean) {
    const index = findIndex(tableData.value, row)

    // 如果index无效，则直接返回
    if (index === -1) return

    // 清除选择范围，如果之前已经设置了范围
    if (isNumber(indexInterval.value[0]) && isNumber(indexInterval.value[1])) {
      indexInterval.value = []
    }

    // 如果Shift键被按下
    if (isCheck && isShiftPress.value) {
      // 更新选择范围的开始或结束
      if (isNumber(indexInterval.value[0])) {
        indexInterval.value[1] = index
      } else {
        indexInterval.value[0] = index
      }

      // 如果范围有效，则调用checkedInterval函数
      if (isNumber(indexInterval.value[0]) && isNumber(indexInterval.value[1])) {
        checkedInterval()
      }
    } else if (isCheck) {
      // 如果Shift键未被按下，则只设置选择范围的开始
      indexInterval.value = [index]
    } else if (indexInterval.value.includes(index)) {
      // 如果取消选择并且当前行在范围内，则清除选择范围
      indexInterval.value = []
    }
  }

  onMounted(() => {
    indexInterval.value = []
  })

  return {
    rowSelectionChange
  }
}
