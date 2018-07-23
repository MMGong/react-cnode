import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropsTypes } from 'mobx-react';
import logo from '../../logo.svg';
import apis from '../../Api';
import './index.css';

apis('getTopics').then((data) => {
  console.log(data);
});
apis('getTopicDetail', {}, {
  pathExtra: '/5433d5e4e737cbe96dcef312',
}).then((data) => {
  console.log(data);
});

@inject(stores => ({
  demoStore: stores.demoStore,
}))
@observer
export default class App extends Component {
  static propTypes = {
    demoStore: MobxPropsTypes.observableObject.isRequired,
  }
  changeDemoCount = () => {
    this.props.demoStore.setDemoCount(2);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p onClick={this.changeDemoCount}>{this.props.demoStore.demoCount}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

