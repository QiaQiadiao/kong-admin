import { getAllDepartmentList, getAllRolesList } from '@/service/api/main'
import type { departmentItem, roleItem } from '@/types/main_types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMainStore = defineStore('main', () => {
  const entireRole = ref<roleItem[]>([])
  const entireDepartment = ref<departmentItem[]>([])
  const fetchEntireData = async () => {
    const roleData = await getAllRolesList()
    const departmentData = await getAllDepartmentList()
    entireRole.value = roleData.data.list
    entireDepartment.value = departmentData.data.list
  }
  return {
    entireRole,
    entireDepartment,
    fetchEntireData,
  }
})
