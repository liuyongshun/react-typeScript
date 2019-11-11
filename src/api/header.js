import request from '@/utils/request'
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
export const getHeaderApps = () => {
  return request('/api/common/workbench/getHeaderApps', {
    method: 'GET'
  }, dashboardDomain)
}

export const getBackLogCount = () => {
  return request('/openApi/backlog/countBacklog', {
    method: 'GET'
  }, dashboardDomain)
}

export const getBackLogList = () => {
  return request('/openApi/backlog/queryBacklog', {
    method: 'POST'
  }, dashboardDomain)
}

export const getMessageCount = () => {
  return request('/openApi/message/countMessage', {
    method: 'GET'
  }, dashboardDomain)
}

export const getdMessageList = () => {
  return request('/openApi/message/queryMessage', {
    method: 'POST'
  }, dashboardDomain)
}
