import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId,
} from '@/service/api/login/login'
import type { IAccount } from '@/types/login_types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { ref } from 'vue'

const LOGIN_TOKEN = 'token' // 关键字用常量处理，以防人为错误

export const useAccountLoginStore = defineStore(
  'login',
  () => {
    const userInfo = ref({})
    const userMenu = ref([])
    const accountLogin = async (account: IAccount) => {
      // 账号登录，获取token等信息
      const res = await accountLoginRequest(account) // 返回一个含键为：id和token的对象
      const token = res.data.access_token
      const id = res.data.id
      // 本地存储token信息
      localCache.setCache(LOGIN_TOKEN, token)
      // 获取用户详细信息
      const userInfoResult = await getUserInfoById(id)
      userInfo.value = userInfoResult.data
      // 获取用户的菜单
      const userMenuResult = await getUserMenusByRoleId(userInfo.value.role?.id)
      userMenu.value = userMenuResult.data
      // 读取所有路由
      // const allRoute = import.meta.glob('')
      // 跳转到主页面
      router.push('/main')
    }
    return {
      userInfo,
      userMenu,
      accountLogin,
    }
  },
  {
    persist: true, // ✅ 加上这个，自动持久化
  },
)
