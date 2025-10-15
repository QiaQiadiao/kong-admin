import { getAllDepartmentList, getAllMenusList, getAllRolesList } from '@/service/api/main'
import type { departmentItem, roleItem } from '@/types/main_types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMainStore = defineStore('main', () => {
  const entireRole = ref<roleItem[]>([])
  const entireDepartment = ref<departmentItem[]>([])
  const entireMenu = ref([])
 const fetchEntireData = async () => {
    try {
      const [roleResponse, departmentResponse, menuResponse] = await Promise.all([
        getAllRolesList(),
        getAllDepartmentList(),
        getAllMenusList()
      ]);
      // 分别处理每个请求的结果
      entireRole.value = roleResponse.data.list;
      entireDepartment.value = departmentResponse.data.list;
      entireMenu.value = menuResponse.data.data.list;
    } catch (error) {
      console.error('数据获取失败', error);
    }
  }

  return {
    entireRole,
    entireDepartment,
    entireMenu,
    fetchEntireData,
  }
})
