import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import LimitedInfiniteScroll from 'react-limited-infinite-scroll';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import TopicInfo from './topicInfo';
import Nav from './nav';
import './index.less';

@inject(stores => ({
  homeStore: stores.homeStore,
}))
@observer
export default class Home extends Component {
  static propTypes = {
    homeStore: PropTypes.observableObject.isRequired,
    match: PropTypes.objectOrObservableObject.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.page = 1;
    this.tab = this.props.match.params.id;
    this.limit = 20;
  }
  componentDidMount() {
    this.getTopicList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.homeStore.clearTopicList();
      this.page = 1;
      this.tab = this.props.match.params.id;
      this.getTopicList(true);
    }
  }
  componentWillUnmount() {
    this.props.homeStore.clearTopicList();
  }
  getTopicList = (isReset = false) => {
    this.props.homeStore.getTopicList({
      page: this.page,
      tab: this.tab,
      limit: this.limit,
    }, isReset);
    this.page += 1;
  }
  render() {
    const topicList = this.props.homeStore.topicList;
    return (
      <div className="home">
        <Nav />
        <div className="home__container">
          <ReactPlaceholder
            showLoadingAnimation
            type="media"
            ready={topicList.length > 0}
            color="#fbfbfb"
            rows={4}
          >
            <LimitedInfiniteScroll
              loadNext={() => this.getTopicList()}
              pageStart={1}
              limit={15}
              hasMore={(this.page - 1) * this.limit === topicList.length}
            >
              {
                topicList.map(item => (
                  <TopicInfo
                    key={item.id}
                    topicInfo={item}
                  />
                ))
              }
            </LimitedInfiniteScroll>
          </ReactPlaceholder>
        </div>
      </div>
    );
  }
}

