// 进入main页面后 各个模块都可能会用的data
import { myRequest } from '..'

export const getAllRolesList = () => {
  return myRequest.post({
    url: '/role/list',
  })
}

export const getAllDepartmentList = () => {
  return myRequest.post({
    url: '/department/list',
  })
}
