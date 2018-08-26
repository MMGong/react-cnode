/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import zhLocale from 'date-fns/locale/zh_cn';


export default class Reply extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  state = {}
  render() {
    const list = this.props.list;
    return (
      <section className="reply">
        <ul className="reply__list">
          {
            list.map((item, index) => (
              <li className="flex reply__item" key={item.id}>
                <a href="" className="reply__item__left">
                  <div
                    className="reply__item--avatar"
                    style={{ backgroundImage: `url(${item.author.avatar_url})` }}
                  />
                </a>
                <div className="reply__item__right flex-1">
                  <div className="reply__item__user">
                    <span>
                      <span className="reply__item__user--item middle-dot">{item.author.loginname}</span>
                      <span className="reply__item__user--item middle-dot">{index + 1}楼</span>
                      <span className="reply__item__user--item middle-dot">{distanceInWordsToNow(new Date(item.create_at), { locale: zhLocale })}前</span>
                    </span>
                    <span className="float-right reply__item__icon">
                      <i className="iconfont icon-zan reply__item__user--zan" />
                      <span>{item.ups.length}</span>
                    </span>
                  </div>
                  <div
                    className="reply__item__content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}
