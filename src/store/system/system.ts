import {
  createPageItem,
  deletePageItem,
  editPageItem,
  postPageListData,
  updatePageListData,
} from '@/service/api/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from '../main'

export const useSystemStore = defineStore(
  'system',
  () => {
    const pageList = ref([])
    const totalCount = ref<number>()

    const postPageList = async (body = { size: 10, offset: 0 }, page: string) => {
      const res = await postPageListData(body, page)
      const temp = res.data.data
      pageList.value = temp.list
      totalCount.value = temp.totalCount
    }
    const updatePageList = async (findInfo = {}, page: string) => {
      await updatePageListData(findInfo, page)
    }
    const createAction = async (createInfo, page: string) => {
      await createPageItem(createInfo, page)
      await updatePageList(undefined, page)
      await postPageList(undefined, page)
      const mainStore = useMainStore()
      await mainStore.fetchEntireData()
    }
    const editAction = async (editInfo, page: string) => {
      await editPageItem(editInfo, page)
      await updatePageList(undefined, page)
      const mainStore = useMainStore()
      await mainStore.fetchEntireData()
    }
    const deletAction = async (id: number, page: string) => {
      await deletePageItem(id, page)
      await updatePageList(undefined, page)
      await postPageList(undefined, page)
      const mainStore = useMainStore()
      await mainStore.fetchEntireData()
    }
    return {
      pageList,
      totalCount,
      postPageList,
      createAction,
      updatePageList,
      editAction,
      deletAction,
    }
  },
  {
    persist: true,
  },
)
