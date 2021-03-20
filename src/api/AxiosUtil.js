import Axios from 'axios'

const config = {
  // 基础url前缀
  baseURL: 'http://192.168.200.1:8888/',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 设置超时时间
  timeout: 10000
  // 携带凭证
  // withCredentials: true

  // 返回数据类型
  // responseType: 'json'
}

const AxiosUtil = Axios.create(config)
// // 响应拦截器
AxiosUtil.interceptors.response.use(
  response => {
    if (response.data.success === true) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  })

export default AxiosUtil
