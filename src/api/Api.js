import request from '@/utils/request'

export function clientLogin(username, userpsd) {
  return request({
    url: '/customers/autopartsClientLogin',
    method: 'post',
    data: {
      username,
      userpsd
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(params) {
  debugger
  return request({
    url: '/customers/logout',
    method: 'post',
    data: params
  })
}

export function storeList(params) {
  return request({
    url: '/client/clienlist',
    method: 'post',
    data: params
  })
}
