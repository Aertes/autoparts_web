
// import axios from 'axios'
import request from '@/utils/request'
// import { getToken } from '@/utils/auth'
// axios.defaults.headers.token = JSON.stringify({ 'accesstoken': getToken() ? getToken() : '' })
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// 登出
export function logout(params) {
  return request({
    url: '/customers/logout',
    method: 'post',
    data: params
  })
}

/* ******************门店star**********************/
// 配件商登录
export function autopartsAccountLogin(username, userpsd) {
  return request({
    url: '/customers/autopartsAccountLogin',
    method: 'post',
    data: {
      username,
      userpsd
    }
  })
}

// 门店登录
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

// 门店列表
export function storeList(params) {
  return request({
    url: '/client/clienlist',
    method: 'post',
    data: params
  })
}
// 门店详情
export function storeDetail(params) {
  return request({
    url: '/client/clientinfo',
    method: 'post',
    data: params
  })
}
/* ******************门店end**********************/
