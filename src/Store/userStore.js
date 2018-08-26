import { observable, action, runInAction } from 'mobx';
import apis from '../Api';

class UserStore {
  @observable userInfo = {};

  @action.bound
  getUserInfo(loginName) {
    return apis('getUserDetail', {}, {
      pathExtra: `/${loginName}`
    }).then((data) => {
      if (data && data.success && data.data) {
        runInAction(() => {
          this.userInfo = data.data;
        });
      }
    });
  }
}

export default new UserStore();
