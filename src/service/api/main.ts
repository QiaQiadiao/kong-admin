// 进入main页面后 各个模块都可能会用的data
import { myRequest } from '..'

export const getAllRolesList = ():any => {
  return myRequest.get({
    url: '/role/all',
  })
}

export const getAllDepartmentList = ():any => {
  return myRequest.get({
    url: '/department/all',
  })
}

export const getAllMenusList = ():any => {
  return myRequest.post({
    url: '/menu/list',
  })
}
