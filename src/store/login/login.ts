import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/api/login/login'
import type { IAccount } from '@/types/login_types'
import { localCache } from '@/utils/cache'
const LOGIN_TOKEN = 'token'
export const useAccountLoginStore = defineStore('login', () => {
  const data = {
    id: -1,
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
  }
  const accountLogin = async (account: IAccount) => {
    const res = await accountLoginRequest(account)
    data.id = res.data.data.id
    data.name = res.data.data.name
    data.token = res.data.data.token
    localCache.setCache(LOGIN_TOKEN, data.token)
    console.log(res)
    console.log(data)
  }
  return {
    data,
    accountLogin,
  }
})
