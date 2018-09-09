/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now/index';
import zhLocale from 'date-fns/locale/zh_cn/index';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Reply from './reply';

@inject(stores => ({
  upReply: stores.detailStore.upReply,
  accessToken: stores.loginStore.accessToken,
}))
@observer
export default class ReplyList extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    upReply: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
  }
  state = {
    replyMap: {},
    // currentReplyId: '',
  }
  up = (replyId, index) => {
    this.props.upReply(replyId, index, this.props.accessToken);
  }
  reply = (replyId) => {
    const replyMap = this.state.replyMap;
    if (replyMap[replyId]) {
      replyMap[replyId] = false;
    } else {
      Object.keys(replyMap).forEach((item) => {
        replyMap[item] = false;
      });
      replyMap[replyId] = !replyMap[replyId];
    }
    this.setState({
      // currentReplyId: replyId,
      replyMap: replyMap,
    });
  }
  hideReply = () => {
    const replyMap = this.state.replyMap;
    Object.keys(replyMap).forEach((item) => {
      replyMap[item] = false;
    });
    this.setState({
      replyMap: replyMap,
    });
  }
  render() {
    const list = this.props.list;
    const replyMap = this.state.replyMap;
    return (
      <section className="reply">
        <ul className="reply__list">
          {
            list.map((item, index) => (
              <li className="flex reply__item" key={item.id}>
                <Link to={`/user/${item.author.loginname}`} className="reply__item__left">
                  <div
                    className="reply__item--avatar"
                    style={{ backgroundImage: `url(${item.author.avatar_url})` }}
                  />
                </Link>
                <div className="reply__item__right flex-1">
                  <div className="reply__item__user">
                    <span>
                      <Link
                        to={`/user/${item.author.loginname}`}
                        className="reply__item__user--item middle-dot"
                      >
                        {item.author.loginname}
                      </Link>
                      <span className="reply__item__user--item middle-dot">{index + 1}楼</span>
                      <span className="reply__item__user--item middle-dot">{distanceInWordsToNow(new Date(item.create_at), { locale: zhLocale })}前</span>
                    </span>
                    <span
                      className="float-right reply__item__icon reply__item__icon--huifu"
                      onClick={() => this.reply(item.id)}
                    >
                      <i className="iconfont icon-huifu reply__item__user--zan" />
                    </span>
                    <span
                      className={`float-right reply__item__icon ${item.is_uped && 'active'}`}
                      onClick={() => this.up(item.id, index)}
                    >
                      <i className="iconfont icon-zan reply__item__user--zan" />
                      <span>{item.ups.length}</span>
                    </span>
                  </div>
                  <div
                    className="reply__item__content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  {
                    replyMap[item.id] && (
                      <Reply
                        replyId={item.id}
                        placeholder={`@${item.author.loginname}`}
                        hideCb={this.hideReply}
                      />
                    )
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <Reply />
      </section>
    );
  }
}
