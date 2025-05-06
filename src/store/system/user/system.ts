import {
  createOneUser,
  postUserListData,
  updateUserListData,
} from '@/service/api/system/user/system'
import type { IuserDetail, payload_userList, typeUserInfo } from '@/types/user_system_types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const userList = ref<IuserDetail[]>([])
  const totalCount = ref<number>()

  const postUserList = async (body: payload_userList = { size: 10, offset: 0 }) => {
    const res = await postUserListData(body)
    const temp = res.data.data
    userList.value = temp.list
    totalCount.value = temp.totalCount
  }
  const updateUserList = async (body: payload_userList = {}) => {
    await updateUserListData(body)
  }
  const createOneUserAction = async (body: typeUserInfo) => {
    await createOneUser(body)
    await updateUserList()
    await postUserList()
  }
  return {
    userList,
    totalCount,
    postUserList,
    createOneUserAction,
    updateUserList,
  }
})
