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
}

export interface Role {
  id: number
  name: string
  intro: string
}

export interface payload_userList {
  size: number
  offset: number
}
