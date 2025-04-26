import { postUserListData } from '@/service/api/user/system/system'
import type { IuserDetail, payload_userList } from '@/types/user_system_types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const userList = ref<IuserDetail[]>([])
  const totalCount = ref<number>()

  const postUserList = async (body: payload_userList) => {
    const res = await postUserListData(body)
    const temp = res.data.data
    userList.value = temp.list
    totalCount.value = temp.totalCount
    console.log(userList.value)
  }

  return {
    userList,
    totalCount,
    postUserList,
  }
})
