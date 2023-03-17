import request from '@/utils/request'
const USER_URL = '/tradeUser'
export default {
  login(data) {
    return request({
      url: `${USER_URL}/login`,
      method: 'post',
      data
    })
  }
}
