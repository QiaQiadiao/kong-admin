import {
  createOneUser,
  editOneUser,
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
  const updateUserList = async (findInfo: payload_userList = {}) => {
    await updateUserListData(findInfo)
  }
  const createOneUserAction = async (createInfo: typeUserInfo) => {
    await createOneUser(createInfo)
    await updateUserList()
    await postUserList()
  }
  const editOneUserAction = (editInfo: typeUserInfo) => {
    editOneUser(editInfo)
  }
  return {
    userList,
    totalCount,
    postUserList,
    createOneUserAction,
    updateUserList,
    editOneUserAction,
  }
})
