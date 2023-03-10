import request from '@/utils/request'
const HOLIDAY_URL = '/holidayCalendar'
export default {
  getPageList(currentPage, pagesize, searchObj) {
    return request({
      url: `${HOLIDAY_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pagesize,
        'year': 2023
      }
    })
  }
}
