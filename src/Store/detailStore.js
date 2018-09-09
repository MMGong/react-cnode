/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:16:16
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-09-09 13:28:50
 * @Desc: 文章详情
 */

import { observable, action, runInAction } from 'mobx';
import { message } from 'antd';
import loginStore from './loginStore';
import history from '../Router/history';
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
        return data;
      }
      return '';
    });
  }

  @action.bound
  clearTopicDetail() {
    this.topicDetail = {};
  }

  /**
   * 点在
   * @param {*} replyId 评论id
   * @param {*} index 索引
   * @param {*} accessToken accesstoken
   */
  @action.bound
  async upReply(replyId, index, accessToken) {
    if (!loginStore.accessToken) {
      loginStore.setLastUrl(window.location.href);
      history.push('/login');
      return;
    }
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
  /**
   * 收藏或取消收藏文章
   * @param {*} isCollect 是否收藏
   */
  @action.bound
  async collectTopic(isCollect = true) {
    if (!loginStore.accessToken) {
      loginStore.setLastUrl(window.location.href);
      history.push('/login');
      return;
    }
    try {
      const data = await apis(isCollect ? 'collectTopic' : 'delCollectTopic', {
        accesstoken: loginStore.accessToken,
        topic_id: this.topicDetail.id,
      });
      if (data && data.success) {
        runInAction(() => {
          this.topicDetail.is_collect = isCollect;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 创建评论
   * @param {String} content 评论内容
   */
  @action.bound
  createReply(content, replyId) {
    if (!loginStore.accessToken) {
      loginStore.setLastUrl(window.location.href);
      history.push('/login');
      return '';
    }
    return apis('createReply', {
      accesstoken: loginStore.accessToken,
      content: content,
      reply_id: replyId,
    }, {
      pathExtra: `/${this.topicDetail.id}/replies`,
    }).then((data) => {
      if (data && data.success) {
        return this.getTopicDetail(this.topicDetail.id);
      }
      return '';
    }).catch(() => {
      message.error('网络请求错误！');
    });
  }
}

export default new DetailStore();
