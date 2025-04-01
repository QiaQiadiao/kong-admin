import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/api/login/login'
import type { IAccount } from '@/types/login_types'
export const useAccountLoginStore = defineStore('login', () => {
  const data = {
    id: -1,
    name: '',
    token: '',
  }
  const accountLogin = async (account: IAccount) => {
    const res = await accountLoginRequest(account)
    data.id = res.data.data.id
    data.name = res.data.data.name
    data.token = res.data.data.token
    console.log(res)
    console.log(data)
  }
  return {
    data,
    accountLogin,
  }
})
