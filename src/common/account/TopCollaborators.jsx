import React, { Component } from 'react';
import axios from 'axios';

import Avatar from './Avatar.jsx';

export default class TopCollaborators extends Component {

  state = {
    collaborators: []
  }

  componentWillReceiveProps() {
    this.fetchCollaborators();
  }

  fetchCollaborators() {
    if (this.props.username)
      axios
        .get(`/api/account/${this.props.username}/collaborators`)
        .then(result => this.setState({ collaborators: result.data }));
  }

  render() {
    return (
      <React.Fragment>
        {this.state.collaborators.length > 0 &&
          <div className={this.props.className ? `collaborator-list ${this.props.className}` : 'collaborator-list'}>
            <h2>{this.props.title}</h2>
            <ul>
              {this.state.collaborators.map(user => 
                <li key={user.username}>
                  <a href={`/${user.username}`} title={user.username}>
                    <Avatar username={user.username} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        }
      </React.Fragment>
    )
  }

}