/*
 * @Author: gonghao
 * @Date: 2018-07-30 23:04:10
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-07-30 23:51:11
 * @Desc: 文章详情
 */
import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

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
    return (
      <section className="detail">
        <div className="detail__author">
          <div className="detail__author__avatar" />
          <div>
            <div>{topicDetail.author ? topicDetail.author.loginname : ''}</div>
            <div>
              <span>发布于：</span>
              <span>阅读 231</span>
              <span>最后一次编辑</span>
              <span>来自 分享</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
