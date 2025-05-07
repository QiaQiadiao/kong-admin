import { myRequest } from '@/service'
import type { payload_userList, typeUserInfo } from '@/types/user_system_types'
export const postUserListData = (body: payload_userList) => {
  const res = myRequest.post({
    url: '/user/postUserList',
    data: body,
  })
  return res
}
export const updateUserListData = (body: payload_userList) => {
  myRequest.post({
    url: '/user/updateUserList',
    data: body,
  })
}
export const deleteOneUser = async (id: number) => {
  await myRequest
    .delete({
      url: `/user/deleteOneUser/${id}`,
    })
    .catch((e) => e)
}
export const createOneUser = (body: typeUserInfo) => {
  myRequest.post({
    url: '/user/createOneUser',
    data: body,
  })
}
export const editOneUser = (body: typeUserInfo) => {
  myRequest.patch({
    url: '/user/editOneUser',
    data: body,
  })
}
