import request from '@/utils/request'
const STOCK_POOL_URL = '/stockPool'
export default {
  getPageList(data) {
    return request({
      url: `${STOCK_POOL_URL}/listPool`,
      method: 'post',
      data
    })
  },
  listPoolType(data) {
    return request({
      url: `${STOCK_POOL_URL}/listPoolType`,
      method: 'post',
      data
    })
  }
}
