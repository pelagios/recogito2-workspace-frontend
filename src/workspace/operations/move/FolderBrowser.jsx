import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class FolderBrowser extends Component {
  
  state = {
    currentFolder: 'Lorem ipsum',
    subfolders: [
      { title: 'Folder A' },
      { title: 'Folder B'}
    ],
    selected: null
  }

  navigateUp = () => {

  }

  render() {
    return (
      <div className="clicktrap">
        <div className="modal-wrapper">
          <Draggable handle=".header">
            <div className="modal folder-browser">
              <div className="header">
                <button
                  className="nostyle icon"
                  onClick={this.navigateUp}>&#xe686;</button>

                <button
                  className="nostyle icon cancel"
                  onClick={this.props.onCancel}>&#xe680;</button>
              </div>

              <div className="body">

              </div>

              <div className="footer">
                <button className="btn">Move</button>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }

}