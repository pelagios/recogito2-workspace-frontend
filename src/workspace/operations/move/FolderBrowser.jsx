import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

// Just a hack
const FOLDERS = [
  { id: 'root', title: 'Root folder', hasSubfolders: true },
  { id: 'level1-1', parent: 'root', title: 'Folder A', hasSubfolders: true },
  { id: 'level1-2', parent: 'root', title: 'Folder B', hasSubfolders: false },
  { id: 'level2-1', parent: 'level1-1', title: 'Folder C', hasSubfolders: false }
];

export default class FolderBrowser extends Component {
  
  state = {
    currentFolder:  FOLDERS[0],
    subfolders: [
      FOLDERS[1], 
      FOLDERS[2]
    ],
    selected: null
  }

  select = id => this.setState({ selected: id });

  goToFolder = id => {
    const currentFolder = FOLDERS.find(f => f.id === id);
    const subfolders = FOLDERS.filter(f => f.parent === id);
    this.setState({ currentFolder, subfolders });
  }

  navigateUp = () => {
    // TODO just a hack
    if (this.state.currentFolder.parent)    
      this.goToFolder(this.state.currentFolder.parent);
  }

  navigateInto = folderId => {
    this.goToFolder(folderId);
  }

  render() {
    const folders = this.state.subfolders.map(f => 
      <li 
        key={f.id}
        className={this.state.selected === f.id ? 'selected' : undefined}
        onClick={() => this.select(f.id)}>{f.title}
        { f.hasSubfolders && <button className="nostyle icon" onClick={() => this.navigateInto(f.id)}>&#xe684;</button> }
      </li>
    );

    return (
      <div className="clicktrap">
        <div className="modal-wrapper">
          <Draggable handle=".header">
            <div className="modal folder-browser">
              <div className="header">
                <button
                  className="nostyle icon"
                  onClick={this.navigateUp}>&#xe686;</button>

                <span className="title">{this.state.currentFolder.title}</span>

                <button
                  className="nostyle icon cancel"
                  onClick={this.props.onCancel}>&#xe680;</button>
              </div>

              <div className="body">
                <ReactCSSTransitionReplace
                  transitionName="wipe"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}>
                  <ul key={this.state.currentFolder.id}>{folders}</ul>
                </ReactCSSTransitionReplace>
              </div>

              <div className="footer">
                <button 
                  className="btn"
                  disabled={this.state.selected === null}>Move here</button>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }

}