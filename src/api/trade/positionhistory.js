import request from '@/utils/request'
const TRADE_POSITION_HISTORY_URL = '/tradePositionHistory'
export default {
  historyPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_POSITION_HISTORY_URL}/history`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType,
        code: searchObj.code,
        startDate: searchObj.startDate,
        endDate: searchObj.endDate
      }
    })
  }
}
