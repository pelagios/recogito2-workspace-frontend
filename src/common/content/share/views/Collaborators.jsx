import React, { Component } from 'react';

export default class Collaborators extends Component {

  state = {
    collaborators: []
  }

  render() {
    const collaborators = this.state.collaborators.map(c => 
      <tr>
        <td>{c.username}</td>
        <td>{c.accesslevel}</td>
      </tr>
    );

    return (
      <div className="share-settings collaborators">
        <div className="settings-section">
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
