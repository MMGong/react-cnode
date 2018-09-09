/*
 * @Author: gonghao
 * @Date: 2018-08-26 19:39:59
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-09-08 23:19:50
 * @Desc: 用于获取、校验、存储access token
 */

import { observable, action, runInAction } from 'mobx';
import apis from '../Api';

const ACCESS_TOKEN_KEY = 'gh_cnode_access_token';
const USERINFO = 'gh_cnode_userinfo';
/**
 * 获取accessToken
 */
function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    return '';
  }
}
/**
 * 设置accessToken
 * @param {String} accessToken accessToken
 */
function setAccessToken(accessToken) {
  if (!accessToken) return;
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } catch (error) {
    console.error('accessToken设置失败');
  }
}
/**
 * 获取用户信息
 */
function getUserInfo() {
  try {
    const userInfo = localStorage.getItem(USERINFO);
    if (userInfo) {
      return JSON.parse(userInfo) || {};
    }
    return {};
  } catch (error) {
    return {};
  }
}
/**
 * 设置用户信息
 * @param {Object} info 用户信息
 */
function setUserInfo(info) {
  if (!info) return;
  try {
    localStorage.setItem(USERINFO, JSON.stringify(info));
  } catch (error) {
    console.error('用户信息设置失败');
  }
}

const accessToken = getAccessToken();
const userInfo = getUserInfo();

class LoginStore {
  @observable accessToken = accessToken; // accessToken
  @observable userInfo = userInfo; // 用户信息
  @observable lastUrl = ''; // 上次访问的url
  @observable myCollectTopics = []; // 我收藏的文章

  @action.bound
  async checkAccessToken(accessTokenParam = accessToken, notLocation = false) { // 检查accessToken
    try {
      const data = await apis('accesstoken', {
        accesstoken: accessTokenParam,
      });
      if (data && data.success) {
        runInAction(() => {
          this.accessToken = accessTokenParam;
          this.userInfo = data;
          setAccessToken(accessTokenParam);
          setUserInfo(data);
          if (!notLocation) {
            window.location.href = this.lastUrl || '/';
          }
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  @action.bound
  setLastUrl(url) { // 设置上次访问的url，登录后直接返回过去
    this.lastUrl = url;
  }

  @action.bound
  async getUserCollectTopics() {
    try {
      const data = await apis('getUserCollectTopics', {}, {
        pathExtra: `/${this.userInfo.loginname}`
      });
      console.log(data);
      if (data && data.success) {
        runInAction(() => {
          this.myCollectTopics = data.data;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new LoginStore();
