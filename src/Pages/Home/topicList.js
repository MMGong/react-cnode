import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import TopicInfo from './topicInfo';

export default class TopicList extends Component {
  static propTypes = {
    topicList: PropTypes.arrayOrObservableArrayOf(PropTypes.objectOrObservableObject).isRequired,
  }
  state = {}
  render() {
    const topicList = this.props.topicList;
    return (
      <ul>
        {
          topicList.map(item => (
            <TopicInfo
              key={item.id}
              topicInfo={item}
            />
          ))
        }
      </ul>
    );
  }
}
