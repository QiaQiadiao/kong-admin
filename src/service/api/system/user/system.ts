import { myRequest } from '@/service'
import type { payload_userList, typeUserInfo } from '@/types/user_system_types'
export const postUserListData = (body: payload_userList) => {
  const res = myRequest.post({
    url: '/user/postUserList',
    data: body,
  })
  return res
}
export const deleteOneUser = async (id: number) => {
  await myRequest
    .delete({
      url: `/user/deleteOneUser/${id}`,
    })
    .catch((e) => e)
}
export const createOneUser = (body: typeUserInfo) => {
  console.log(body)
  myRequest.post({
    url: '/user/createOneUser',
    data: body,
  })
}
