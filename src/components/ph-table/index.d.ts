import { VNode } from 'vue'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type PhTableColumnFormatter =
  | 'currency'
  | 'numberStyle'
  | 'date'
  | 'percentage'
  | 'percentageSign'

export interface PhTableColumnCellRender {
  cellValue: any
  row: any
  column: any
  index: number
  formatValue?: string
  customProps?: any
  store?: any
}

export interface PhTableColumn<T = unknown> extends Partial<TableColumnCtx<T>> {
  formatter?: PhTableColumnFormatter | TableColumnCtx.formatter
  headerRender?: (props: any) => VNode | string
  render?: (props: any) => VNode | string | null
  /**
   * 列 空占位符
   */
  cellPlaceholder?: string
  /**
   * 是否展示问号ICON
   */
  showDescIcon?: boolean
  /**
   * 列描述tooltip
   */
  description?: string
  /**
   * 是否开启排序
   */
  sort?: boolean
  /**
   * formatter为date时，日期格式配置
   */
  dateFormat?: string
}

export type TableControllerOption = {
  defaultOption?: {
    pageIndex?: number
    pageSize?: number
    pagination?: boolean
  }
  errorHandler?: (e: unknown) => boolean
  abort?: boolean
  /**
   * 是否关闭执行滚动到最上方
   */
  closeScrollTop?: boolean
  /**
   * 是否采用数据汇总，传入一个方法, 返回的数据为要汇总的数据
   */
  dataSummary?: () => unknown
  beforeQuery?: () => Promise<unknown>
  afterQuery?: (result: any) => unknown
  /**
   * 是否关闭浅层作用形式（开启的话可能具有不一致的响应行为）
   */
  shoallowData?: boolean
}

export type StatusType = 'page' | 'form'
