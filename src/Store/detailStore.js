/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:16:16
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-08-28 10:31:29
 * @Desc: 文章详情
 */

import { observable, action, runInAction } from 'mobx';
import loginStore from './loginStore';
import apis from '../Api';

class DetailStore {
  @observable topicDetail = {};

  @action.bound
  getTopicDetail(id) { // 获取文章详情
    return apis('getTopicDetail', {
      accesstoken: loginStore.accessToken,
    }, {
      pathExtra: `/${id}`,
    }).then((data) => {
      if (data.success) {
        runInAction(() => {
          this.topicDetail = data.data;
        });
      }
    });
  }

  @action.bound
  clearTopicDetail() {
    this.topicDetail = {};
  }

  @action.bound
  async upReply(replyId, index, accessToken) {
    try {
      const data = await apis('upsReply', {
        accesstoken: accessToken,
      }, {
        pathExtra: `/${replyId}/ups`
      });
      if (data && data.success) {
        const replies = this.topicDetail.replies;
        runInAction(() => {
          replies[index].is_uped = data.action === 'up';
          if (data.action === 'up') {
            replies[index].ups.push(loginStore.userInfo.id);
          } else {
            replies[index].ups.pop();
          }
          this.topicDetail.replies = replies;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new DetailStore();
