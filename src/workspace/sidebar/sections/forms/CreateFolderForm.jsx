import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BasePopupForm from './BasePopupForm.jsx';

export default class CreateFolderForm extends Component {

  state = { folderName: null }
  
  handleChange = (evt) => {
    this.setState({ folderName: evt.target.value });
  }

  handleOk = () => {
    this.props.onSubmit && this.props.onSubmit({
      type: 'NEW_FOLDER',
      name: this.state.folderName
    });    
  }

  handleKeyPress = (evt) => {
    if (evt.which === 13) // Enter
      this.handleOk();
  }

  render() {
    const popup =
      <BasePopupForm
        onOk={this.handleOk}
        onCancel={this.props.onCancel}>
        <input 
          type="text" 
          autoFocus={true}
          placeholder="Folder name"
          value={this.state.folderName || ''}
          onChange={this.handleChange} 
          onKeyPress={this.handleKeyPress} />
      </BasePopupForm>

    return ReactDOM.createPortal(popup, document.body);
  }

}