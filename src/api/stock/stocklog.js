import request from '@/utils/request'
const STOCK_LOG_URL = '/stockLog'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${STOCK_LOG_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize,
        code: searchObj.code,
        startDate: searchObj.startDate,
        endDate: searchObj.endDate
      }
    })
  }
}
