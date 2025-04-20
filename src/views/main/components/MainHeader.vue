<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuFold">
      <el-icon size="25px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info"><HeaderInfo></HeaderInfo></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from '../header-cmps/HeaderInfo.vue'

const emit = defineEmits(['isMenuFold'])
const isFold = ref(false)
const handleMenuFold = () => {
  isFold.value = !isFold.value
  emit('isMenuFold', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .menu-icon {
    flex: 3;
  }
  .content {
    flex: 97;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 50px;
    margin-bottom: 5px;
    .breadcrumb {
      flex: 1;
    }
    .info {
      flex: 1;
    }
  }
}
</style>
