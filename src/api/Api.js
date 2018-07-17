
import axios from 'axios'
import request from '@/utils/request'
import store from '../store'
import { getToken } from '@/utils/auth'
// axios.defaults.headers.token = JSON.stringify({ 'accesstoken': getToken() ? getToken() : '' })
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
  /**
   * 门店登录 start
   * @param {params} 参数
   */
  /**
   * 门店管理 start
   * @param {params} 参数
   */
  // 门店表格 list
  StoreList(params) {
    debugger
    return fetch('/client/clienlist', params)
  }
  /**
   * 配件管理 start
   * @param {params} 参数
   */
}
// 返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    debugger
    axios.post(url, params)
      .then(response => {
        if (response.data.status === -1) {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        } else {
          resolve(response)
        }
      })
      .catch((error) => {
        debugger
        reject(error)
      })
  })
}
// 返回一个Promise(发送post请求)
export function fetchExportExcel(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, { responseType: 'arraybuffer' })
      .then(response => {
        if (response.data.status === -1) {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        } else {
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        if (response.data.status === -1) {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        } else {
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送delete请求)
export function fetchDel(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(response => {
        if (response.data.status === -1) {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        } else {
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

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

export function logout(params) {
  return request({
    url: '/customers/logout',
    method: 'post'
  })
}

export function storeList(params) {
  return request({
    url: '/client/clienlist',
    method: 'post',
    data: params
  })
}

export function storeDetail(params) {
  return request({
    url: '/client/clientinfo',
    method: 'post',
    data: params
  })
}
