<template>
  <a href="#">
    <div class="logo">
      <div class="lg"><img src="/src/assets/img/ziji.png" alt="#" /></div>
      <h3>KongKong CMS</h3>
    </div>
  </a>

  <el-menu
    active-text-color="#f0a020"
    background-color="white"
    class="el-menu"
    text-color="black"
    default-active="39"
  >
    <template v-for="item in userMenu" :key="item.id">
      <el-sub-menu :index="item.id + ''">
        <template #title>
          <el-icon><component :is="item.icon.split('-icon-')[1]"></component></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="subitem in item.children" :key="subitem.id">
          <el-menu-item :index="subitem.id + ''">{{ subitem.name }}</el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>

  <!-- <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </template>
      <el-menu-item index="2-1">2-1</el-menu-item>
      <el-menu-item index="2-2">2-2</el-menu-item>
      <el-menu-item index="2-3">2-3</el-menu-item>
      <el-menu-item index="2-4">2-4</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Three</span>
      </template>
      <el-menu-item index="3-1">3-1</el-menu-item>
      <el-menu-item index="3-2">3-2</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Four</span>
      </template>
      <el-menu-item index="4-1">4-1</el-menu-item>
      <el-menu-item index="4-2">4-2</el-menu-item>
      <el-menu-item index="4-3">4-3</el-menu-item>
      <el-menu-item index="4-4">4-4</el-menu-item>
    </el-sub-menu> -->
</template>

<script setup lang="ts">
import { useAccountLoginStore } from '@/store/login/login'

const accountLoginStore = useAccountLoginStore()
const userMenu = accountLoginStore.userMenu
console.log(userMenu)
</script>

<style scoped lang="less">
.el-aside::-webkit-scrollbar {
  display: none;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  .lg {
    img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }
    margin: 10px 10px;
  }
}
</style>
