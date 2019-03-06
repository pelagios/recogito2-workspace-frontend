import React, { Component } from 'react';
import { openSelector } from './PermissionSelector.js';

export default class Collaborators extends Component {

  state = {
    collaborators: [
      { username: 'rainer', access_level: 'WRITE' },
      { username: 'elton', access_level: 'READ'}
    ]
  }

  openPermissionsSelector = (evt) => {
    const button = evt.target.nodeName === 'BUTTON' ? evt.target : evt.target.parentNode;
    openSelector(button.parentNode);
  }

  render() {
    const collaborators = this.state.collaborators.map(c => 
      <tr key={c.username}>
        <td>{c.username}</td>
        <td>
          <button
            className="btn small permissions"
            onClick={this.openPermissionsSelector}>
            <span className="label">{c.access_level}</span>
            <span className="icon">{'\uf0dd'}</span>
          </button>
        </td>
        <td className="col-actions outline-icon remove-collaborator">
          {'\ue897'}
        </td>
      </tr>
    );

    return (
      <div className="collaborators">
        <div className="multi-share-section">
          <h3>Collaborators</h3>
          <table className="collaborators">
            <tbody>
              {collaborators}
            </tbody>
          </table>
          <input type="text" name="collaborator" placeholder="Enter unsername" />
        </div>
      </div>
    )
  }

}
