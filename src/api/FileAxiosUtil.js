import Axios from 'axios'

const config = {
  method: 'post',
  // 基础url前缀
  baseURL: 'http://192.168.200.1:8888/',
  // 请求头信息
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  // data: null,
  // processData: false,// 告诉axios不要去处理发送的数据(重要参数)
  // contentType: false,// 告诉axios不要去处理发送的数据(重要参数)
  // 携带凭证
  // withCredentials: true
  // 返回数据类型
  responseType: 'json'
}

const FileAxioxUtil = Axios.create(config)

FileAxioxUtil.interceptors.response.use(
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

export default FileAxioxUtil
