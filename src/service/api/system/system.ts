import { myRequest } from '@/service'
export const postPageListData = (body, target: string) => {
  const res = myRequest.post({
    url: `/${target}/list`,
    data: body,
  })
  return res
}
export const updatePageListData = (body, target: string) => {
  myRequest.post({
    url: `/${target}/update`,
    data: body,
  })
}
export const deletePageItem = async (id: number, target: string) => {
  await myRequest
    .delete({
      url: `/${target}/delete/${id}`,
    })
    .catch((e) => e)
}
export const createPageItem = (body, target: string) => {
  myRequest.post({
    url: `/${target}/create`,
    data: body,
  })
}
export const editPageItem = (body, target: string) => {
  myRequest.patch({
    url: `/${target}/edit`,
    data: body,
  })
}
