import request from '@/utils/request'
const STAT_URL = '/stat'
export default {
  getPageList(data) {
    return request({
      url: `${STAT_URL}/getTenTradeData`,
      method: 'post',
      data
    })
  },
  getTenTradeDay(data) {
    return request({
      url: `${STAT_URL}/getTenTradeDay`,
      method: 'post',
      data
    })
  },
  getWeekStat(data) {
    return request({
      url: `${STAT_URL}/getWeekStat`,
      method: 'post',
      data
    })
  },
  listMoneyType(data) {
    return request({
      url: `${STAT_URL}/listMoneyType`,
      method: 'post',
      data
    })
  },
  getCharStat(data) {
    return request({
      url: `${STAT_URL}/getCharStat`,
      method: 'post',
      data
    })
  }
}
