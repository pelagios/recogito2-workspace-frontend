import React, { Component } from 'react';
import Menu from '../../../common/Menu';

export default class NewContent extends Component {

  state = { 
    menuVisible: false,

  };

  onOpenMenu = () => {
    this.setState({ menuVisible: true });
  }

  onCloseMenu = () => {
    this.setState({ menuVisible: false });
  }

  onOpenFileExplorer = () => {
    this._input.click(); // Trigger the hidden file input field
  }

  onUploadFiles = evt => {
    const files = Array.from(evt.target.files);
    this.props.onUploadFiles(files);
  }

  /** Helper to execute a function after closing the menu **/
  select = (fn) => {
    return () => {
      this.setState({ menuVisible: false });
      fn();
    }
  } 

  render() {
    return (
      <div className="section create-new">
        <button
          className="btn create-new"
          onClick={this.onOpenMenu}>
          <span className="icon">&#xf067;</span>
          <span className="label">New</span>
        </button>
        
        <input
          ref={c => this._input = c}
          type="file"
          name="file"
          multiple
          onChange={this.onUploadFiles}
          style={{ display: 'none' }} />

        {this.state.menuVisible &&
          <Menu 
            className="create-new"
            onCancel={this.onCloseMenu}>
            
            <Menu.Group>
              <Menu.Item 
                icon={'\uf07b'} 
                label="Folder" 
                onSelect={this.select(this.props.onCreateFolder)} />

              <Menu.Item 
                icon={'\uf15b'} 
                label="File upload" 
                onSelect={this.select(this.onOpenFileExplorer)} />
            </Menu.Group>

            <Menu.Group>
              <Menu.Item 
                icon={'\uf0c1'} 
                label="From IIIF manifest" 
                onSelect={this.select(() => this.props.onImportSource('IIIF'))} />

              <Menu.Item 
                icon={'\uf121'} 
                label="From CTS service" 
                onSelect={this.select(() => this.props.onImportSource('CTS'))} />

              <Menu.Item 
                icon={'\uf0f6'} 
                label="From SHINE repository" 
                onSelect={this.select(() => this.props.onImportSource('SHINE'))} />
            </Menu.Group>
          </Menu>
        }
      </div>
    )
  }

}
