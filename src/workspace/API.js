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

  // ~~~ Folder actions ~~~
  static createFolder(title, parentId) {
    return axios.post('/api/folder', {
      title: title,
      parent: parentId
    });
  }

  static renameFolder(id, title) {
    return axios.put(`/api/folder/${id}?title=${title}`);
  }

  static deleteFolder(id) {
    return axios.delete(`/api/folder/${id}`);
  }

  // ~~~ Document actions ~~~
  static bulkDeleteFolders(ids) {
    return axios.delete(`/api/folder/bulk`, { data: ids });
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

  // ~~~ Readme actions ~~~
  static updateReadme(content, opt_folder_id) {
    if (opt_folder_id)
      return axios.post(`/api/folder/${opt_folder_id}/readme`, { data: content });
    else
      return axios.post('/api/directory/my/readme', { data: content });
  }

  static deleteReadme(opt_folder_id) {
    if (opt_folder_id)
      return axios.delete(`/api/folder/${opt_folder_id}/readme`);
    else
      return axios.delete('/api/directory/my/readme');
  }

}