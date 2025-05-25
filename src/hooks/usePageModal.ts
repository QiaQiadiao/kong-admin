import { ref } from 'vue'
import type PageModal from '@/main-cmps/components/PageModal.vue'
type EditCallBack = (data) => void
const useModal = (editCallback?: EditCallBack) => {
  // 获取pageModal实例
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const handleCreateClick = (isNew: boolean) => {
    // 内容组件传来到
    modalRef.value?.setDialogVisible(null, isNew)
  }
  const handleEditClick = (rowInfo, isNew: boolean) => {
    // 内容组件传来的
    modalRef.value?.setDialogVisible(rowInfo, isNew)
    if (editCallback) editCallback(rowInfo.menus)
  }
  return {
    modalRef,
    handleCreateClick,
    handleEditClick,
  }
}

export default useModal
