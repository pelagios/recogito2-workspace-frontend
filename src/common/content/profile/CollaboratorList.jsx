import React, { Component } from 'react';
import axios from 'axios';

import Avatar from './Avatar.jsx';

export default class CollaboratorList extends Component {

  constructor(props) {
    super(props);
    this.state = { collaborators: [] };
    this.fetchCollaborators(props);
  }

  componentWillReceiveProps(props) {
    this.fetchCollaborators(props);
  }

  fetchCollaborators(props) {
    if (props.username)
      axios
        .get(`/api/account/${props.username}/collaborators`)
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