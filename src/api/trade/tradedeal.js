import request from '@/utils/request'
const TRADE_DEAL_URL = '/tradeDeal'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_DEAL_URL}/list`,
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
      url: `${TRADE_DEAL_URL}/history`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType
      }
    })
  }
}
