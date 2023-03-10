import request from '@/utils/request'
const JOB_INFO_URL = '/jobInfo'
export default {
  getPageList(currentPage, pageSize, searchObj) {
    return request({
      url: `${JOB_INFO_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pageSize
      }
    })
  },
  disable(jobId) {
    return request({
      url: `${JOB_INFO_URL}/disable`,
      method: 'post',
      data: {
        'id': jobId
      }
    })
  },
  enable(jobId) {
    return request({
      url: `${JOB_INFO_URL}/enable`,
      method: 'post',
      data: {
        'id': jobId
      }
    })
  },
  handler(jobId) {
    return request({
      url: `${JOB_INFO_URL}/handler`,
      method: 'post',
      data: {
        'id': jobId
      }
    })
  },
  deleteJob(jobId) {
    return request({
      url: `${JOB_INFO_URL}/delete`,
      method: 'post',
      data: {
        'id': jobId
      }
    })
  }
}
