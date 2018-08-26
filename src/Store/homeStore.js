/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:16:47
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-07-30 23:16:47
 * @Desc: 文章列表
 */

import { observable, action, runInAction } from 'mobx';
import apis from '../Api';

class HomeStore {
  @observable topicList = []; // 列表

  @action.bound
  getTopicList(options = {
    page: 1,
    tab: '',
    limit: 20,
  }, isReset) {
    return apis('getTopics', options).then((data) => {
      if (data.success) {
        runInAction(() => {
          if (isReset) {
            this.topicList = data.data;
          } else {
            this.topicList = this.topicList.concat(data.data);
          }
        });
      }
    });
  }

  @action.bound
  clearTopicList() {
    this.topicList = [];
  }
}

export default new HomeStore();
