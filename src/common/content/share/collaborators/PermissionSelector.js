import React, { Component } from 'react';
import { render} from 'react-dom';

class PermissionSelector extends Component {

  handleCancel= () => {
    this.props.onCancel();
  }

  render() {
    return (
      <div className="permission-selector">
        <h3>Permission Level
          <span className="close outline-icon" onClick={this.handleCancel}>{'\ue897'}</span>
        </h3>
        <ul>
          <li className="READ">
            <div className="checked">
              <div className="icon" />
            </div>
            <h4>Read</h4>
            <p>Collaborators can read document and annotations, but not edit.</p>
          </li>

          <li className="WRITE">
            <div className="checked">
              <div className="icon" />
            </div>
            <h4>Write</h4>
            <p>Collaborators can read document and annotations, create new annotations, add and reply to comments.</p>
          </li>

          <li className="ADMIN">
            <div className="checked">
              <div className="icon" />
            </div>
            <h4>Admin</h4>
            <p>Admins can edit document metadata, invite other collaborators, backup and restore, and roll back the edit history.</p>
          </li>
        </ul>
      </div>
    )
  }

}

export function openSelector(parentEl) {
  const root = document.createElement('div');
  parentEl.append(root);

  const onCancel = () => {
    root.remove(); 
  }

  render(
    <PermissionSelector 
      onCancel={onCancel} />, 
  root);
}