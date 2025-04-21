import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
// 获得本地所有路由情况
const getAllRoute = () => {
  // 读取所有路由: router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  const localRoutes: RouteRecordRaw[] = []
  for (const key in files) {
    localRoutes.push(files[key].default)
  }
  return localRoutes
}

// 根据传入菜单情况按需进行动态导入路由
export const handleMenuToRoute = (userMenu) => {
  const localRoutes = getAllRoute()
  for (const menu of userMenu.value) {
    for (const item of menu.children) {
      const route = localRoutes.find((i) => i.path === item.url)
      if (route) {
        route.path = route.path.slice(6)
        router.addRoute('main', route)
      }
    }
  }
}
