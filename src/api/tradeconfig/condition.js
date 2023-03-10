import request from '@/utils/request'
const RULE_CONDITION_URL = '/tradeRuleCondition'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${RULE_CONDITION_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  }
}
