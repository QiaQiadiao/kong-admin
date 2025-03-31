import MyRequest from './request'
import { BASE_URL, TIMEOUT } from './config'
export const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})
