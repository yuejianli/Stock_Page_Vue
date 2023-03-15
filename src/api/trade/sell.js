import request from '@/utils/request'
const SELL_URL = '/sell'
export default {
  sell(data) {
    return request({
      url: `${SELL_URL}/sell`,
      method: 'post',
      data
    })
  }
}
