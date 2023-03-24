import request from '@/utils/request'
const STOCK_URL = '/stock'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${STOCK_URL}/list`,
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
