import { LOGIN_TOKEN } from '@/global/constants'
import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 映射关系：path => component
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/TheLogin.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/TheMain.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
})
// 根据token决定是否跳转登录页面
router.beforeEach((to) => {
  if (to.path.startsWith('/main') && !localCache.getCache(LOGIN_TOKEN)) {
    return '/login' // 最终跳转位置
  }
})
export default router
