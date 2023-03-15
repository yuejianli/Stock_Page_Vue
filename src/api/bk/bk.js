import request from '@/utils/request'
const STOCK_BK_URL = '/stockBk'
export default {
  listBk(data) {
    return request({
      url: `${STOCK_BK_URL}/listBk`,
      method: 'post',
      data
    })
  },
  listGn(data) {
    return request({
      url: `${STOCK_BK_URL}/listGn`,
      method: 'post',
      data
    })
  },
  listMoneyType(data) {
    return request({
      url: `${STOCK_BK_URL}/listMoneyType`,
      method: 'post',
      data
    })
  },
  getPageList(currentPage, pagesize, searchObj) {
    return request({
      url: `${STOCK_BK_URL}/findHistory`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pagesize,
        'bkCode': searchObj.bkCode,
        'startDate': searchObj.startDate,
        'endDate': searchObj.endDate
      }
    })
  },
  asyncBkMoney(data) {
    return request({
      url: `${STOCK_BK_URL}/asyncBkMoney`,
      method: 'post',
      data
    })
  },
  listBkTopNew(currentPage, pagesize, data) {
    return request({
      url: `${STOCK_BK_URL}/listBkTopNew`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pagesize,
        'startDate': data.startDate,
        'endDate': data.endDate,
        bkType: data.bkType
      }
    })
  },
  getCharStat(data) {
    return request({
      url: `${STOCK_BK_URL}/getCharStat`,
      method: 'post',
      data
    })
  }
}
