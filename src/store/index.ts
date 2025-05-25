import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAccountLoginStore } from './login/login'
const pinia = createPinia()
// 注册 store
export const registerStore = (app: App<Element>) => {
  app.use(pinia)
  const AccountLoginStore = useAccountLoginStore()
  AccountLoginStore.loadLogin()
}
