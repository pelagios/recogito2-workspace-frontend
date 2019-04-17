import React, { Component } from 'react';

import API from '../../API.js';
import MenuPopup from '../../../common/components/MenuPopup.jsx';
import CreateFolderForm from './forms/CreateFolderForm.jsx';
import IIIFSourceForm from './forms/IIIFSourceForm.jsx';

export default class CreateNew extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      menuVisible: false,
      createNewForm: null // Popup form for specifying data source details
    };
  }

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
          <MenuPopup
            className="create-new"
            menu={[
              { group: 'local', options: [
                { icon: '\uf07b', label: 'Folder', value: 'CREATE_FOLDER' },
                { icon: '\uf15b', label: 'File upload', value: 'UPLOAD_FILES' }
              ]},

              { group: 'remote', options: [
                { icon: '\uf0c1', label: 'From IIIF manifest', value: 'IMPORT_IIIF' },
                { icon: '\uf121', label: 'From CTS service', value: 'IMPORT_CTS', disabled: true }
              ]}
            ]}
            onSelect={this.onSelectOption.bind(this)}
            onCancel={this.onCancel.bind(this)} />
        }

        {this.state.createNewForm}
      </div>
    )
  }

}
