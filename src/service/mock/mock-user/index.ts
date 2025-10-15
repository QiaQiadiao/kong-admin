import type { MockMethod } from 'vite-plugin-mock'
import { createMockUrl, createRawResponse } from '../../mock/utils'

const MockList: MockMethod[] = [
  {
    url: '/user/login',
    method: 'post',
    response: () => {
      return {
        access_token:
          'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDIiLCJzdWIiOiJ7XCJ1c2VySWRcIjoxMDIsXCJyb2xlSWRcIjpudWxsLFwiY29tcGFueUlkXCI6MTAwLFwiZW1haWxcIjpcIm1pbGxpZS5saTAyQHRlYy1kby5jb21cIn0iLCJpc3MiOiJwaG9lbml4IiwiYXVkIjoidXNlciIsImlhdCI6MTY2MzQzNzk2OSwiZXhwIjoxNjYzNTI0MzY5fQ.pHs_F6LVrnFwQOgEfZgFbqN2eI9faYTjsHERhcmeUpk',
        id: 102,
      }
    }
  },
  {
    url: '/role/all',
    method:'get',
    response: ()=>{
        return createRawResponse({
            list: [
                {
                    id: 1,
                    name: '超级管理员',
                    intro: '所有权限',
                    menus: [1, 2, 3, 4, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
                },
                { id: 2, name: '普通管理员', intro: '部分权限', menus: [1, 2] },
                { id: 3, name: '员工', intro: '仅供系统总览和随便聊聊', menus: [1, 3] },
            ]
        })
    }  
  },
  {
    url: '/menu/list',
    method:'post',
    response: ()=>{
        return createRawResponse({
            list: [
            {
                id: 1,
                name: '系统总览',
                type: 1,
                url: '/main/analysis',
                icon: 'el-icon-monitor',
                children: [
                {
                    id: 39,
                    url: '/main/analysis/overview',
                    name: '核心技术',
                    type: 2,
                    children: null,
                    parentId: 1,
                },
                {
                    id: 40,
                    url: '/main/analysis/dashboard',
                    name: '商品统计',
                    type: 2,
                    children: null,
                    parentId: 1,
                },
                ],
            },
            {
                id: 2,
                name: '系统管理',
                type: 1,
                url: '/main/system',
                icon: 'el-icon-setting',
                children: [
                {
                    id: 41,
                    url: '/main/system/user',
                    name: '用户管理',
                    type: 2,
                    children: [
                    {
                        id: 50,
                        url: null,
                        name: '创建用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:create',
                    },
                    {
                        id: 51,
                        url: null,
                        name: '删除用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:delete',
                    },
                    {
                        id: 52,
                        url: null,
                        name: '修改用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:edit',
                    },
                    {
                        id: 53,
                        url: null,
                        name: '查询用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:find',
                    },
                    ],
                    parentId: 2,
                },
                {
                    id: 42,
                    url: '/main/system/department',
                    name: '部门管理',
                    type: 2,
                    children: [
                    {
                        id: 54,
                        url: null,
                        name: '创建角色',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:create',
                    },
                    {
                        id: 55,
                        url: null,
                        name: '删除部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:delete',
                    },
                    {
                        id: 56,
                        url: null,
                        name: '修改部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:edit',
                    },
                    {
                        id: 57,
                        url: null,
                        name: '查询部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:find',
                    },
                    ],
                    parentId: 2,
                },
                {
                    id: 43,
                    url: '/main/system/menu',
                    name: '菜单管理',
                    type: 2,
                    children: null,
                    parentId: 2,
                },
                {
                    id: 44,
                    url: '/main/system/role',
                    name: '角色管理',
                    type: 2,
                    children: [
                    {
                        id: 58,
                        url: null,
                        name: '创建角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:create',
                    },
                    {
                        id: 59,
                        url: null,
                        name: '删除角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:delete',
                    },
                    {
                        id: 60,
                        url: null,
                        name: '修改角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:edit',
                    },
                    {
                        id: 61,
                        url: null,
                        name: '查询角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:find',
                    },
                    ],
                    parentId: 2,
                },
                ],
            },
            {
                id: 3,
                name: '商品中心',
                type: 1,
                url: '/main/product',
                icon: 'el-icon-goods',
                children: [
                {
                    id: 45,
                    url: '/main/product/category',
                    name: '商品类别',
                    type: 2,
                    children: null,
                    parentId: 3,
                },
                {
                    id: 46,
                    url: '/main/product/goods',
                    name: '商品信息',
                    type: 2,
                    children: null,
                    parentId: 3,
                },
                ],
            },
            {
                id: 4,
                name: '随便聊聊',
                type: 1,
                url: '/main/story',
                icon: 'el-icon-chat-line-round',
                children: [
                {
                    id: 47,
                    url: '/main/story/chat',
                    name: '你的故事',
                    type: 2,
                    children: null,
                    parentId: 4,
                },
                {
                    id: 48,
                    url: '/main/story/list',
                    name: '故事列表',
                    type: 2,
                    children: null,
                    parentId: 4,
                },
                ],
            },
            ]
        })
    }  
  },
  {
    url: '/department/all',
    method:'get',
    response: ()=>{
        return createRawResponse({
            list: [
            {
                id: 1,
                name: '董事会',
                parentId: null,
                leader: 'ray',
            },
            {
                id: 2,
                name: '行政部',
                parentId: 1,
                leader: 'lin',
            },
            {
                id: 3,
                name: '人力资源部',
                parentId: 1,
                leader: 'Allen',
            },
            {
                id: 4,
                name: '技术部',
                parentId: 1,
                leader: 'Tao',
            },
            {
                id: 5,
                name: '法务部',
                parentId: 1,
                leader: 'Taylor',
            },
            {
                id: 6,
                name: '财务部',
                parentId: 1,
                leader: 'Dao',
            },
            {
                id: 7,
                name: '公关部',
                parentId: 1,
                leader: 'Ben',
            },
            {
                id: 8,
                name: '前端组',
                parentId: 4,
                leader: 'coder',
            },
            {
                id: 9,
                name: '后端组',
                parentId: 4,
                leader: 'Jackson',
            },
            {
                id: 10,
                name: '运维组',
                parentId: 4,
                leader: 'Dick',
            },
            ]
        })
    }
  },
  {
    url: '/user/102',
    method:'get',
    response: ()=>{
        return {
            id: 1,
            name: 'kongkong',
            realname: 'lin',
            cellphone: '15900004142',
            enable: 1,
            createAt: '2024-4-14',
            updateAt: '2024-4-14',
            department: {
                id: 1,
                name: '董事会',
                parentId: null,
                leader: 'ray',
            },
            role: {
                id: 1,
                name: '超级管理员',
                intro: '所有权限',
                menus: [1, 2, 3, 4, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
            }
        }
    }
  },
  {
    url: '/user/getMenu/102',
    method:'get',
    response: ()=>{
        return [
            {
                id: 1,
                name: '系统总览',
                type: 1,
                url: '/main/analysis',
                icon: 'el-icon-monitor',
                children: [
                {
                    id: 39,
                    url: '/main/analysis/overview',
                    name: '核心技术',
                    type: 2,
                    children: null,
                    parentId: 1,
                },
                {
                    id: 40,
                    url: '/main/analysis/dashboard',
                    name: '商品统计',
                    type: 2,
                    children: null,
                    parentId: 1,
                },
                ],
            },
            {
                id: 2,
                name: '系统管理',
                type: 1,
                url: '/main/system',
                icon: 'el-icon-setting',
                children: [
                {
                    id: 41,
                    url: '/main/system/user',
                    name: '用户管理',
                    type: 2,
                    children: [
                    {
                        id: 50,
                        url: null,
                        name: '创建用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:create',
                    },
                    {
                        id: 51,
                        url: null,
                        name: '删除用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:delete',
                    },
                    {
                        id: 52,
                        url: null,
                        name: '修改用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:edit',
                    },
                    {
                        id: 53,
                        url: null,
                        name: '查询用户',
                        type: 3,
                        parentId: 41,
                        permission: 'system:user:find',
                    },
                    ],
                    parentId: 2,
                },
                {
                    id: 42,
                    url: '/main/system/department',
                    name: '部门管理',
                    type: 2,
                    children: [
                    {
                        id: 54,
                        url: null,
                        name: '创建角色',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:create',
                    },
                    {
                        id: 55,
                        url: null,
                        name: '删除部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:delete',
                    },
                    {
                        id: 56,
                        url: null,
                        name: '修改部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:edit',
                    },
                    {
                        id: 57,
                        url: null,
                        name: '查询部门',
                        type: 3,
                        parentId: 42,
                        permission: 'system:department:find',
                    },
                    ],
                    parentId: 2,
                },
                {
                    id: 43,
                    url: '/main/system/menu',
                    name: '菜单管理',
                    type: 2,
                    children: null,
                    parentId: 2,
                },
                {
                    id: 44,
                    url: '/main/system/role',
                    name: '角色管理',
                    type: 2,
                    children: [
                    {
                        id: 58,
                        url: null,
                        name: '创建角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:create',
                    },
                    {
                        id: 59,
                        url: null,
                        name: '删除角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:delete',
                    },
                    {
                        id: 60,
                        url: null,
                        name: '修改角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:edit',
                    },
                    {
                        id: 61,
                        url: null,
                        name: '查询角色',
                        type: 3,
                        parentId: 44,
                        permission: 'system:role:find',
                    },
                    ],
                    parentId: 2,
                },
                ],
            },
            {
                id: 3,
                name: '商品中心',
                type: 1,
                url: '/main/product',
                icon: 'el-icon-goods',
                children: [
                {
                    id: 45,
                    url: '/main/product/category',
                    name: '商品类别',
                    type: 2,
                    children: null,
                    parentId: 3,
                },
                {
                    id: 46,
                    url: '/main/product/goods',
                    name: '商品信息',
                    type: 2,
                    children: null,
                    parentId: 3,
                },
                ],
            },
            {
                id: 4,
                name: '随便聊聊',
                type: 1,
                url: '/main/story',
                icon: 'el-icon-chat-line-round',
                children: [
                {
                    id: 47,
                    url: '/main/story/chat',
                    name: '你的故事',
                    type: 2,
                    children: null,
                    parentId: 4,
                },
                {
                    id: 48,
                    url: '/main/story/list',
                    name: '故事列表',
                    type: 2,
                    children: null,
                    parentId: 4,
                },
                ],
            },
            ]
        }
    }
]

export default createMockUrl(MockList)
