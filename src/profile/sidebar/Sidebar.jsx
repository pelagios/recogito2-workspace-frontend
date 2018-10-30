import React, { Component } from 'react';

import Identity from '../../common/components/Identity.jsx';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <div className="section">
          <Identity account={this.props.account} />
        </div>
      </div>
    );
  }

}