import request from '@/utils/request'
let userDomain = 'userDomain'
/**
 * 第三个参数用来改变请求接口的的baseUrl
 * tokenDomain        dev&sit
 * userDomain         dev&sit
 * dashboardDomain    dev&sit
 * domain             all
 * loginUrl           all
 * logoutUrl          uat&tra&pro
 */
export const getAppMenuTree = () => {
  return request('/api/user/getAppMenuTree', {
    method: 'get'
  }, userDomain)
}

export const getUserPortals = () => {
  return request('/api/employee/portals', {
    method: 'get'
  }, userDomain)
}
