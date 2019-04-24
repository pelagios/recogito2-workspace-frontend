import React, { Component } from 'react';

import Menu from '../../../common/Menu';

export default class NewContent extends Component {

  state = { 
    menuVisible: false,
    createNewForm: null // Popup form for specifying data source details
  };

  onShowOptions() {
    this.setState({ menuVisible: true });
  }

  onSelectOption(option) {
    this.setState({ menuVisible: false });
  
    if (option === 'CREATE_FOLDER')
      this.props.onCreateFolder();
    else if (option === 'UPLOAD_FILES')
      this.props.onUploadFiles();
    else if (option === 'IMPORT_IIIF')
      this.props.onImportSource('IIIF');

    /*
    if (option === 'FOLDER') {
      this.setState({
        createNewForm: 
          <CreateFolderForm 
            onSubmit={this.handleFormSubmit}
            onCancel={this.handleFormCancel} />
      });
    } else if (option === 'FILE') {
      this._input.click();
    } else if (option === 'IIIF') {
      this.setState({
        createNewForm:
          <IIIFSourceForm 
            onSubmit={this.handleFormSubmit} 
            onCancel={this.handleFormCancel} /> 
      });
    }
    */
  }

  /*
  handleFormSubmit = (value) => {
    if (value.type === 'IIIF_SOURCE') {
      this.props.onCreateFromSource && this.props.onCreateFromSource(value);
    } else if (value.type === 'NEW_FOLDER') {
      const currentFolderId = document.location.hash.substring(1);
      API.createFolder(value.name || 'Unnamed Folder', currentFolderId)
         .then(() => this.props.onFolderCreated());
    }

    this.setState({ createNewForm: null });
  }

  handleFormCancel = () => {
    this.setState({ createNewForm: null });
  }

  onUploadFiles(evt) {
    const files = Array.from(evt.target.files);
    this.props.onUploadFiles(files);
  }

  onCancel() {
    this.setState({ menuVisible: false });
  }
  */

  render() {
    return (
      <div className="section create-new">
        <button
          className="btn create-new"
          onClick={this.onShowOptions.bind(this)}>
          <span className="icon">&#xf067;</span>
          <span className="label">New</span>
        </button>
        <input
          ref={c => this._input = c}
          type="file"
          name="file"
          multiple
          onChange={this.onUploadFiles.bind(this)}
          style={{ display: 'none' }} />

        {this.state.menuVisible &&
          <Menu className="create-new">
            <Menu.Group name="local">
              <Menu.Option icon={'\uf07b'} label="Folder" />
              <Menu.Option icon={'\uf15b'} label="File upload" />
            </Menu.Group>

            <Menu.Group>
              <Menu.Option icon={'\uf0c1'} label="From IIIF manifest" />
              <Menu.Option icon={'\uf121'} label="From CTS service" disabled/>
            </Menu.Group>
          </Menu>
        }

        {this.state.createNewForm}
      </div>
    )
  }

}
