import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import zhLocale from 'date-fns/locale/zh_cn';
import LazyLoad from 'react-lazyload';
import defaultAvatar from '../../Assets/images/default.jpg';

export default class TopicInfo extends Component {
  static propTypes = {
    topicInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }
  state = {}
  getPlaceHolder = () => <img src={defaultAvatar} alt="" />
  render() {
    const topicInfo = this.props.topicInfo;
    const distanceDate = distanceInWordsToNow(new Date(topicInfo.create_at), { locale: zhLocale });
    return (
      <li className="home__box flex">
        <div className="home__box__left flex-1">
          <div className="home__box__meta">
            {
              topicInfo.top ? (
                <span className="home__box__meta--info home__box__meta--top">置顶</span>
              ) : null
            }
            {
              topicInfo.good ? (
                <span className="home__box__meta--info home__box__meta--top">精华</span>
              ) : null
            }
            <span className="home__box__meta--info">{topicInfo.author.loginname}</span>
            <span className="home__box__meta--info">{dateFormat(topicInfo.create_at, 'YYYY-MM-DD HH:mm')}</span>
            <span className="home__box__meta--info">{distanceDate}前</span>
          </div>
          <a href="javascript:void(0);" className="home__box--title">{topicInfo.title}</a>
          <div className="home__box__action">
            <span className="home__box__action--box">
              访问数: {topicInfo.visit_count}
            </span>
            <span className="home__box__action--box">
              评论数: {topicInfo.reply_count}
            </span>
          </div>
        </div>
        <div
          className="home__box__right"
        >
          <LazyLoad
            height="5rem"
            placeholder={this.getPlaceHolder()}
          >
            <img
              src={topicInfo.author.avatar_url}
              alt=""
            />
          </LazyLoad>
        </div>
      </li>
    );
  }
}
