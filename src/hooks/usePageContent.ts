import { ref } from 'vue'
import type PageContent from '@/main-cmps/components/PageContent.vue'
import { useSystemStore } from '@/store/system/system'

const useContent = () => {
  // 获取pageContent实例
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const handleNewClick = () => {
    // 模态框传来的
    contentRef.value!.pageSize = 10
    contentRef.value!.currentPage = 1
    contentRef.value?.fetchPageList()
  }
  const handleChangeClick = () => {
    // 从模态框传来
    contentRef.value?.fetchPageList()
  }
  const handleQuery = (formData, pageName) => {
    contentRef.value!.pageSize = 10
    contentRef.value!.currentPage = 1
    const systemStore = useSystemStore()
    systemStore.updatePageList(formData, pageName).then(() => contentRef.value?.fetchPageList())
  }
  return {
    contentRef,
    handleNewClick,
    handleChangeClick,
    handleQuery,
  }
}

export default useContent
