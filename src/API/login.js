import request from '@/request'

export const login = data => {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export const register = data => {
  return request({
    url: '/api/v1/register',
    method: 'post',
    data
  })
}

// export const register = () => {
//   return request({
//     url: '/api/v1/register',
//     method: 'post',
//     domain: 'other'
//   })
// }
