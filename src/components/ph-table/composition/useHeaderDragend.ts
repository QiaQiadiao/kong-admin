import { PhTableColumn } from '@/components/common/ph-table'
import { Ref } from 'vue'
import { LocalUtil } from '@/utils/store'
import { globalStore } from '@/store/modules/global'

export type idFn = () => string

/**
 * 列宽缓存hook
 * @param id 唯一id，用于session记录
 * @param headerConfig 列配置
 */
export const useHeaderDragend = (
  id: string | idFn,
  headerConfig: Array<PhTableColumn> | Ref<Array<PhTableColumn>>
) => {
  const { userInfo } = storeToRefs(globalStore())
  const headers = ref<Array<PhTableColumn>>([])
  const columnsWidth = ref<Record<string, number>>({})

  watch(
    isRef(headerConfig) ? headerConfig : () => unref(headerConfig),
    () => {
      if (typeof id !== 'string') {
        // 若id为动态，则每次都需要更新cache
        loadCache()
      }
      headers.value = geneHeaderConfig()
    },
    { immediate: true }
  )

  /**
   * el-table 列宽
   * @param newWidth
   * @param oldWidth
   * @param column
   * @param event
   */
  function onHeaderDragend(newWidth: number, oldWidth: number, column: any, event: Event) {
    columnsWidth.value[column.property] = newWidth
    setCache()
    headers.value = geneHeaderConfig()
  }

  /**
   * 生成table headers配置
   */
  function geneHeaderConfig(): Array<PhTableColumn> {
    return unref(headerConfig).map((column) => {
      if (column.prop && columnsWidth.value[column.prop!]) {
        return {
          ...column,
          width: columnsWidth.value[column.prop!]
        }
      }
      return column
    })
  }

  /**
   * 设置缓存
   */
  function setCache() {
    LocalUtil.write(getCacheKey(), JSON.stringify(columnsWidth.value))
  }

  /**
   * 获取缓存说数据
   */
  function loadCache() {
    columnsWidth.value = (LocalUtil.readJson(getCacheKey()) as Record<string, number>) || {}
  }

  /**
   * 获取缓存key
   */
  function getCacheKey() {
    const idText = typeof id === 'string' ? id : id()
    return `_cache_header_dragend_${userInfo.value.userId}_${idText}`
  }

  /**
   * 清空缓存
   */
  function clearCache() {
    LocalUtil.remove(getCacheKey())
    columnsWidth.value = {}
    headers.value = geneHeaderConfig()
  }

  // 先获取一次缓存
  loadCache()

  return {
    headers,
    onHeaderDragend,
    clearCache,
    clearAllCache,
    columnsWidth
  }
}

/**
 * 清空所有列缓存
 */
export const clearAllCache = () => {
  console.log(1)
}
