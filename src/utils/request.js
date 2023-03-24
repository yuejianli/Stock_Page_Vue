import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken() || ''
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      if (res.code === 10011005) {
        MessageBox.confirm(
          '该用户配置的东方财富账号未登录或者登录已失效',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          localStorage.setItem('tradeUserNoLogin', true)
        })
      } else if (res.code === 10011003 || res.code === 10011004) {
        MessageBox.confirm(
          '当前登录用户未配置东方财富用户,请联系管理员进行配置',
          '退出登录',
          {
            confirmButtonText: '联系管理员',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          localStorage.setItem('relation', true)
        })
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.response.status === 401) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // 将token 移除掉
        removeToken()
        return Promise.reject(error)
      })
    }
  }
)

export default service
