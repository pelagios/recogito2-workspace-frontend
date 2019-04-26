import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import ModalForm from '../ModalForm';

class CreateFolderForm extends Component {

  state = {
    folderName : ''
  }

  onChange = (evt) => {
    this.setState({ folderName: evt.target.value });
  }

  onKeyPress = (evt) => {
    if (evt.which === 13) // Enter
      this.onOk();
  }

  onOk = () => {
    this.props.onOk(this.state.folderName);
  }

  render() {
    return (
      <ModalForm
        onOk={this.onOk}
        onCancel={this.props.onCancel}>
  
        <input 
          type="text" 
          autoFocus={true}
          placeholder="Folder name" 
          value={this.state.folderName}
          onChange={this.onChange} 
          onKeyPress={this.onKeyPress}/>
      </ModalForm>
    )
  }

} 

export const createFolder = () => {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onOk = (folderName) => { 
      const currentFolderId = document.location.hash.substring(1);

      axios.post('/api/folder', {
        title: folderName || 'Unnamed Folder',
        parent: currentFolderId
      }).then(() => {
        container.remove();
        resolve();
      });
    }

    const onCancel = () => {
      container.remove();
      resolve();
    }

    render(
      <CreateFolderForm 
        onOk={onOk}
        onCancel={onCancel} />, container);
  });
};

export const renameFolder = (folder, title) => {
  return axios.put(`/api/folder/${folder.id}?title=${title}`);
}