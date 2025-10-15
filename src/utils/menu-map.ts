import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
// 获得本地所有路由情况
const getAllRoute = () => {
  // 读取所有路由: router/main所有ts文件
  const files: Record<string, unknown> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  const localRoutes: RouteRecordRaw[] = []
  for (const key in files) {
    localRoutes.push(files[key].default)
  }
  return localRoutes
}
// 导出第一个菜单路由
export let firstMenu: unknown = null
// 根据传入菜单情况按需进行动态导入路由
export const handleMenuToRoute = (userMenu) => {
  const localRoutes = getAllRoute()
  for (const menu of userMenu.value) {
    let firstChild = null
    let flag = 0
    for (const item of menu.children) {
      const route = localRoutes.find((i) => i.path === item.url)
      if (route) {
        if (!firstMenu) firstMenu = item
        route.path = route.path.slice(6)
        router.addRoute('main', route)
        if (!flag) {
          flag = 1
          firstChild = item
        }
      }
    }
    if (firstChild) {
      router.addRoute({
        path: menu.url,
        redirect: firstChild.url,
      })
    }
  }
}
/*
@params path: 当前url路径
@params userMenu: 当前用户的菜单数据
 */
export const pathToMenu = (path: string, userMenu) => {
  for (const menu of userMenu) {
    for (const item of menu.children) {
      if (item.url === path) return item
    }
  }
}

interface IbreadCrumber {
  name: string
  path: string
}
export const pathToCrumber = (path: string, userMenu) => {
  const breadCrumber: IbreadCrumber[] = []
  for (const menu of userMenu) {
    for (const item of menu.children) {
      if (item.url === path) {
        breadCrumber.push({ name: menu.name, path: menu.url })
        breadCrumber.push({ name: item.name, path: item.url })
        return breadCrumber
      }
    }
  }
}

/*
@params menuIdList: 用户的菜单id数组
@params menuList: 所有菜单
 */
// 根据用户menus返回相应权限字符串数组
export const menusToPermission = (menuIdList, menuList) => {
  const permissions: string[] = []

  const fn = (list) => {
    if (!list) return
    for (const item of list) {
      if (!!menuIdList.find((id) => id === item.id)) {
        if (item.type === 3) permissions.push(item.permission)
      }
      if (item.children) fn(item.children)
    }
  }
  fn(menuList)
  return permissions
}
