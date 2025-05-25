<template>
  <div class="box">
    <div class="search" v-if="isFind">
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
        :other-info="otherInfo"
      >
        <template #menuList>
          <el-tree
            style="max-width: 600px"
            :data="entireMenu"
            show-checkbox
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheck"
            ref="treeRef"
            node-key="id"
          />
        </template>
      </PageModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { ElTree } from 'element-plus'
import PageSearch from '@/main-cmps/components/PageSearch.vue'
import PageContent from '@/main-cmps/components/PageContent.vue'
import PageModal from '@/main-cmps/components/PageModal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useModal from '@/hooks/usePageModal'
import useContent from '@/hooks/usePageContent'
import { useMainStore } from '@/store/main'
import { storeToRefs } from 'pinia'
import usePermissions from '@/hooks/usePermissions'
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
const handleCheck = (data1, data2) => {
  const menuList = [...data2.checkedNodes, ...data2.halfCheckedNodes]
  const menus: number[] = []
  for (const item of menuList) {
    menus.push(item.id)
  }
  otherInfo.value = { menus }
}
const editCallback = (menuList) => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuList)
  })
}
const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)
const { contentRef, handleNewClick, handleChangeClick, handleQuery } = useContent()
const { modalRef, handleCreateClick, handleEditClick } = useModal(editCallback)
const isFind = usePermissions('role:find')
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
