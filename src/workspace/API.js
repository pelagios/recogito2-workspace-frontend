import axios from 'axios';

const fetchDocuments = (path, config) => {
  return axios.post(`/api/documents/${path}`, config);
};

export default class API {

  static accountData() {
    return axios.get('/api/account/my');
  }

  static myDocuments(config) {
    return fetchDocuments('my', config);
  }

  static sharedWithMe(config) {
    return fetchDocuments('shared', config);
  }

  // Deletes one document via the API
  static deleteDocument(id) {
    return axios.delete(`/document/${id}`);
  }

  // Deletes multiple documents in one go via the bulk API
  static bulkDeleteDocuments(ids) {
    return axios.delete('/document/bulk', { data: ids });
  }

  static unshareDocument(id) {
    return axios.delete(`/api/documents/shared/${id}`);
  }

  static bulkUnshareDocuments(ids) {
    return axios.delete('/api/documents/shared/bulk', { data: ids });
  }

}