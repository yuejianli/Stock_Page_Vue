import request from '@/utils/request'
const USER_URL = '/user'
export default {
  login(data) {
    return request({
      url: `${USER_URL}/login`,
      method: 'post',
      data
    })
  }
}
