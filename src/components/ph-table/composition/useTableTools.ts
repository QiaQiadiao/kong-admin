import { cloneDeep } from 'lodash'
import { StatusType, TableControllerOption } from '@/components/common/ph-table'
import { useScrollRef } from '@/hooks/modules/hook-global'

export interface TableControllerInstance {
  tableList: any
  tableOption: any
  resetStatus: (type?: StatusType) => Promise<unknown>
  resetData: () => void
  resetPage: () => void
  query: () => Promise<unknown>
}

/**
 * 表格控制器
 */
export const useTableController = (
  serviceFn: any,
  formData: Ref = ref({}),
  optionsConfig?: TableControllerOption
): TableControllerInstance => {
  const options = Object.assign(
    {
      closeScrollTop: true,
      shoallowData: true
    },
    optionsConfig || {}
  )
  const { $ScrollRef } = useScrollRef()

  const tableList = options?.shoallowData ? shallowRef<Array<any>>([]) : ref<Array<any>>([])
  const dataProperties = {
    loading: false,
    error: false,
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,
    pagination: true,
    ...(options.defaultOption || {})
  }
  const tableOption = reactive(dataProperties)
  // const tableOption = options.shoallowData
  //   ? shallowReactive(dataProperties)
  //   : reactive(dataProperties)

  // abort控制器
  let abortController = new AbortController()

  // 缓存的formData数据
  const _cacheData = cloneDeep(unref(formData))

  // 缓存的page设置
  const _cachePage = cloneDeep({
    pageIndex: tableOption.pageIndex,
    pageSize: tableOption.pageSize
  })

  /**
   * 重置数据状态，不包含pageSize
   * @param type
   */
  function resetStatus(type: StatusType = 'page') {
    tableList.value = []
    // 重置状态
    if (type === 'form') {
      resetFormData()
    }

    // 只重置分页页数
    tableOption.pageIndex = _cachePage.pageIndex

    return query()
  }

  /**
   * 重置FormData
   */
  function resetFormData() {
    formData.value = cloneDeep(_cacheData)
  }

  /**
   * 重置分页
   */
  function resetPage() {
    Object.assign(tableOption, _cachePage)
  }

  /**
   * 发起请求
   */
  async function query() {
    if (tableOption.loading) {
      if (options.abort) {
        abortController.abort()
      } else {
        return false
      }
    }

    // 检查abort
    if (abortController.signal.aborted) {
      abortController = new AbortController()
    }

    tableOption.error = false
    tableOption.loading = true
    try {
      // 前置
      if (options.beforeQuery) {
        const flag = await options.beforeQuery()
        if (flag === false) {
          tableOption.loading = false
          return false
        }
      }

      const asyncPromiseList = [
        serviceFn(
          {
            ...unref(formData),
            pageIndex: tableOption.pageIndex,
            pageSize: tableOption.pageSize
          },
          abortController
        )
      ]

      // 数据汇总
      if (options.dataSummary) {
        asyncPromiseList.push(options.dataSummary())
      }

      const [tableResult, summaryRes] = await Promise.all(asyncPromiseList)

      // 正常列表结果
      if (tableResult) {
        tableList.value = tableResult.data?.list || []
        tableOption.pageTotal = tableResult.data?.total || 0
        tableOption.pageIndex = tableResult.data?.pageIndex || 1

        // 汇总结果
        if (summaryRes && tableList.value.length) {
          summaryRes.isSummary = true
          // 判断是否存在total字段
          // 这里的逻辑，是后端优化的需求，重复的total会导致2次汇总查询
          if (typeof summaryRes.total !== 'undefined' && summaryRes.total === -1) {
            summaryRes.total = tableResult.data?.total || 0
          }
          tableList.value.unshift(summaryRes)
        }

        if (options.afterQuery) {
          options.afterQuery(tableResult)
        }
      }

      if (options?.closeScrollTop !== false && $ScrollRef?.value) {
        $ScrollRef?.value.setScrollTop(0)
      }
    } catch (e: any) {
      console.error(e)
      if (options.errorHandler && options.errorHandler(e)) {
        return false
      }

      if (e?.code === 'ERR_CANCELED') {
        return false
      }
      tableList.value = []
      tableOption.error = true
    }
    tableOption.loading = false
  }

  return {
    tableList,
    tableOption,
    resetStatus,
    resetData: resetFormData,
    resetPage,
    query
  }
}

/**
 * 生成表格配置
 * @param tableProps
 */
export const useTableProps = (tableProps: any) => {
  const isHasTableController = computed(() => !!tableProps.tableController)

  if (isHasTableController.value) {
    const { tableOption, tableList } = tableProps.tableController

    const tablePropsComputed = computed(() => Object.assign({}, tableProps, tableOption))

    // 直接初始化
    if (tablePropsComputed.value.immediate !== false && tableProps.tableController) {
      onMounted(() => tableProps.tableController.query())
    }

    return {
      isHasTableController,
      // TODO: tableConfig没有合并props，存在数据取值出错
      tableConfig: toRef(tableOption),
      tableList
    }
  }

  return {
    isHasTableController,
    tableConfig: toRef(tableProps),
    tableList: toRef(tableProps, 'data')
  }
}
