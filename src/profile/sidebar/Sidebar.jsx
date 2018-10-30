import React, { Component } from 'react';

import Identity from '../../common/content/Identity.jsx';

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