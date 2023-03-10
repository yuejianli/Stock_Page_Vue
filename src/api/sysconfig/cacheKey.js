import request from '@/utils/request'
const CONFIG_PARAM_URL = '/cache'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${CONFIG_PARAM_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'keyword': searchObj.keyword,
        'type': searchObj.type
      }
    })
  }
}
