import request from '@/utils/request'
const TRADE_ENTRUST_URL = '/tradeEntrust'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_ENTRUST_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType
      }
    })
  },
  historyPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_ENTRUST_URL}/history`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType
      }
    })
  },
  getInfo(data) {
    return request({
      url: `${TRADE_ENTRUST_URL}/getInfo`,
      method: 'post',
      data
    })
  }
}
