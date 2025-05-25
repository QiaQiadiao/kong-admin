<template>
  <div class="box">
    <div class="search"><UserSearch @handle-query="handleQuery"></UserSearch></div>
    <div class="content">
      <UserContent
        ref="contentRef"
        @handle-create="handleCreateClick"
        @handle-edit="handleEditClick"
      ></UserContent>
    </div>
    <div class="modal">
      <UserContentModal
        @handle-new="handleNewClick"
        @handle-edit="handleChangeClick"
        ref="modalRef"
      ></UserContentModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './cmps/UserSearch.vue'
import UserContent from './cmps/UserContent.vue'
import UserContentModal from './cmps/UserContentModal.vue'
import { ref } from 'vue'
import { useSysStore } from '@/store/system/user/system'

const contentRef = ref<InstanceType<typeof UserContent>>()
const handleQuery = (formData) => {
  contentRef.value!.pageSize = 10
  contentRef.value!.currentPage = 1
  const systemStore = useSysStore()
  systemStore.updateUserList(formData).then(() => contentRef.value?.fetchUserList())
}

const modalRef = ref<InstanceType<typeof UserContentModal>>()
const handleCreateClick = (isNew: boolean) => {
  // 内容组件传来到
  modalRef.value?.setDialogVisible(null, isNew)
}
const handleNewClick = () => {
  // 模态框传来的
  contentRef.value!.pageSize = 10
  contentRef.value!.currentPage = 1
  contentRef.value?.fetchUserList()
}
const handleChangeClick = () => {
  // 从模态框传来
  contentRef.value?.fetchUserList()
}
const handleEditClick = (rowInfo, isNew: boolean) => {
  // 内容组件传来的
  modalRef.value?.setDialogVisible(rowInfo, isNew)
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
