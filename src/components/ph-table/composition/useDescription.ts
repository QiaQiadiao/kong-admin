import { ElTooltip } from 'element-plus'
import type { VNode } from 'vue'
import PhIconVue from '@/components/ph-icon/PhIcon.vue'
import { h, nextTick, ref } from 'vue'
export const useDescription = () => {
  const $HeadCellRef = ref()
  const descriptionVisible = ref(false)
  const descriptionText = ref('')

  /**
   * Description ToolTip VNode
   * @constructor
   */
  const DescriptionToolTip = () => {
    return h(ElTooltip, {
      visible: descriptionVisible.value,
      virtualRef: $HeadCellRef.value,
      virtualTriggering: true,
      trigger: 'hover',
      effect: 'light',
      placement: 'top',
      rawContent: true,
      content: descriptionText.value
    })
  }
  const DescriptionToolProps = (description: string) => {
    return {
      onMouseenter: (e: Event) => {
        $HeadCellRef.value = e.currentTarget
        descriptionText.value = description
        nextTick(() => {
          descriptionVisible.value = true
        })
      },
      onMouseleave: (e: Event) => {
        descriptionVisible.value = false
      }
    }
  }
  /**
   * Description container VNode
   * @param description
   * @param children
   * @param showDescIcon 是否显示描述的图标
   */
  const tableHeaderDescriptionCell = (
    description: string,
    children: VNode,
    showDescIcon?: boolean
  ) => {
    if (showDescIcon) {
      return h(
        'div',
        {
          class: 'ph-flex-middle'
        },
        [
          h('span', null, children),
          h(PhIconVue, {
            type: 'ph-wenhaohuise',
            class: 'ml-1 tips-icon el-tooltip__trigger el-tooltip__trigger',
            style: 'cursor: pointer;',
            ...DescriptionToolProps(description)
          })
        ]
      )
    }
    return h(
      'span',
      {
        class: 'ph-page-table__header-description',
        ...DescriptionToolProps(description)
      },
      children
    )
  }

  return {
    $HeadCellRef,
    descriptionVisible,
    descriptionText,
    DescriptionToolTip,
    tableHeaderDescriptionCell
  }
}
