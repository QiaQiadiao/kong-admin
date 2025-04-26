import { myRequest } from '@/service'
import type { IAccount } from '@/types/login_types'
export const accountLoginRequest = (account: IAccount) => {
  const res = myRequest.post({
    url: '/user/login',
    data: account,
  })
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
