import request from '@/utils/request'
const CONFIG_PARAM_URL = '/config'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${CONFIG_PARAM_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  updateConfig(data) {
    return request({
      url: `${CONFIG_PARAM_URL}/update`,
      method: 'post',
      data
    })
  },
  resetConfig(id) {
    return request({
      url: `${CONFIG_PARAM_URL}/reset`,
      method: 'post',
      data: {
        'id': id
      }
    })
  }
}
