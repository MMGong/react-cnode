/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:04:10
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-08-27 15:16:40
 * @Desc: 文章详情
 */
/* eslint-disable react/no-danger  */
import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import dateFormat from 'date-fns/format';
import { Link } from 'react-router-dom';
import { themeMap } from '../../Config';
import Reply from './reply';
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
  componentDidUpdate(preProps) {
    if (preProps.detailStore.topicDetail.content) {
      window.hljs.initHighlighting();
    }
  }
  componentWillUnmount() {
    this.props.detailStore.clearTopicDetail();
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
            <div className="detail__author__info--status">
              <span className="middle-dot">发布于 {dateFormat(topicDetail.create_at, 'YYYY-MM-DD HH:mm')}</span>
              <span className="middle-dot">阅读 {topicDetail.visit_count}</span>
              <span className="middle-dot">来自 {themeMap[topicDetail.tab].desc}</span>
            </div>
          </div>
        </div>
        <h1 className="detail__title">{topicDetail.title}</h1>
        <div className="detail__content">
          <div className="markdown-text" dangerouslySetInnerHTML={{ __html: topicDetail.content }} />
        </div>
        <Reply
          list={topicDetail.replies}
        />
      </section>
    );
  }
}
