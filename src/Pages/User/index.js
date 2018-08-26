import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import dateFormat from 'date-fns/format';
import RecentItem from './recentItem';
import './index.less';

@withRouter
@inject('userStore')
@observer
export default class User extends Component {
  static propTypes = {
    userStore: PropTypes.observableObject.isRequired,
    match: PropTypes.objectOrObservableObject.isRequired,
  }
  state = {
    activeTab: 1, // 1:最近创建的 2：最近参与的
  }
  componentDidMount() {
    this.props.userStore.getUserInfo(this.props.match.params.loginname);
  }
  changeTab = () => {
    this.setState({
      activeTab: this.state.activeTab === 1 ? 2 : 1,
    });
  }
  render() {
    const userInfo = this.props.userStore.userInfo;
    const activeTab = this.state.activeTab;
    const list = activeTab === 1
      ? (userInfo.recent_topics || []) : (userInfo.recent_replies && userInfo.recent_replies);
    return (
      <section className="user">
        <div className="user__info flex">
          <div className="user__info__avatar" style={{ backgroundImage: `url(${userInfo.avatar_url})` }} />
          <div className="user__info__content flex flex-1 flex-v flex-h-between">
            <div className="user__info__content--loginname">{userInfo.loginname}</div>
            <div className="user__info__content--github">积分: {userInfo.score}</div>
            <div className="user__info__content--createtime">{userInfo.create_at ? dateFormat(userInfo.create_at, 'YYYY-MM-DD HH:mm') : ''}</div>
          </div>
        </div>
        <div style={{ background: '#f4f5f5', height: '1rem' }} />
        <div className="user__info__tab flex">
          <div
            className={`user__info__tab--item flex flex-v-c flex-h-c flex-1 ${activeTab === 1 ? 'active' : ''}`}
            onClick={this.changeTab}
          >
            最近创建的话题
          </div>
          <div
            className={`user__info__tab--item flex flex-v-c flex-h-c flex-1 ${activeTab === 2 ? 'active' : ''}`}
            onClick={this.changeTab}
          >
            最近参与的话题
          </div>
        </div>
        <ul>
          {
            list.map(item => (<RecentItem key={item.id} info={item} />))
          }
        </ul>
      </section>
    );
  }
}
