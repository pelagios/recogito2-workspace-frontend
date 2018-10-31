import axios from 'axios';

const fetchDocuments = (path, config) => {
  return axios.post(`/my/api/${path}`, config);
};

export default class API {

  static accountData() {
    return axios.get('/my/api/account');
  }

  static myDocuments(config) {
    return fetchDocuments('my-documents', config);
  }

  static sharedWithMe(config) {
    return fetchDocuments('shared-with-me', config);
  }

  // Deletes one document via the API
  static deleteDocument(id) {
    return axios.delete(`/document/${id}`);
  }

  // Deletes multiple documents in one go via the bulk API
  static bulkDeleteDocuments(ids) {
    return axios.delete('/document/bulk', { data: ids });
  }

}