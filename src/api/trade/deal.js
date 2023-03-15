import request from '@/utils/request'
const DEAL_URL = '/deal'
export default {
  deal(data) {
    return request({
      url: `${DEAL_URL}/deal`,
      method: 'post',
      data
    })
  }
}
