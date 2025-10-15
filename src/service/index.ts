import MyRequest from './request'
import { BASE_URL, TIMEOUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
export const myRequest = new MyRequest({
  // baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token // 对每次请求前进行token校验
      }
      config.baseURL = '/mock'
      return config
    },
  },
})
