import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'date-fns/format/index';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now/index';
import zhLocale from 'date-fns/locale/zh_cn/index';
import LazyLoad from 'react-lazyload';
import defaultAvatar from '../../Assets/images/default.jpg';

export default class TopicInfo extends PureComponent {
  static propTypes = {
    topicInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }
  state = {}
  getPlaceHolder = () => <img src={defaultAvatar} alt="" />
  render() {
    const topicInfo = this.props.topicInfo;
    const distanceDate = distanceInWordsToNow(new Date(topicInfo.create_at), { locale: zhLocale });
    return (
      <div className="home__box flex">
        <div className="home__box__left flex-1">
          <div className="home__box__meta">
            {
              topicInfo.top ? (
                <span className="home__box__meta--info home__box__meta--top middle-dot">置顶</span>
              ) : null
            }
            {
              topicInfo.good ? (
                <span className="home__box__meta--info home__box__meta--top middle-dot">精华</span>
              ) : null
            }
            <Link
              to={`/user/${topicInfo.author.loginname}`}
              className="home__box__meta--info middle-dot"
            >
              {topicInfo.author.loginname}
            </Link>
            <span className="home__box__meta--info middle-dot">{dateFormat(topicInfo.create_at, 'YYYY-MM-DD HH:mm')}</span>
            <span className="home__box__meta--info middle-dot">{distanceDate}前</span>
          </div>
          <Link to={`/topic/${topicInfo.id}`} className="home__box--title">{topicInfo.title}</Link>
          <div className="home__box__action">
            <span className="home__box__action--box">
              访问数: {topicInfo.visit_count}
            </span>
            <span className="home__box__action--box">
              评论数: {topicInfo.reply_count}
            </span>
          </div>
        </div>
        <Link
          to={`/user/${topicInfo.author.loginname}`}
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
        </Link>
      </div>
    );
  }
}
