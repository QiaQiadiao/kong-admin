import { myRequest } from '@/service'
import type { IAccount } from '@/types/login_types'
export const accountLoginRequest = (account: IAccount) => {
  const dataAccount = {
    url: '/user/login',
    data: account,
  }
  const res = myRequest.post(dataAccount)
  return res
}
export const getUserInfoById = (id: number) => {
  const res = myRequest.get({
    url: `/user/${id}`,
  })
  return res
}
export const getUserMenusByRoleId = (id: number) => {
  const res = myRequest.get({
    url: `/user/getMenu/${id}`,
  })
  return res
}
