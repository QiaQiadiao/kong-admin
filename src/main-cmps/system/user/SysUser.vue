<template>
  <div class="box">
    <div class="search"><UserSearch @handle-query="handleQuery"></UserSearch></div>
    <div class="content"><UserContent ref="contentRef"></UserContent></div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './cmps/UserSearch.vue'
import UserContent from './cmps/UserContent.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
const handleQuery = (formData) => {
  const form = formData
  contentRef.value?.fetchUserList(form)
}
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
