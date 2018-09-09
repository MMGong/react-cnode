import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import './index.less';

@inject('loginStore')
@observer
export default class Login extends Component {
  static propTypes = {
    loginStore: PropTypes.observableObject.isRequired,
  }
  state = {
    accessToken: '',
  }
  tokenHandler = (e) => {
    this.setState({
      accessToken: e.target.value,
    });
  }
  login = async () => {
    const data = await this.props.loginStore.checkAccessToken(this.state.accessToken);
    console.log(data);
  }
  render() {
    const {
      accessToken,
    } = this.state;
    return (
      <section className="login flex flex-v">
        <div className="login__wrapper">
          <div className="login__content">
            <div className="login__title">登录</div>
            <input
              className="login__input"
              type="text"
              value={accessToken}
              placeholder="请输入access token"
              onChange={this.tokenHandler}
            />
            <div className="login__btn" onClick={this.login}>登 录</div>
          </div>
        </div>
      </section>
    );
  }
}
