import {BASE_URL, TIMEOUT} from './config'
import HYRequest from './request'

console.log(import.meta.env.MODE)
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

export default hyRequest
