const contentConfig = {
  header: {
    titleName: '菜单列表',
    createBtnName: '新建菜单',
  },
  propsList: [
    {
      prop: 'name',
      label: '菜单名称',
      align: 'center',
    },
    {
      prop: 'type',
      label: '菜单级别',
      align: 'center',
    },
    {
      prop: 'url',
      label: '菜单地址',
      align: 'center',
    },
    {
      prop: 'icon',
      label: '菜单图标',
      align: 'center',
    },
    {
      prop: 'permission',
      label: '权限',
      align: 'center',
    },
  ],
  pageName: 'menu',
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
    },
  },
}

export default contentConfig
