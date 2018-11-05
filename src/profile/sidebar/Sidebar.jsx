import React, { Component } from 'react';

import API from '../API.js';
import Avatar from '../../common/content/Avatar.jsx';
import Identity from '../../common/content/Identity.jsx';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collaborators: []
    }
  }

  componentWillReceiveProps(props) {
    if (props.account && props.account.username)
      API
        .fetchCollaborators(props.account.username)
        .then(result => this.setState({ collaborators: result.data }));
  }

  render() {
    return (
      <div className="sidebar">
        <div className="section">
          <Identity account={this.props.account} />
        </div>

        {/* <div className="section compact">
          <div className="edit-stats">
            <p className="count">4,218</p>
            <p className="label">Edits</p>
          </div>
        </div> */}

        <div className="section compact">
          <div className="collaborators">
            <h2>Top collaborators</h2>
            <ul>
              {this.state.collaborators.map(user => 
                <li>
                  <a href={`/${user.username}`} title={user.username}><Avatar username={user.username} /></a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}