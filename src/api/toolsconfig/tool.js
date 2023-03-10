import request from '@/utils/request'
const MONEY_TOOL_URL = '/money'
export default {
  // 清仓
  clearMoney(data) {
    return request({
      url: `${MONEY_TOOL_URL}/clearMoney`,
      method: 'post',
      data
    })
  },
  // 补仓
  coverMoney(data) {
    return request({
      url: `${MONEY_TOOL_URL}/coverMoney`,
      method: 'post',
      data
    })
  },
  // 减仓
  reduceMoney(data) {
    return request({
      url: `${MONEY_TOOL_URL}/reduceMoney`,
      method: 'post',
      data
    })
  }
}
