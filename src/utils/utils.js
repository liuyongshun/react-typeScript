import Immutable from 'immutable'
import { CURRENT_CONFIG } from '@/config/env'
import { storage } from './storage'
import { userData } from '@/config/global'
import randomstring from 'randomstring'

// 获取唯一key
export function getKey() {
  let key = ''
  for (let i = 0 ; i < 8 ; i++) {
    key += ~~(Math.random() * 10)
  }
  return key
}

// 深层比较
export function comparison(a, b) {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b))
}

// 返回登录页
export const reLogin = isOrigin => {
  let redirectUri = isOrigin ? window.location.origin : window.location.origin + window.location.pathname
  window.location.href =
    CURRENT_CONFIG.loginUrl +
    `?client_id=${userData.client_id}&redirect_uri=` +
    redirectUri +
    '&response_type=code&state=' +
    randomstring.generate(10) +
    '&scope=openid'
}

// 本地登录校验
export const hasLogin = () => {
  return !!storage.get('token')
}

// 获取当前 url 参数值
export const getQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}