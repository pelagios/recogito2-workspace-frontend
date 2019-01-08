import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BasePopupForm from './BasePopupForm.jsx';

export default class CreateFolderForm extends Component {

  state = { folderName: null }
  
  handleChange = (evt) => {
    this.setState({ folderName: evt.target.value });
  }

  handleOk = () => {
    /*
    this.props.onSubmit && this.props.onSubmit({
      source: 'NEW_FOLDER',
      url: this.state.folderName
    });    
    */
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
          onChange={this.handleChange} />
      </BasePopupForm>

    return ReactDOM.createPortal(popup, document.body);
  }

}