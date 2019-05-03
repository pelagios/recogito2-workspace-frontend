import axios from 'axios';
import { confirm } from '../confirm';

const deleteFolders = folders => {
  const ids = folders.map(f => f.id);

  if (ids.length > 0) {
    return ids.length === 1 ?
      axios.delete(`/api/folder/${ids[0]}`) : 
      axios.delete(`/api/folder/bulk`, { data: ids });
  } else {
    return new Promise((resolve) => { resolve(); });
  }
}

const deleteDocuments = (documents, view) => {
  const ids = documents.map(d => d.id);

  if (ids.length > 0) {
    return ids.length === 1 ? (
      view === 'MY_DOCUMENTS' ? // Delete or unshare 
        axios.delete(`/api/document/${ids[0]}`) : axios.delete(`/api/shared/document/${ids[0]}`) 
    ) : (
      view === 'MY_DOCUMENTS' ?
        axios.delete('/api/document/bulk', { data: ids }) : axios.delete('/api/shared/document/bulk', { data: ids })
    )
  } else {
    return new Promise((resolve) => { resolve(); });
  }
}

export const deleteSelection = args => {

  const { 
    selection,
    view, 
    onStart, 
    onSuccess, 
    onError, 
    onCancel 
  } = args;

  const message = view === 'MY_DOCUMENTS' ?
    'You are about to permanently delete the selected documents. Are you sure?' :
    'This will remove the selected documents from your shared documents list. Are you sure?';

  const executeDelete = () => {
    const folders = selection.getItems().filter(i => i.type === 'FOLDER');
    const documents = selection.getItems().filter(i => i.type === 'DOCUMENT');

    if (folders.length + documents.length > 0) {
      onStart();

      deleteDocuments(documents, view)
        .then(() => deleteFolders(folders))
        .then(() => {
          onSuccess();
        }).catch((error) => {
          onError(error);
        });
    } else {
      onCancel && onCancel();
    }
  }

  confirm({
    title: 'Delete',
    message: message,
    type: 'WARNING',
    onConfirm: executeDelete,
    onCancel: onCancel
  });

}

/** Only supports single documents at them moment **/
export const duplicateSelection = selection => {
  if (selection.isSingleDocument()) {
    const doc = selection.get(0);
    return axios.post(`/api/duplicate/document/${doc.id}`);
  } else {
    return new Promise((resolve) => { resolve(); });
  }
}