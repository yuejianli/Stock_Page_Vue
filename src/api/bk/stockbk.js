import request from '@/utils/request'
const STOCK_BK_URL = '/stockBk'
export default {
  getPageList(currentPage, pagesize, searchObj) {
    return request({
      url: `${STOCK_BK_URL}/listCodeBkInfo`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pagesize,
        'stockCode': searchObj.keyword
      }
    })
  }
}
