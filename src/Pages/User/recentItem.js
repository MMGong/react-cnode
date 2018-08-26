import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import zhLocale from 'date-fns/locale/zh_cn';
import { Link } from 'react-router-dom';

export default class RecentItem extends Component {
  static propTypes = {
    info: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }
  state = {}
  render() {
    const {
      info,
    } = this.props;
    const distanceDate = distanceInWordsToNow(new Date(info.last_reply_at), { locale: zhLocale });
    return (
      <li className="flex recent flex flex-v-c">
        <div className="recent__avatar flex flex-v-c">
          <div
            className="recent__avatar--img"
            style={{ backgroundImage: `url(${info.author.avatar_url})` }}
            title={info.author.loginname}
          />
        </div>
        <div className="flex-1 flex flex-v-c recent__title">
          <Link to={`/topic/${info.id}`} >{info.title}</Link>
        </div>
        <div className="recent__time">{distanceDate}前</div>
      </li>
    );
  }
}
