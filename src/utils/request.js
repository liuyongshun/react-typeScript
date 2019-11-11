import fetch from 'node-fetch'
// import { notification } from 'dtd'
import { storage } from './storage'
import { CURRENT_CONFIG } from '../config/env'

// const codeMessage = {
//   200: '服务器成功返回请求的数据',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器',
//   502: '网关错误',
//   503: '服务不可用，服务器暂时过载或维护',
//   504: '网关超时'
// };

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
  const newOptions = { ...defaultOptions, ...options }
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
    // 对返回的json进行处理
    // .then((res) => {
    //   if (res.status >= 200 && res.status < 300) {
    //     return res
    //   } else {
    //     notification.error({
    //       message: res.message
    //     })
    //     return res
    //   }
    // })
    .catch(() => {
      console.error('Error in getting Domain')
    })
}
