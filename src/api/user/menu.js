import request from '@/utils/request'
const MENU_URL = '/menu'
export default {
  treeAllMenuList() {
    return request({
      url: `${MENU_URL}/treeAllMenuList`,
      method: 'post'
    })
  }
}
