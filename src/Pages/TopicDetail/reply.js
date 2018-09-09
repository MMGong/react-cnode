import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject(stores => ({
  createReply: stores.detailStore.createReply,
}))
@observer
export default class Replay extends Component {
  static propTypes = {
    createReply: PropTypes.func.isRequired,
    replyId: PropTypes.string,
    placeholder: PropTypes.string,
    hideCb: PropTypes.func,
  }
  static defaultProps = {
    replyId: '',
    placeholder: '说说你的看法...',
    hideCb: () => {},
  }
  state = {
    content: '',
  }
  textChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  }
  createReply = () => {
    let content = this.state.content;
    if (this.props.replyId) {
      content = `${this.props.placeholder} ${content}`;
    }
    content += `
    

来自✨ [react-cnode](https://github.com/MMGong/react-cnode) ✨`;
    this.props.createReply(content, this.props.replyId).then((data) => {
      if (data) {
        this.setState({
          content: '',
        });
        window.scrollTo(0, document.body.scrollHeight);
        this.props.hideCb();
      }
    });
  }
  render() {
    const content = this.state.content;
    const placeholder = this.props.placeholder;
    return (
      <div className="reply__text clearfix">
        <div className="reply__text--title">评论</div>
        <textarea
          className="reply__text--textarea"
          onChange={this.textChange}
          placeholder={placeholder}
          value={content}
        />
        <button
          className="reply__text--btn float-right"
          onClick={this.createReply}
        >回复
        </button>
      </div>
    );
  }
}

