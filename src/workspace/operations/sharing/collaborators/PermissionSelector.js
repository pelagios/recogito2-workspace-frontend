import React, { Component } from 'react';
import { render} from 'react-dom';

class PermissionSelector extends Component {

  componentDidMount() {
    document.addEventListener('mousedown', this.onMousedown, false);
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMousedown, false);
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onMousedown = (evt) => {
    const isClickOutside = !this._node.contains(evt.target);
    if (isClickOutside) this.props.onCancel();
  }

  onKeydown = (evt) => {
    evt.stopPropagation();
    if (evt.which === 27) this.props.onCancel();
  }

  handleCancel= () => {
    this.props.onCancel();
  }

  changeLevel(level) {
    this.props.onChangeLevel(level);
  }

  render() {
    return (
      <div 
        className="permission-selector"
        ref={n => this._node = n}>

        <h3>Permission Level
          <span className="close outline-icon" onClick={this.handleCancel}>{'\ue897'}</span>
        </h3>
        <ul>
          <li
            className="READ"
            onClick={() => this.changeLevel('READ')}>
            <div className="checked">
              <div className="icon">
                {this.props.accessLevel === 'READ' && '\uf00c' }
              </div>
            </div>
            <h4>Read</h4>
            <p>Collaborators can read document and annotations, but not edit.</p>
          </li>

          <li 
            className="WRITE"
            onClick={() => this.changeLevel('WRITE')}>
            <div className="checked">
              <div className="icon">
                {this.props.accessLevel === 'WRITE' && '\uf00c' }
              </div>
            </div>
            <h4>Write</h4>
            <p>Collaborators can read document and annotations, create new annotations, add and reply to comments.</p>
          </li>

          <li
            className="ADMIN"
            onClick={() => this.changeLevel('ADMIN')}>
            <div className="checked">
              <div className="icon">
                {this.props.accessLevel === 'ADMIN' && '\uf00c' }
              </div>
            </div>
            <h4>Admin</h4>
            <p>Admins can edit document metadata, invite other collaborators, backup and restore, and roll back the edit history.</p>
          </li>
        </ul>
      </div>
    )
  }

}

export function openSelector(config) {
  const parent = config.parent;
  const root = document.createElement('div');
  parent.append(root);

  const onCancel = () => {
    root.remove(); 
  }

  const onChangeLevel = (level) => {
    config.onChangeLevel(level);
    root.remove();
  }

  render(
    <PermissionSelector 
      accessLevel={config.accessLevel}
      onChangeLevel={onChangeLevel}
      onCancel={onCancel} />, 
  root);
}