import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HYRequestConfig } from "./type";
class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig){
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => err
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => err
    )

    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }
  request<T = any>(config: HYRequestConfig<T>){
    if(config.interceptors?.requestSuccessFn){
      config = config.interceptors.requestSuccessFn(config)
    }
    // return new Promise<T>((resolve, reject)=>{
    //   this.instance
    //     .request<T=any>(config:HYRequestConfig<T>)
    //     .then((res)=>{
    //       if(config.interceptors?.responseSuccessFn){
    //         res = config.interceptors.responseSuccessFn(res)
    //       }
    //       resolve(res)
    //     })
    //     .catch((err)=>{
    //       reject(err)
    //     })
    // })
  }
  get<T = any>(config: HYRequestConfig<T>){
    return this.request({...config,method:'GET'})
  }
  post<T = any>(config: HYRequestConfig<T>){
    return this.request({...config,method:'POST'})
  }
  delete<T = any>(config: HYRequestConfig<T>){
    return this.request({...config,method:'DELETE'})
  }
  patch<T = any>(config: HYRequestConfig<T>){
    return this.request({...config,method:'PATCH'})
  }
}
export default HYRequest
