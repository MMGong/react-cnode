import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropsTypes } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
// import Loading from '../../Components/Loading';
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
export default class App extends Component {
  static propTypes = {
    homeStore: MobxPropsTypes.observableObject.isRequired,
  }
  componentDidMount() {
    console.log('======', this.props);
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
          rows={4}
        >
          {
            topicList.map(item => (
              <div key={item.id} className="home__box">
                <div>{item.title}</div>
              </div>
            ))
          }
        </ReactPlaceholder>
      </div>
    );
  }
}

