import axios from 'axios';

export default class API {

  static fetchLoginStatus() {
    return axios.get('/api/me');
  }

  static fetchPublicAccountInfo(username) {
    return axios.get(`/api/account/${username}`);
  }

  static fetchAccessibleDocuments(owner) {
    return axios.get(`/api/documents/accessible/${owner}`);
  }

  static fetchCollaborators(username) {
    return axios.get(`/api/account/${username}/collaborators`);
  }

}