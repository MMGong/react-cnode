import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import TopicList from './topicList';
import './index.less';

// apis('getTopics').then((data) => {
//   console.log(data);
// });
// apis('getTopicDetail', {}, {
//   pathExtra: '/5433d5e4e737cbe96dcef312',
// }).then((data) => {
//   console.log(data);
// });

@inject(stores => ({
  homeStore: stores.homeStore,
}))
@observer
export default class Home extends Component {
  static propTypes = {
    homeStore: PropTypes.observableObject.isRequired,
  }
  componentDidMount() {
    console.log('===');
    this.props.homeStore.getTopicList();
  }
  render() {
    const topicList = this.props.homeStore.topicList;
    return (
      <div className="home">
        <ReactPlaceholder
          showLoadingAnimation
          type="media"
          ready={topicList.length > 0}
          color="#fbfbfb"
          rows={4}
        >
          <TopicList
            topicList={topicList}
          />
        </ReactPlaceholder>
      </div>
    );
  }
}

