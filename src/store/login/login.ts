import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/api/login/login'
import type { IAccount } from '@/types/login_types'
import { localCache } from '@/utils/cache'
import router from '@/router'

const LOGIN_TOKEN = 'token' // 关键字用常量处理，以防人为错误

export const useAccountLoginStore = defineStore('login', () => {
  const data = {
    id: -1,
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
  }
  const accountLogin = async (account: IAccount) => {
    // 账号登录，获取token等信息
    const res = await accountLoginRequest(account)
    data.id = res.data.data.id
    data.name = res.data.data.name
    data.token = res.data.data.token
    // 本地存储token信息
    localCache.setCache(LOGIN_TOKEN, data.token)
    // 跳转到主页面
    router.push('/main')
  }
  return {
    data,
    accountLogin,
  }
})
