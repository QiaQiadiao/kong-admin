import { myRequest } from '@/service'
export const accountLoginRequest = (account: object) => {
  const dataAccount = {
    url: '/login',
    data: account,
  }
  myRequest.post(dataAccount).then((res) => {
    console.log(res.data)
  })
}
