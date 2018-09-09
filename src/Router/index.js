import React, { PureComponent } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import history from './history';
import Loading from '../Components/Loading';

const asyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */'../Pages/Home'),
  loading: Loading,
});
const asyncTopicDetail = Loadable({
  loader: () => import(/* webpackChunkName: "topicDetail" */'../Pages/TopicDetail'),
  loading: Loading,
});
const asyncUser = Loadable({
  loader: () => import(/* webpackChunkName: "user" */'../Pages/User'),
  loading: Loading,
});
const asyncLogin = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../Pages/Login'),
  loading: Loading,
});
const asyncWrite = Loadable({
  loader: () => import(/* webpackChunkName: "write" */'../Pages/Write'),
  loading: Loading,
});

export default class RouterWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/theme" />} />
          <Route path="/theme" exact component={asyncHome} />
          <Route path="/theme/:id" exact component={asyncHome} />
          <Route path="/topic/:id" exact component={asyncTopicDetail} />
          <Route path="/user/:loginname" exact component={asyncUser} />
          <Route path="/login" exact component={asyncLogin} />
          <Route path="/write" exact component={asyncWrite} />
          <Redirect to="/theme" />
        </Switch>
      </Router>
    );
  }
}

