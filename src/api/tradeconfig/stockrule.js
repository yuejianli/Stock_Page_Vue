import request from '@/utils/request'
const STOCK_RULE_URL = '/tradeRuleStock'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${STOCK_RULE_URL}/stockRuleList`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'keyword': searchObj.keyword
      }
    })
  },
  applyList(data) {
    return request({
      url: `${STOCK_RULE_URL}/applyList`,
      method: 'post',
      data
    })
  },
  apply(data) {
    return request({
      url: `${STOCK_RULE_URL}/apply`,
      method: 'post',
      data
    })
  }
}
