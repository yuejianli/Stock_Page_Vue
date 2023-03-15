import request from '@/utils/request'
const TRADE_MONEY_HISTORY_URL = '/tradeMoneyHistory'
export default {
  historyPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_MONEY_HISTORY_URL}/history`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType,
        startDate: searchObj.startDate,
        endDate: searchObj.endDate
      }
    })
  }
}
