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
import { handleMenuToRoute } from '@/utils/menu-map'
import { LOGIN_TOKEN } from '@/global/constants'

export const useAccountLoginStore = defineStore('login', () => {
  const userInfo = ref({})
  const userMenu = ref([])
  const token = ref('')
  // 账号登录 获取id,token，再根据id获取userInfo和userMenu
  const accountLogin = async (account: IAccount) => {
    // 账号登录，获取token等信息
    const res = await accountLoginRequest(account) // 返回一个含键为：id和token的对象
    token.value = res.data.access_token
    const id = res.data.id
    // 本地存储token信息
    localCache.setCache(LOGIN_TOKEN, token.value)
    // 获取用户详细信息
    const userInfoResult = await getUserInfoById(id)
    userInfo.value = userInfoResult.data
    localCache.setCache('userInfo', userInfo.value)
    // 获取用户的菜单
    const userMenuResult = await getUserMenusByRoleId(id)
    userMenu.value = userMenuResult.data
    localCache.setCache('userMenu', userMenu.value)
    // 依据用户菜单动态构建对应路由
    handleMenuToRoute(userMenu)
    // 跳转到主页面
    router.push('/main')
  }
  // 加载store用
  const loadLogin = () => {
    const ui = localCache.getCache('userInfo')
    const um = localCache.getCache('userMenu')
    const tk = localCache.getCache(LOGIN_TOKEN)
    if (ui && um && tk) {
      userInfo.value = ui
      userMenu.value = um
      token.value = tk
      handleMenuToRoute(userMenu)
    }
  }
  return {
    userInfo,
    userMenu,
    accountLogin,
    loadLogin,
  }
})
