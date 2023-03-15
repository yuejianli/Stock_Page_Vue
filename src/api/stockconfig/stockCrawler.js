import request from '@/utils/request'
const CRAWLER_URL = '/stockCrawler'
export default {
  getInfoNow(code) {
    return request({
      url: `${CRAWLER_URL}/getStockInfo`,
      method: 'post',
      data: {
        'code': code
      }
    })
  },
  getStockKline(fullCode, type) {
    return request({
      url: `${CRAWLER_URL}/getStockKline`,
      method: 'post',
      data: {
        'code': fullCode,
        type: type
      }
    })
  },
  stockHistoryAsync(data) {
    return request({
      url: `${CRAWLER_URL}/stockHistoryAsync`,
      method: 'post',
      data
    })
  }
}
