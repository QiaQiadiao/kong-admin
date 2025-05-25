<template>
  <div class="box">
    <div class="content">
      <PageContent :content-config="contentConfig"></PageContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/main-cmps/components/PageContent.vue'
import contentConfig from './config/content.config'
</script>

<style scoped lang="less">
.box {
  overflow: hidden;
  padding: 10px;
  .search {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: -2px 2px 8px #bebebe;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .content {
    background-color: white;
    padding: 20px;
    box-shadow: -2px 2px 8px #bebebe;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
