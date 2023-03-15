import request from '@/utils/request'
const BUY_URL = '/buy'
export default {
  buy(data) {
    return request({
      url: `${BUY_URL}/buy`,
      method: 'post',
      data
    })
  }
}
