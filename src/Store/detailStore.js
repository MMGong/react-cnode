/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:16:16
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-07-30 23:51:54
 * @Desc: 文章详情
 */

import { observable, action, runInAction } from 'mobx';
import apis from '../Api';

class DetailStore {
  @observable topicDetail = {};

  @action.bound
  getTopicDetail(id) { // 获取文章详情
    return apis('getTopicDetail', {}, {
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
}

export default new DetailStore();
