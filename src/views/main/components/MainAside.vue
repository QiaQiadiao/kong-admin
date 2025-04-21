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
    :collapse="isFold"
  >
    <template v-for="item in userMenu" :key="item.id">
      <el-sub-menu :index="item.id + ''">
        <template #title>
          <el-icon><component :is="item.icon.split('-icon-')[1]"></component></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="subitem in item.children" :key="subitem.id">
          <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{
            subitem.name
          }}</el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useAccountLoginStore } from '@/store/login/login'
import { useRouter } from 'vue-router'
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const accountLoginStore = useAccountLoginStore()
const userMenu = accountLoginStore.userMenu
const handleItemClick = (item: any) => {
  router.push(item.url)
}
</script>

<style scoped lang="less">
.el-aside::-webkit-scrollbar {
  display: none;
}

.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  .lg {
    margin: 10px;
    margin-left: 15px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }
  }
  h3 {
    margin-right: 50px;
  }
}
</style>
