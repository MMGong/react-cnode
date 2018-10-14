import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import dateFormat from 'date-fns/format/index';
import RecentItem from './recentItem';
import './index.less';

@withRouter
@inject(stores => ({
  userStore: stores.userStore,
  loginStore: stores.loginStore,
  userInfo: stores.loginStore.userInfo,
  myCollectTopics: stores.loginStore.myCollectTopics,
}))
@observer
export default class User extends Component {
  static propTypes = {
    userStore: PropTypes.observableObject.isRequired,
    loginStore: PropTypes.observableObject.isRequired,
    match: PropTypes.objectOrObservableObject.isRequired,
    myCollectTopics: PropTypes.observableArray.isRequired,
  }
  state = {
    activeTab: 1, // 1:最近创建的 2：最近参与的
    tabList: [{
      id: 1,
      desc: '最近创建的话题',
      list: [],
    }, {
      id: 2,
      desc: '最近参与的话题',
      list: [],
    }, {
      id: 3,
      desc: '我的收藏',
      list: [],
    }],
    isMySelf: this.props.loginStore.userInfo.loginname === this.props.match.params.loginname
  }
  componentDidMount() {
    const loginname = this.props.match.params.loginname;
    this.props.userStore.getUserInfo(loginname);
    this.props.loginStore.getUserCollectTopics(loginname);
  }
  componentWillReceiveProps(nextProps) {
    const curLoginname = this.props.match.params.loginname;
    const willLoginname = nextProps.match.params.loginname;
    if (curLoginname !== willLoginname) {
      this.props.userStore.getUserInfo(willLoginname);
      this.setState({
        activeTab: 1,
      });
    }
    this.changeTabList(nextProps.myCollectTopics);
  }
  changeTabList(list) {
    const tabList = this.state.tabList;
    tabList[2].list = list;
    this.setState({
      tabList: tabList,
    });
  }
  changeTab = (id) => {
    this.setState({
      activeTab: id,
    });
  }
  render() {
    const userInfo = this.props.userStore.userInfo;
    const {
      activeTab,
      tabList,
      isMySelf,
    } = this.state;
    let list = [];
    if (activeTab === 1) {
      list = userInfo.recent_topics || [];
    } else if (activeTab === 2) {
      list = userInfo.recent_replies || [];
    } else {
      list = tabList[2] ? tabList[2].list : [];
    }
    return (
      <section className="user">
        <div className="user__info flex">
          <div className="user__info__avatar" style={{ backgroundImage: `url(${userInfo.avatar_url})` }} />
          <div className="user__info__content flex flex-1 flex-v flex-h-between">
            <div className="user__info__content--loginname">{userInfo.loginname}</div>
            <div className="user__info__content--github">积分: {userInfo.score}</div>
            <div className="user__info__content--createtime">创建于: {userInfo.create_at ? dateFormat(userInfo.create_at, 'YYYY-MM-DD HH:mm') : ''}</div>
            {
              isMySelf && (
                <Link to="/write" className="user__write">写文章</Link>
              )
            }
          </div>
        </div>
        <div style={{ background: '#f4f5f5', height: '1rem' }} />
        <div className="user__info__tab flex">
          {
            tabList.map(item => (
              <div
                key={item.id}
                className={`user__info__tab--item flex flex-v-c flex-h-c flex-1 ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => this.changeTab(item.id)}
              >
                {item.desc}
              </div>
            ))
          }
        </div>
        <ul>
          {
            list.map(item => (<RecentItem key={item.id} info={item} />))
          }
          {
            list.length === 0 && (<div className="user__info__empty padding-tb-12 text-center">暂无数据</div>)
          }
        </ul>
      </section>
    );
  }
}
