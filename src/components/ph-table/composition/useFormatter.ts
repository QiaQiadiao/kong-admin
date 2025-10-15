import dayjs from 'dayjs'
import { isUndefined } from 'lodash'
import { NUMERICAL_VALUE_TYPE } from '@/constant'
import type { PhTableColumnFormatter } from '@/components/ph-table'

export const useFormatter = (): Record<PhTableColumnFormatter, any> => {
  /**
   * 价格格式化
   */
  const currency = {
    align: 'right',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      if (isNaN(Number(cellValue)) || cellValue === null) {
        return '-'
      }
      return Number(cellValue).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        useGrouping: true
      })
    }
  }

  /**
   * 数字样式
   */
  const numberStyle = {
    align: 'right',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      if (isNaN(Number(cellValue))) {
        return '-'
      }
      return Number(cellValue).toLocaleString(undefined, {
        minimumFractionDigits: column.minimumFractionDigits || 0,
        maximumFractionDigits: column.fractionDigits || 0,
        useGrouping: isUndefined(column.useGrouping) ? true : column.useGrouping
      })
    }
  }

  /**
   * 时间
   */
  const date = {
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      return cellValue ? dayjs(cellValue).format(column.dateFormat || 'YYYY-MM-DD HH:mm:ss') : ''
    }
  }

  /**
   * 百分比
   */
  const percentage = {
    align: 'right',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      if (isNaN(Number(cellValue)) || cellValue === null) {
        return '-'
      }
      return Number(cellValue).toLocaleString(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    }
  }

  /**
   * 仅仅保留两位小数，并加百分号
   */
  const percentageSign = {
    align: 'right',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      if (isNaN(Number(cellValue)) || cellValue === null) {
        return '-'
      }
      return Number(cellValue).toFixed(2) + '%'
    }
  }

  return {
    currency,
    numberStyle,
    date,
    percentage,
    percentageSign
  }
}

export const formatterTypeMap: any = {
  [NUMERICAL_VALUE_TYPE.MONEY]: 'currency',
  [NUMERICAL_VALUE_TYPE.DECIMAL]: {
    formatter: 'numberStyle',
    fractionDigits: 2
  },
  [NUMERICAL_VALUE_TYPE.NUMBER]: 'numberStyle',
  [NUMERICAL_VALUE_TYPE.PERCENTANDFIXEDTWO]: 'percentage'
}
