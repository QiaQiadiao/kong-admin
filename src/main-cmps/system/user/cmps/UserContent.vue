<template>
  <div class="header">
    <h3 class="title">用户列表</h3>
    <el-button type="info">新建用户</el-button>
  </div>
  <div class="main">
    <!-- <ul v-for="item in userList">
      <li :key="item.id">{{ item.name }}</li>
    </ul> -->
    <ul>
      <li v-for="item in userList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
  <div class="pagination">分页</div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/user_system/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
systemStore.postUserList({
  size: 1,
  offset: 2,
})
const { userList } = storeToRefs(systemStore)
// console.log(res)
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
