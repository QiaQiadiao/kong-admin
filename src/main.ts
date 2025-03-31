import { createApp } from 'vue'
import App from './App.vue'
// css样式重置
import 'normalize.css'
import '@/assets/css/index.less'
// 配置路由
import router from './router'
// 配置pinia
import pinia from './store'
// element-plus的icon进行全局注册
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons) //对element-plus的icon进行全局注册
app.use(router)
app.use(pinia)
app.mount('#app')
//
// import axios from 'axios'
// const instance = axios.create()
// instance
//   .post('http://localhost:3000/login', {
//     name: 'coderwhy',
//     password: '123456',
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
