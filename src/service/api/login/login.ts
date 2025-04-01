import { myRequest } from '@/service'
import type { IAccount } from '@/types/login_types'
export const accountLoginRequest = (account: IAccount) => {
  const dataAccount = {
    url: '/login',
    data: account,
  }
  const res = myRequest.post(dataAccount)
  return res
}
