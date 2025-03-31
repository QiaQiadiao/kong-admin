import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { MyRequestConfig, MyInternalRequestConfig } from './type'

class MyRequest {
  instance: AxiosInstance
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return error
      },
    )
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res
      },
      (error: AxiosError) => {
        return error
      },
    )
    // 针对具有自定义的拦截器的config
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    )
  }
  //错误消息处理封装
  handleErrorMessage(message: string) {
    console.log(message)
  }
  //封装网络请求方法
  request<T = any>(config: MyRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      console.log('url请求成功拦截')
      config = config.interceptors?.requestSuccessFn(config as MyInternalRequestConfig)
    }
    return new Promise<T>((resolve, reject) => {
      try {
        // 在尝试发送请求之前，捕获可能的配置错误
        this.instance
          .request<any, T>(config)
          .then((res) => {
            if (config.interceptors?.responseSuccessFn) {
              console.log('url响应成功拦截', config.url)
              res = config.interceptors.responseSuccessFn(res)
            }
            resolve(res)
          })
          .catch((error) => {
            if (config.interceptors?.responseFailureFn) {
              console.log('url响应失败拦截', config.url)
              error = config.interceptors.responseFailureFn(error)
            }
            reject(error)
          })
      } catch (e: any) {
        if (config.interceptors?.requestFailureFn) {
          console.log('url请求失败拦截', config.url)
          const modifiedError = config.interceptors.requestFailureFn(e)
          return Promise.reject(modifiedError)
        } else {
          return Promise.reject(e)
        }
      }
    })
  }
  // 封装常用方法
  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  put<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
export default MyRequest
