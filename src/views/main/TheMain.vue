<template>
  <el-container class="container">
    <el-aside :width="!isFold ? '250px' : '60px'">
      <MainAside :is-fold="isFold"></MainAside>
    </el-aside>
    <el-container>
      <el-header height="50px"><MainHeader @is-menu-fold="handleMenuFold"></MainHeader></el-header>
      <el-main><MainContent></MainContent></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'
// import { useRouter } from 'vue-router'
// const router = useRouter()
// const handleLogout = () => {
//   localCache.removeCache(LOGIN_TOKEN)
//   router.push('/login')
// }
import { ref } from 'vue'
import MainAside from './components/MainAside.vue'
import MainContent from './components/MainContent.vue'
import MainHeader from './components/MainHeader.vue'
const isFold = ref(false)
const handleMenuFold = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  .el-aside {
    background-color: white;
    transition: width 0.5s ease;
  }
  .el-aside::-webkit-scrollbar {
    display: none;
  }
  .el-container {
    background-color: skyblue;
  }
  .el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: palegoldenrod;
  }
}
</style>
