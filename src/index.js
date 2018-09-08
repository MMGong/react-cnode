/*
 * @Author: gonghao
 * @Date: 2018-07-22 20:34:45
 * @Last Modified by: gonghao
 * @Last Modified time: 2018-09-08 19:11:43
 * @Desc:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import RouterWrapper from './Router';
// import * as serviceWorker from './serviceWorker';
import store from './Store';
import './Assets/css/common.less';


ReactDOM.render(
  <Provider {...store}>
    <RouterWrapper />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
