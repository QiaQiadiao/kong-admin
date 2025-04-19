<template>
  <el-container class="container">
    <el-aside width="250px">
      <MainAside></MainAside>
    </el-aside>
    <el-container>
      <el-header height="50px"><MainHeader></MainHeader></el-header>
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
import MainAside from './components/MainAside.vue'
import MainContent from './components/MainContent.vue'
import MainHeader from './components/MainHeader.vue'
</script>

<style scoped lang="less">
.container {
  height: 100%;
  .el-aside {
    background-color: white;
  }
  .el-aside::-webkit-scrollbar {
    display: none;
  }
  .el-container {
    background-color: skyblue;
  }
  .el-header {
    background-color: palegoldenrod;
  }
}
</style>
