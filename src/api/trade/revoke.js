import request from '@/utils/request'
const REVOKE_URL = '/revoke'
export default {
  revoke(data) {
    return request({
      url: `${REVOKE_URL}/revoke`,
      method: 'post',
      data
    })
  }
}
