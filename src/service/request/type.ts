import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

export interface MyInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: AxiosError) => AxiosError
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: AxiosError) => AxiosError
}

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
}

export interface MyInternalRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  interceptots?: MyInterceptors<T>
}
//代码理解：
//此代码实现了对AxiosRequestConfig的进一步配置、扩展, AxiosRequestConfig --> MyRequestConfig
//在AxiosRequestConfig的基础上，添加了一个可选属性：拦截器接口
//拦截器接口对请求、响应拦截的成功失败共四种状态下的函数进行了类型定义
//其中：当请求拦截成功时，函数需传入AxiosRequestConfig类型的config参数，返回同样类型的值
//当响应拦截成功时，res类型默认为AxiosResponse
