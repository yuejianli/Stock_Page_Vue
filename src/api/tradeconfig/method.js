import request from '@/utils/request'
const TRADE_METHOD_URL = '/tradeMethod'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_METHOD_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  yzm() {
    return request({
      url: `${TRADE_METHOD_URL}/yzm`,
      method: 'get'
    })
  }
}
