import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

export default class Loading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }
  state = {}
  render() {
    const {
      isLoading,
    } = this.props;
    return isLoading ? (
      <section className="wh-all-fixed">
        <div className="progress-ring-root">
          <div>
            <div className="react-uwp-progress-ring_6_5000-item-0 progress-ring-item" />
            <div className="react-uwp-progress-ring_6_5000-item-1 progress-ring-item" />
            <div className="react-uwp-progress-ring_6_5000-item-2 progress-ring-item" />
            <div className="react-uwp-progress-ring_6_5000-item-3 progress-ring-item" />
            <div className="react-uwp-progress-ring_6_5000-item-4 progress-ring-item" />
            <div className="react-uwp-progress-ring_6_5000-item-5 progress-ring-item" />
          </div>
        </div>
      </section>
    ) : null;
  }
}
