import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../API.js';
import Prompt from '../../common/components/Prompt.jsx';

export default class DeleteAction extends Component {

  deleteFolders(folders) {
    const ids = folders.map(f => f.id);
    if (ids.length > 0) {
      return ids.length === 1 ?
        API.deleteFolder(ids[0]) : API.bulkDeleteFolders(ids);
    } else {
      return new Promise((resolve) => { resolve(); });
    }
  }

  deleteDocuments(documents) {
    const ids = documents.map(d => d.id);

    if (ids.length > 0) {
      return ids.length === 1 ? (
        this.props.view === 'MY_DOCUMENTS' ?
          API.deleteDocument(ids[0]) : API.unshareDocument(ids[0]) 
      ) : (
        this.props.view === 'MY_DOCUMENTS' ?
          API.bulkDeleteDocuments(ids) : API.bulkUnshareDocuments(ids)
      )
    } else {
      return new Promise((resolve) => { resolve(); });
    }
  }

  executeDelete() {
    const folders = this.props.selection.filter(i => i.type === 'FOLDER');
    const documents = this.props.selection.filter(i => i.type === 'DOCUMENT');

    if (folders.length + documents.length > 0) {
      this.props.onStart();

      this.deleteDocuments(documents)
          .then(() => this.deleteFolders(folders))
          .then(() => {
            this.props.onSuccess();
          }).catch((error) => {
            this.props.onError(error);
          });
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