import { useMainStore } from '@/store/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { entireDepartment } = storeToRefs(mainStore)

const searchConfig = {
  formItems: [
    {
      type: 'input',
      label: '部门名字',
      prop: 'name',
      placeholder: '请输入部门名',
    },
    {
      type: 'input',
      label: '领导名字',
      prop: 'leader',
      placeholder: '请输入领导名字',
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请输入上级部门',
      options: () => entireDepartment.value,
    },
  ],
  pageName: 'department',
}

export default searchConfig
