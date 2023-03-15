import request from '@/utils/request'
const TRADE_POSITION_URL = '/tradePosition'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_POSITION_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType,
        selectType: searchObj.selectType
      }
    })
  }
}
