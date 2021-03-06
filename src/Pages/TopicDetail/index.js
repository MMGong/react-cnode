/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:04:10
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-09-08 23:27:11
 * @Desc: 文章详情
 */

/* eslint-disable react/no-danger  */

import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import dateFormat from 'date-fns/format/index';
import { Link } from 'react-router-dom';
import { themeMap } from '../../Config';
import ReplyList from './replyList';
import './index.less';


@inject('detailStore')
@observer
export default class TopicDetail extends Component {
  static propTypes = {
    detailStore: MobxPropTypes.observableObject.isRequired,
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      id: nextProps.match.params.id,
    };
  }
  state = {}
  componentDidMount() {
    this.props.detailStore.getTopicDetail(this.state.id);
  }
  componentDidUpdate(preProps) {
    if (preProps.detailStore.topicDetail.content) {
      window.hljs.initHighlighting();
    }
  }
  componentWillUnmount() {
    this.props.detailStore.clearTopicDetail();
  }
  collect = (isCollect) => {
    this.props.detailStore.collectTopic(!isCollect);
  }
  render() {
    const topicDetail = this.props.detailStore.topicDetail;
    if (Object.keys(topicDetail).length === 0) return null;
    return (
      <section className="detail">
        <div className="detail__author flex">
          <Link to={`/user/${topicDetail.author ? topicDetail.author.loginname : ''}`}>
            <div
              className="detail__author__avatar"
              style={{ backgroundImage: topicDetail.author ? `url(${topicDetail.author.avatar_url})` : '' }}
            />
          </Link>
          <div className="detail__author__info flex-1 flex flex-v flex-h-between">
            <Link
              to={`/user/${topicDetail.author ? topicDetail.author.loginname : ''}`}
              className="detail__author__info--name ellipsis"
            >
              {topicDetail.author ? topicDetail.author.loginname : ''}
            </Link>
            <div className="detail__author__info--status clearfix">
              <span className="middle-dot">发布于 {dateFormat(topicDetail.create_at, 'YYYY-MM-DD HH:mm')}</span>
              <span className="middle-dot">阅读 {topicDetail.visit_count}</span>
              <span className="middle-dot">来自 {themeMap[topicDetail.tab].desc}</span>
              <div className="detail__collect float-right" onClick={() => this.collect(topicDetail.is_collect)}>
                {topicDetail.is_collect ? '取消收藏' : '收藏'}
              </div>
            </div>
          </div>
        </div>
        <h1 className="detail__title">{topicDetail.title}</h1>
        <div className="detail__content">
          <div className="markdown-text" dangerouslySetInnerHTML={{ __html: topicDetail.content }} />
        </div>
        <ReplyList
          list={topicDetail.replies}
        />
      </section>
    );
  }
}
