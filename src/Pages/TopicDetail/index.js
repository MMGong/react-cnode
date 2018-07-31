/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:04:10
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-07-31 14:17:35
 * @Desc: 文章详情
 */
/* eslint-diable react/no-danger  */
import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import dateFormat from 'date-fns/format';
import { themeMap } from '../../Config';
import './index.less';

@inject('detailStore')
@observer
export default class TopicDetail extends Component {
  static propTypes = {
    detailStore: PropTypes.observableObject.isRequired,
  }
  state = {}
  static getDerivedStateFromProps(nextProps) {
    return {
      id: nextProps.match.params.id,
    };
  }
  componentDidMount() {
    this.props.detailStore.getTopicDetail(this.state.id);
  }
  render() {
    const topicDetail = this.props.detailStore.topicDetail;
    if (Object.keys(topicDetail).length === 0) return null;
    return (
      <section className="detail">
        <div className="detail__author flex">
          <div
            className="detail__author__avatar"
            style={{ backgroundImage: topicDetail.author ? `url(${topicDetail.author.avatar_url})` : '' }}
          />
          <div className="detail__author__info flex-1 flex flex-v flex-h-between">
            <div className="detail__author__info--name ellipsis">
              {topicDetail.author ? topicDetail.author.loginname : ''}
            </div>
            <div className="detail__author__info--status">
              <span className="middle-dot">发布于 {dateFormat(topicDetail.create_at, 'YYYY-MM-DD HH:mm')}</span>
              <span className="middle-dot">阅读 {topicDetail.visit_count}</span>
              <span className="middle-dot">来自 {themeMap[topicDetail.tab].desc}</span>
            </div>
          </div>
        </div>
        <h1 className="detail__title">{topicDetail.title}</h1>
        <div>
          <div dangerouslySetInnerHTML={{ __html: topicDetail.content }} />
        </div>
      </section>
    );
  }
}
