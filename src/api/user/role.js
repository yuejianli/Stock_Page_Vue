import request from '@/utils/request'
const ROLE_URL = '/role'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${ROLE_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  add(data) {
    return request({
      url: `${ROLE_URL}/add`,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: `${ROLE_URL}/update`,
      method: 'post',
      data
    })
  },
  delete(data) {
    return request({
      url: `${ROLE_URL}/delete`,
      method: 'post',
      data
    })
  },
  findMenuByRoleId(data) {
    return request({
      url: `${ROLE_URL}/findMenuByRoleId`,
      method: 'post',
      data
    })
  },
  configMenuList(data) {
    return request({
      url: `${ROLE_URL}/configMenuList`,
      method: 'post',
      data
    })
  }
}
