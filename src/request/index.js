import axios from 'axios'
import { CURRENT_CONFIG } from '@/config/env'

const showError = () => {
  console.log('请求出错')
}

const request = axios.create({
  baseURL: '',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

request.interceptors.request.use(
  config => {
    const copyConfig = { ...config }
    const domain = copyConfig.domain || 'domain'
    copyConfig.baseURL = CURRENT_CONFIG[domain]
    const token = window.localStorage.getItem('token')
    // 通过 url 传递token
    if (token) copyConfig.url = `${copyConfig.url}?access_token=${token}`
    return copyConfig
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { data } = response
    if (data.status === 200) {
      return data.data
    }
    if ([401, 601].indexOf(data.status) !== -1) {
      // reLogin()
      return Promise.reject(data)
    }
    showError()
    return Promise.reject(data)
  },
  error => {
    showError()
    return Promise.reject(error)
  }
)

export default request
