// import { useMainStore } from '@/store/main'
// import { storeToRefs } from 'pinia'

// const mainStore = useMainStore()
// const { entireRole } = storeToRefs(mainStore)

const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
    },
    // {
    //   type: 'select',
    //   prop: 'menu',
    //   label: '菜单权限',
    //   placeholder: '请选择菜单权限',
    //   options: () => entireRole.value,
    // },
  ],
  pageName: 'role',
}

export default searchConfig
