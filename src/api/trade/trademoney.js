import request from '@/utils/request'
const TRADE_MONEY_URL = '/tradeMoney'
export default {
  getInfo(data) {
    return request({
      url: `${TRADE_MONEY_URL}/info`,
      method: 'post',
      data
    })
  }
}
