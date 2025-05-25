const contentConfig = {
  header: {
    titleName: '部门列表',
    createBtnName: '新建部门',
  },
  propsList: [
    {
      prop: 'name',
      label: '部门名称',
      align: 'center',
    },
    {
      prop: 'leader',
      label: '部门领导',
      align: 'center',
    },
    {
      prop: 'parentId',
      label: '上级部门',
      align: 'center',
    },
    {
      prop: 'handler',
      label: '操作',
      align: 'center',
    },
  ],
  pageName: 'department',
}
export default contentConfig
