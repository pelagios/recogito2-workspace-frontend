import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../API.js';
import Prompt from '../../common/components/Prompt.jsx';

export default class DeleteAction extends Component {

  executeDelete() {
    const ids = this.props.selection.map(r => r.id);

    if (ids.length > 0) {
      this.props.onStart();

      if (ids.length === 1) {
        API.deleteDocument(ids[0])
           .then(() => {
             this.props.onSuccess();
           })
           .catch((error) => {
             this.props.onError(error);
           });
      } else {
        API.bulkDeleteDocuments(ids)
          .then(() => {
            this.props.onSuccess();
          })
          .catch((error) => {
            this.props.onError(error);
          });
      }
    } else {
      this.props.onCancel();
    }
  }

  render() {
    return ReactDOM.createPortal(
      <Prompt 
        title="Delete Document"
        type="WARNING"
        message="You cannot undo this operation. Are you sure you want to do this?" 
        onNo={this.props.onCancel}
        onYes={this.executeDelete.bind(this)} />,

      document.body
    )
  }

}