import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

@withRouter
export default class Nav extends PureComponent {
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
  static getDerivedStateFromProps(nextProps) {
    return {
      isActive: !nextProps.match.params.id ? 'all' : nextProps.match.params.id,
    };
  }
  render() {
    console.log(this.props, this.state);
    const {
      navList,
      isActive,
    } = this.state;
    return (
      <nav className="home__nav">
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
      </nav>
    );
  }
}
