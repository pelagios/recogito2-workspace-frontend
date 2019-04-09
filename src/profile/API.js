import axios from 'axios';

export default class API {

  static fetchLoginStatus() {
    return axios.get('/api/me');
  }

  static fetchPublicAccountInfo(username) {
    return axios.get(`/api/account/${username}`);
  }

  static fetchAccessibleDocuments(owner, config, opt_folderId) {
    if (opt_folderId) // Avoid sending an empty string
      return axios.post(`/api/directory/${owner}/${opt_folderId}`, config);
    else 
      return axios.post(`/api/directory/${owner}`, config);
  }

}