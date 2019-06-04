import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class FolderBrowser extends Component {
  
  state = {
    currentFolder: 'Lorem ipsum',
    subfolders: [
      { id: 'foo', title: 'Folder A', hasSubfolders: true },
      { id: 'bar', title: 'Folder B', hasSubfolders: false }
    ],
    selected: null
  }

  select = id => this.setState({ selected: id });

  navigateUp = () => {

  }

  render() {
    const folders = this.state.subfolders.map(f => 
      <li 
        className={this.state.selected === f.id && 'selected'}
        onClick={() => this.select(f.id)}>{f.title}
        { f.hasSubfolders && <button className="nostyle icon">&#xe684;</button> }
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

                <button
                  className="nostyle icon cancel"
                  onClick={this.props.onCancel}>&#xe680;</button>
              </div>

              <div className="body">
                <ul>{folders}</ul>
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