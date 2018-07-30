import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Infinite from 'react-infinite';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
// import TopicList from './topicList';
import TopicInfo from './topicInfo';
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
  constructor(props) {
    super(props);
    this.state = {};
    this.page = 1;
    this.limit = 20;
  }
  componentDidMount() {
    this.getTopicList();
  }
  getTopicList = (page) => {
    console.log('0=-0=0=0=', page);
    this.props.homeStore.getTopicList({
      page: this.page,
      tab: '',
      limit: this.limit,
    });
    this.page += 1;
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
          rows={5}
        >
          <Infinite
            elementHeight={108}
            useWindowAsScrollContainer
            infiniteLoadBeginEdgeOffset={200}
            onInfiniteLoad={this.getTopicList}
          >
            {
              topicList.map(item => (
                <TopicInfo
                  key={item.id}
                  topicInfo={item}
                />
              ))
            }
          </Infinite>
        </ReactPlaceholder>
      </div>
    );
  }
}

