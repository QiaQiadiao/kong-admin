<template>
  <h1>main</h1>
  <button @click="handleLogout">退出登录</button>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleLogout = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less"></style>
