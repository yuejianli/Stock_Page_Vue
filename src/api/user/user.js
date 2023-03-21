import request from '@/utils/request'
const USER_URL = '/user'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${USER_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  add(data) {
    return request({
      url: `${USER_URL}/addUser`,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: `${USER_URL}/updateUser`,
      method: 'post',
      data
    })
  },
  delete(data) {
    return request({
      url: `${USER_URL}/deleteUser`,
      method: 'post',
      data
    })
  },
  disable(data) {
    return request({
      url: `${USER_URL}/disable`,
      method: 'post',
      data
    })
  },
  enable(data) {
    return request({
      url: `${USER_URL}/enable`,
      method: 'post',
      data
    })
  },
  getInfo(data) {
    return request({
      url: `${USER_URL}/getInfo`,
      method: 'post',
      data
    })
  }
}
