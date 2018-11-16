import axios from 'axios';

export default class API {

  static fetchLoginStatus() {
    return axios.get('/api/me');
  }

  static fetchPublicAccountInfo(username) {
    return axios.get(`/api/account/${username}`);
  }

  static fetchAccessibleDocuments(owner, config) {
    return axios.post(`/api/directory/${owner}`, config);
  }

}