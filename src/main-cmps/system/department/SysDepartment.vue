<template>
  <div class="box" v-if="isFind">
    <div class="search">
      <PageSearch :search-config="searchConfig" @handle-query="handleQuery"></PageSearch>
    </div>
    <div class="content">
      <PageContent
        :content-config="contentConfig"
        ref="contentRef"
        @handle-edit="handleEditClick"
        @handle-create="handleCreateClick"
      ></PageContent>
    </div>
    <div class="modal">
      <PageModal
        :modal-config="modalConfig"
        ref="modalRef"
        @handle-edit="handleChangeClick"
        @handle-new="handleNewClick"
      ></PageModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/main-cmps/components/PageSearch.vue'
import PageContent from '@/main-cmps/components/PageContent.vue'
import PageModal from '@/main-cmps/components/PageModal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useModal from '@/hooks/usePageModal'
import useContent from '@/hooks/usePageContent'
import usePermissions from '@/hooks/usePermissions'

const { contentRef, handleNewClick, handleChangeClick, handleQuery } = useContent()
const { modalRef, handleCreateClick, handleEditClick } = useModal()

const isFind = usePermissions('department:find')
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
