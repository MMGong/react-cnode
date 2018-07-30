import { observable, action, runInAction } from 'mobx';
import apis from '../Api';

class HomeStore {
  @observable topicList = [];

  @action.bound
  getTopicList(options = {
    page: 1,
    tab: '',
    limit: 20,
  }) {
    return apis('getTopics', options).then((data) => {
      console.log('data:', data);
      if (data.success) {
        runInAction(() => {
          this.topicList = this.topicList.concat(data.data);
        });
      }
    });
  }
}

export default new HomeStore();
