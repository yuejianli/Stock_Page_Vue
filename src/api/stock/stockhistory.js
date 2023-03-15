import request from '@/utils/request'
const STOCK_HISTORY_URL = '/stockHistory'
export default {
  getPageList(data) {
    return request({
      url: `${STOCK_HISTORY_URL}/history`,
      method: 'post',
      data
    })
  },
  listDayRange(data) {
    return request({
      url: `${STOCK_HISTORY_URL}/listDayRange`,
      method: 'post',
      data
    })
  }
}
