import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';

@withRouter
@inject(stores => ({
  userInfo: stores.loginStore.userInfo,
  accessToken: stores.loginStore.accessToken,
  checkAccessToken: stores.loginStore.checkAccessToken,
}))
@observer
export default class Nav extends Component {
  static propTypes = {
    userInfo: MobxPropTypes.observableObject.isRequired,
    accessToken: PropTypes.string.isRequired,
    checkAccessToken: PropTypes.func.isRequired,
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      isActive: !nextProps.match.params.id ? 'all' : nextProps.match.params.id,
    };
  }
  state = {
    navList: [{
      key: 'all',
      desc: '全部',
      path: '',
    }, {
      key: 'good',
      desc: '精华',
      path: '/good',
    }, {
      key: 'share',
      desc: '分享',
      path: '/share',
    }, {
      key: 'ask',
      desc: '问答',
      path: '/ask',
    }, {
      key: 'job',
      desc: '招聘',
      path: '/job',
    }],
    isActive: 'all',
  }
  componentDidMount() {
    if (this.props.accessToken) {
      this.props.checkAccessToken(this.props.accessToken, true);
    }
  }
  render() {
    const {
      navList,
      isActive,
    } = this.state;
    const userInfo = this.props.userInfo;
    return (
      <nav className="home__nav flex">
        <ul className="home__nav__list">
          <li className="home__nav__item" style={{ fontSize: '1.5rem' }}>CNODE</li>
          {
            navList.map(item => (
              <li
                key={item.key}
                className={isActive === item.key ? 'home__nav__item active' : 'home__nav__item'}
              >
                <Link to={`/theme${item.path}`} >{item.desc}</Link>
              </li>
            ))
          }
        </ul>
        <Link
          to={userInfo.loginname ? `/user/${userInfo.loginname}` : '/login'}
          className="home__user flex flex-v-c flex-h-end"
        >
          <div
            className="home__user__avatar"
            style={{
              backgroundImage: `url(${userInfo.avatar_url})`
            }}
          />
          <span className="home__user__name ellipsis" title={userInfo.loginname || '登录'}>{userInfo.loginname || '登录'}</span>
        </Link>
      </nav>
    );
  }
}
