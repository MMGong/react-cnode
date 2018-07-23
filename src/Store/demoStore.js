import { observable, action } from 'mobx';

class DemoStore {
  @observable demoCount = 0;

  @action
  setDemoCount(count) {
    this.demoCount = this.demoCount + count;
  }
}

export default new DemoStore();
