<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="item in breadCrumb" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { pathToCrumber } from '@/utils/menu-map'
import { useAccountLoginStore } from '@/store/login/login'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const accountLoginStore = useAccountLoginStore()
const userMenu = accountLoginStore.userMenu
const route = useRoute()
const breadCrumb = computed(() => {
  return pathToCrumber(route.path, userMenu)
})
</script>

<style scoped lang="less">
:deep(.is-link:hover) {
  color: #f0a020;
}
</style>
