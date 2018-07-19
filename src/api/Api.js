
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
// 门店增改
export function storeAddOrEdit(params) {
  return request({
    url: '/client/insertclient',
    method: 'post',
    data: params
  })
}
/* ******************门店end**********************/

/* ******************配件star**********************/
// 配件列表
export function partsList(params) {
  return request({
    url: '/part/enquirylist',
    method: 'post',
    data: params
  })
}
// 配件删除
export function partsDel(params) {
  return request({
    url: '/part/updatepartflag',
    method: 'post',
    data: params
  })
}
// 配件详情
export function partsDetail(params) {
  return request({
    url: '/part/partinfo',
    method: 'post',
    data: params
  })
}// 配件增改
export function partsAddOrEdit(params) {
  return request({
    url: '/part/insertpart',
    method: 'post',
    data: params
  })
}

/* ******************配件end**********************/

/* ******************账户管理star**********************/
// 账户列表
export function accountUserList(params) {
  return request({
    url: '/account/accountlist',
    method: 'post',
    data: params
  })
}
// 账户作废
export function accountUserAbolish(params) {
  return request({
    url: '/account/updateaccountflag',
    method: 'post',
    data: params
  })
}
// 账户详情
export function accountUserDetail(params) {
  return request({
    url: '/account/accountinfo',
    method: 'post',
    data: params
  })
}
// 账户增改
export function accountUserAddOrEdit(params) {
  return request({
    url: '/account/insertaccount',
    method: 'post',
    data: params
  })
}
/* ******************账户管理end**********************/

/* ******************公司管理star**********************/
// 公司列表
export function companyList(params) {
  return request({
    url: '/company/companylist',
    method: 'post',
    data: params
  })
}
// 公司作废
export function companyAbolish(params) {
  return request({
    url: '/company/updatecompanyflag',
    method: 'post',
    data: params
  })
}
// 公司详情
export function companyDetail(params) {
  return request({
    url: '/company/companyinfo',
    method: 'post',
    data: params
  })
}
// 公司增改
export function companyAddOrEdit(params) {
  return request({
    url: '/company/insertcompany',
    method: 'post',
    data: params
  })
}
// 公司信息 select
export function getCompanySelect(params) {
  return request({
    url: '/company/getcompany',
    method: 'post',
    data: params
  })
}
/* ******************公司管理end**********************/
