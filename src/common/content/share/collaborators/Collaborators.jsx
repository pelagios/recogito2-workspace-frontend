import React, { Component } from 'react';
import { openSelector } from './PermissionSelector.js';
import Autocomplete from './Autocomplete.jsx';

export default class Collaborators extends Component {

  state = {
    collaborators: [
      { username: 'rainer', access_level: 'WRITE' },
      { username: 'elton', access_level: 'READ'}
    ],
  }
  
  openPermissionsSelector = (evt, collaborator) => {
    const button = evt.target.nodeName === 'BUTTON' ? evt.target : evt.target.parentNode;
    openSelector({
      parent: button.parentNode,
      accessLevel: collaborator.access_level,
      onChangeLevel: level => this.setState(prev => {
        return {
          collaborators: prev.collaborators.map(c => {
            return (c.username === collaborator.username) ?
              { username: c.username, access_level: level } : c;
          })
        }
      })
    });
  }

  removeCollaborator = (collaborator) => {
    this.setState(prev => {
      return { collaborators: prev.collaborators.filter(c => c.username !== collaborator.username) }
    });
  }

  addCollaborator = (username) => {
    this.setState(prev => {
      return { 
        collaborators:  [ ...prev.collaborators, { username: username, access_level: 'READ'} ]
      }
    });
  }

  render() {
    const collaborators = this.state.collaborators.map(c => 
      <tr key={c.username}>
        <td>{c.username}</td>
        <td>
          <button
            className="btn small permissions"
            onClick={(evt) => this.openPermissionsSelector(evt, c)}>
            <span className="label">{c.access_level}</span>
            <span className="icon">{'\uf0dd'}</span>
          </button>
        </td>
        <td className="col-actions remove-collaborator">
          <button 
            className="nostyle outline-icon"
            onClick={() => this.removeCollaborator(c)}>{'\ue897'}</button>
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
        </div>
        <div className="multi-share-section add-collaborator">
          <Autocomplete 
            exclude={this.state.collaborators.map(c => c.username)} 
            onSelect={this.addCollaborator} />
        </div>
      </div>
    )
  }

}
