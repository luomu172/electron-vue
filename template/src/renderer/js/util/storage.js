import { ipcRenderer } from 'electron'
import { GET_STORAGE, SET_STORAGE } from '../../../main/util/constance'

export class StorageUtils {
  /** *************************** localStorage ****************************/
  /* 新增/更新localStorage,存储数字与字符串 */
  static setLocalStorage (key, val) {
    return localStorage.setItem(key, val + '');
  }
  /* 获取localStorage */
  static getLocalStorage (key) {
    return localStorage.getItem(key);
  }
  /* 新增/更新localStorage,序列化后的 */
  static setSerializeLocalStorage (key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  /* 获取localStorage,反序列化后的 */
  static getDeserializeLocalStorage (key) {
    return JSON.parse(localStorage.getItem(key));
  }
  /* 删除localStorage */
  static removeLocalStorage (key) {
    return localStorage.removeItem(key);
  }
  /** *************************** localStorage ****************************/

  /** *************************** sessionStorage begin ****************************/
  static setSessionStorage (key, val) {
    return sessionStorage.setItem(key, val + '');
  }
  static getSessionStorage (key) {
    return sessionStorage.getItem(key);
  }
  static setSerializeSessionStorage (key, val) {
    return sessionStorage.setItem(key, JSON.stringify(val));
  }
  static getDeserializeSessionStorage (key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  static removeSessionStorage (key) {
    return sessionStorage.removeItem(key);
  }
  /** *************************** sessionStorage end ****************************/

  /** 存在本地文件的storage begin */
  static setDiskStorage (key, val) {
    ipcRenderer.send(SET_STORAGE, key, val);
  }

  static getDiskStorage (key) {
    return ipcRenderer.sendSync(GET_STORAGE, key);
  }

  /** 存在本地文件的storage end */

  /** *************************** 业务方法 begin ****************************/
  static setUser (user) {
    return StorageUtils.setSerializeLocalStorage('user', user);
  }

  static getUser () {
    return StorageUtils.getDeserializeLocalStorage('user');
  }

  static setToken (token) {
    return localStorage.setItem('access-token', token);
  }
  static getToken () {
    return localStorage.getItem('access-token');
  }
  static setPrincipal (principal) {
    return StorageUtils.setSerializeLocalStorage('principal', principal);
  }
  static getPrincipal () {
    return StorageUtils.getDeserializeLocalStorage('principal');
  }
  static removePrincipal () {
    return StorageUtils.removeLocalStorage('principal');
  }
  /** *************************** 业务方法 end ****************************/
}
