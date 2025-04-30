// 用户详情信息类型定义
export interface IuserDetail {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string
  updateAt: string
  department: Department
  role: Role
}
export interface Department {
  id: number
  name: string
  parentId: number | null
  leader: string
}
export interface Role {
  id: number
  name: string
  intro: string
  menus: number[]
}
// 请求用户数据所需信息类型定义
export interface payload_userList {
  size?: number
  offset?: number
  name?: string
  realname?: string
  cellphone?: string
  enable?: number
  createAt?: string
}
// 给新建用户时用户数据定义类型
export interface typeUserInfo {
  name: string
  realname: string
  password: string
  cellphone: string
  departmentId: number | string
  roleId: number | string
}
