import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import history from './history';
import Loading from '../Components/Loading';

const asyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */'../Pages/Home'),
  loading: Loading,
});
const asyncTest = Loadable({
  loader: () => import(/* webpackChunkName: "test" */'../Pages/Test'),
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
          <Route path="/" exact component={asyncHome} />
          <Route path="/test" exact component={asyncTest} />
        </Switch>
      </Router>
    );
  }
}
