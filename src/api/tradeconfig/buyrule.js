import request from '@/utils/request'
const TRADE_RULE_URL = '/tradeRule'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${TRADE_RULE_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'mockType': searchObj.mockType,
        'ruleType': searchObj.ruleType
      }
    })
  },
  add(data) {
    return request({
      url: `${TRADE_RULE_URL}/add`,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: `${TRADE_RULE_URL}/update`,
      method: 'post',
      data
    })
  },
  delete(data) {
    return request({
      url: `${TRADE_RULE_URL}/delete`,
      method: 'post',
      data
    })
  },
  enable(data) {
    return request({
      url: `${TRADE_RULE_URL}/enable`,
      method: 'post',
      data
    })
  },
  disable(data) {
    return request({
      url: `${TRADE_RULE_URL}/disable`,
      method: 'post',
      data
    })
  }
}
