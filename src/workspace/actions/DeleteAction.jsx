import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../API.js';
import Prompt from '../../common/components/Prompt.jsx';

export default class DeleteAction extends Component {

  executeDelete() {
    const ids = this.props.selection.map(r => r.id);

    if (ids.length > 0) {
      this.props.onStart();

      const action =
        ids.length === 1 ? (
          this.props.view === 'MY_DOCUMENTS' ?
            API.deleteDocument(ids[0]) : API.unshareDocument(ids[0]) 
        ) : (
          this.props.view === 'MY_DOCUMENTS' ?
            API.bulkDeleteDocuments(ids) : API.bulkUnshareDocuments(ids)
        )

      action.then(() => {
        this.props.onSuccess();
      }).catch((error) => {
        this.props.onError(error);
      })
    } else {
      this.props.onCancel();
    }
  }

  render() {
    const message = (this.props.view === 'MY_DOCUMENTS') ?
      "You are about to permanently delete the selected documents. Are you sure?" :
      "This will remove the selected documents from your shared documents list. Are you sure?";

    return ReactDOM.createPortal(
      <Prompt 
        title="Delete"
        type="WARNING"
        message={message}
        onNo={this.props.onCancel}
        onYes={this.executeDelete.bind(this)} />,

      document.body
    )
  }

}