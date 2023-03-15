import request from '@/utils/request'
const STOCK_SELECTED_URL = '/stockSelected'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${STOCK_SELECTED_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        'keyword': searchObj.keyword
      }
    })
  },
  yesHistory(currentPage, pageSize, searchObj) {
    return request({
      url: `${STOCK_SELECTED_URL}/yesHistory`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  add(data) {
    return request({
      url: `${STOCK_SELECTED_URL}/add`,
      method: 'post',
      data
    })
  },
  editNotes(data) {
    return request({
      url: `${STOCK_SELECTED_URL}/editNotes`,
      method: 'post',
      data
    })
  },
  deleteByCode(data) {
    return request({
      url: `${STOCK_SELECTED_URL}/deleteByCode`,
      method: 'post',
      data
    })
  }
}
