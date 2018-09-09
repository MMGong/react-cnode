import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import message from '../../Components/Toast';
import apis from '../../Api';
import history from '../../Router/history';
import './index.less';

@inject(stores => ({
  accessToken: stores.loginStore.accessToken,
}))
@observer
export default class Write extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
  }
  state = {
    tabList: [
      { id: 'ask', desc: '问答' },
      { id: 'share', desc: '分享' },
      { id: 'job', desc: '招聘' },
      { id: 'dev', desc: '客户端测试' },
    ],
    tab: '',
    title: '',
    content: '',
  }
  componentDidMount() {
    if (!this.props.accessToken) {
      history.push('/login');
    }
  }
  tabHandler = (e) => {
    this.setState({
      tab: e.target.value,
    });
  }
  titleHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  }
  contentHandler = (e) => {
    this.setState({
      content: e.target.value,
    });
  }
  confirm = async () => {
    const {
      tab,
      title,
      content,
    } = this.state;
    if (!tab) {
      message.warn('请选择模块');
      return;
    }
    if (!title) {
      message.warn('请输入标题');
      return;
    }
    if (!content) {
      message.warn('请输入内容');
      return;
    }
    const data = await apis('createTopic', {
      accesstoken: this.props.accessToken,
      title: title,
      tab: tab,
      content: content,
    });
    if (data && data.success) {
      history.push('/');
    }
  }
  render() {
    const {
      tabList,
      tab,
      title,
      content,
    } = this.state;
    return (
      <section className="write clearfix">
        <div className="write__cont flex flex-v-c">
          <div className="write__cont__left">选择模块：</div>
          <div className="write__cont__right flex-1">
            <select onChange={this.tabHandler} value={tab}>
              <option value={0}>请选择</option>
              {
                tabList.map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.desc}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="write__cont flex flex-v-c">
          <div className="write__cont__left">标题：</div>
          <div className="write__cont__right flex-1">
            <input
              type="text"
              placeholder="请输入标题"
              onChange={this.titleHandler}
              value={title}
            />
          </div>
        </div>
        <div className="write__cont flex flex-v-c">
          <div className="write__cont__left">内容：</div>
          <div className="write__cont__right flex-1">
            <textarea
              type="text"
              placeholder="请输入内容"
              onChange={this.contentHandler}
              value={content}
            />
          </div>
        </div>
        <button className="write__confirm float-right" onClick={this.confirm}>提交</button>
      </section>
    );
  }
}
