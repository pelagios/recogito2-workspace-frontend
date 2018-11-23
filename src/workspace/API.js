import axios from 'axios';

const fetchDocuments = (path, config) => {
  return axios.post(`/api/directory/${path}`, config);
};

export default class API {

  static accountData() {
    return axios.get('/api/account/my');
  }

  static myDocuments(config, opt_folder) {
    return opt_folder ?
      fetchDocuments(`my/${opt_folder}`, config) : fetchDocuments('my', config);
  }

  static sharedWithMe(config) {
    return fetchDocuments('my/shared', config);
  }

  static createFolder(title, parentId) {
    return axios.post('/api/folder', {
      title: title,
      parent: parentId
    });
  }

  // Deletes one document via the API
  static deleteDocument(id) {
    return axios.delete(`/api/document/${id}`);
  }

  // Deletes multiple documents in one go via the bulk API
  static bulkDeleteDocuments(ids) {
    return axios.delete('/api/document/bulk', { data: ids });
  }

  static unshareDocument(id) {
    return axios.delete(`/api/shared/document/${id}`);
  }

  static bulkUnshareDocuments(ids) {
    return axios.delete('/api/shared/document/bulk', { data: ids });
  }

}