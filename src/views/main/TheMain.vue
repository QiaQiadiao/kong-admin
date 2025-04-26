<template>
  <el-container class="container">
    <el-aside :width="!isFold ? '250px' : '60px'">
      <MainAside :is-fold="isFold"></MainAside>
    </el-aside>
    <el-container>
      <el-header height="50px"><MainHeader @is-menu-fold="handleMenuFold"></MainHeader></el-header>
      <el-main><RouterView></RouterView></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainAside from './components/MainAside.vue'
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
    background-color: #f0f0f0;
  }
  .el-main {
    padding: 10px;
  }
  .el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0 5px 5px #bebebe;
  }
}
</style>
