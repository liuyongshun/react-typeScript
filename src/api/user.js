import request from '@/utils/request'
let tokenDomain = 'tokenDomain'
let dashboardDomain = 'dashboardDomain'
/**
 * 第三个参数用来改变请求接口的的baseUrl
 * tokenDomain        dev&sit
 * userDomain         dev&sit
 * dashboardDomain    dev&sit
 * domain             all
 * loginUrl           all
 * logoutUrl          uat&tra&pro
 */
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return request('/login', {
    method: 'POST',
    data: data
  })
}

export const logout = ({ token }) => {
  const data = {
    token
  }
  return request('/api/user/logout', {
    method: 'GET',
    data: data
  })
}

export const getAccessToken = data => {
  return request('/oauth2/token', {
    method: 'POST',
    data: data
  }, tokenDomain)
}

export const getUserInfo = data => {
  return request('/api/common/workbench/getPersonalInfo', {
    method: 'POST',
    data: data
  }, dashboardDomain)
}
