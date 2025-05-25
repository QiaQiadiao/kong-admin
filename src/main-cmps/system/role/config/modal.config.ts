// import { useMainStore } from '@/store/main'
// import { storeToRefs } from 'pinia'
// const mainStore = useMainStore()
// const { entireDepartment } = storeToRefs(mainStore)
const modalConfig = {
  pageName: 'role',
  header: {
    createName: '新建角色',
    editName: '编辑角色',
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入部门名称',
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍',
    },
    {
      type: 'slot',
      slotName: 'menuList',
    },
  ],
}

export default modalConfig
