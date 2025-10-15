import type { MockMethod } from 'vite-plugin-mock'

/**
 * 创建一个返回 Response
 * @param data
 * @param code
 * @param msg
 */
export const createRawResponse = (data: any = {}, code: number = 200, msg?: string) => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('[Mock Utils] Data must be Object')
  }

  return {
    code,
    data,
    msg
  }
}

/**
 * 给mock地址添加前缀
 * @param mockConfigList
 */
export const createMockUrl = (mockConfigList: MockMethod[]): MockMethod[] => {
  return mockConfigList.map((item) => {
    return {
      ...item,
      url: `/mock${item.url}`
    }
  })
}
