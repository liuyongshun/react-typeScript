import fetch from 'node-fetch'
// import { notification } from 'dtd'
import {
  storage
} from './storage'
import {
  CURRENT_CONFIG
} from '../config/env'


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  if (response.status == 401) {
    window.location.reload()
  }
  return response
}

/**
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options, cutomUrl) {
  const defaultOptions = {
    credentials: 'include',
    withCredentials: true
  }
  // 容错处理
  options.method = options.method.toUpperCase()
  const newOptions = {
    ...defaultOptions,
    ...options
  }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    }
    newOptions.body = JSON.stringify(newOptions.data)
  }
  // baseUrl的默认值或是自定义值根据环境变量设置
  let domain = cutomUrl || 'domain'
  let baseUrl = CURRENT_CONFIG[domain]
  let fullUrl = baseUrl + url

  // get请求参数处理
  if (newOptions.method === 'GET' && newOptions.data) {
    let paramsArray = []
    Object.keys(newOptions.data).forEach(key => paramsArray.push(key + '=' + newOptions.data[key]))
    if (fullUrl.search(/\?/) === -1) {
      fullUrl += '?' + paramsArray.join('&')
    } else {
      fullUrl += '&' + paramsArray.join('&')
    }
    delete newOptions.data
  }

  // 获取token
  let token = storage.get('token')
  if (token) fullUrl = fullUrl + '?access_token=' + token
  return fetch(fullUrl, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      }
      return response.json()
    })
    .catch(() => {
      console.error('Error in getting Domain')
    })
}
