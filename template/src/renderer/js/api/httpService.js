import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bus from 'bus'
import { StorageUtils } from '../util/storage';
import router from '../../router/index'

Vue.use(VueAxios, axios)
Vue.axios.defaults.timeout = 15000

Vue.axios.interceptors.request.use(function(request) {
  bus.$emit('add-loading-item-count');
  return request;
})

Vue.axios.interceptors.response.use(
  function (response) {
    bus.$emit('decrease-loading-item-count');
    const { data, status } = response
    if (status === 200) {
      bus.$emit('set-net-error', false);
      if (data.code === 200) {
        return data.data
      } else if(data.code === 403 && data.desc === '非法访问') {
        StorageUtils.setToken('');
        router.push('login');
        bus.$emit('toast', { type: 'error', msg: '非法访问，请重新登录', lastTime: 2 });
      } else {
        bus.$emit('closeToast')
        bus.$emit('toast', { type: 'error', msg: data.desc, lastTime: 2 })
        return Promise.reject(data);
      }
    }
  }, function (error) {
    bus.$emit('decrease-loading-item-count');
    bus.$emit('set-net-error', true);
    return error;
  }
)
const defaultHeaders = {'access-token': StorageUtils.getToken()}
// const defaultHeaders = { 'access-token': StorageUtils.getToken(), 'User-Agent': `vod-client-${process.env.npm_package_version}` }

export class HttpService {

  static setAccessToken(token) {
    defaultHeaders['access-token'] = token
  }

  static get (url, params, headers = {}) {
    headers = Object.assign({}, defaultHeaders, headers);
    const options = {
      method: 'get',
      params,
      headers,
      url
    }
    return Vue.axios(options)
  }

  static post (url, data, headers = { 'content-type': 'application/json;charset=UTF-8;' }) {
    headers = Object.assign({}, defaultHeaders, headers);
    const options = {
      method: 'POST',
      headers,
      data,
      url
    }
    return Vue.axios(options)
  }

  static postForm (url, params, headers = { 'content-type': 'application/x-www-form-urlencoded' }) {
    headers = Object.assign({}, defaultHeaders, headers);
    const options = {
      method: 'POST',
      headers,
      data: qs.stringify(params),
      url
    }
    return Vue.axios(options)
  }

  /**
   * 文件上传
   * @param url
   * @param data  必须是一个 FormData 对象
   * @param headers
   * @return {AxiosPromise}
   */
  static postUpload (url, data, headers = { 'content-type': 'multipart/form-data' }) {
    headers = Object.assign({}, defaultHeaders, headers);
    const options = {
      method: 'POST',
      headers,
      data,
      url
    }
    return Vue.axios(options)
  }

  static getOrigin (domain) {
    console.log('BUILD_ENV=', BUILD_ENV);
    const reg = new RegExp(/\/\/test([-.])/);
    if (BUILD_ENV.trim() === 'test') {
      return domain.replace(reg, '//test$1');
    } else if (BUILD_ENV.trim() === 'dev') {
      return domain.replace(reg, '//test$1');
    } else if (BUILD_ENV.trim() === 'pre') {
      return domain.replace(reg, '//pre$1');
    } else if (BUILD_ENV.trim() === 'prd') {
      return domain.replace(reg, '//');
    }
  }
}
