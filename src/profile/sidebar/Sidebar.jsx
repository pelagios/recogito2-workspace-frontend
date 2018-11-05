import React, { Component } from 'react';

import Avatar from '../../common/content/Avatar.jsx';
import Identity from '../../common/content/Identity.jsx';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <div className="section">
          <Identity account={this.props.account} />
        </div>

        <div className="section compact">
          <div className="edit-stats">
            <p className="count">4,218</p>
            <p className="label">Edits</p>
          </div>
        </div>

        <div className="section compact">
          <div className="collaborators">
            <ul>
              <li><Avatar username="rainer" /></li>
              <li><Avatar username="rainersimon"/></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}