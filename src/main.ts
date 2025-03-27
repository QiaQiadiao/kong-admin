import { createApp } from 'vue'
import App from './App.vue'
// css样式重置
import 'normalize.css'
import '@/assets/css/index.less'
// 配置路由
import router from './router'
// 配置pinia
import pinia from './store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
