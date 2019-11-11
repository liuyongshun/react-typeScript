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

export const getReceptionList = data => {
  return request('/reception/receptionList', {
    method: 'POST',
    data: data
  }, dashboardDomain)
}
