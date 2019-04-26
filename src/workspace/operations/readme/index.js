import axios from 'axios';

/** API URL for POST or DELETE **/
const getUrl = () => {
  const currentFolderId = document.location.hash.substring(1);
  return currentFolderId ?
    `/api/folder/${currentFolderId}/readme` : '/api/directory/my/readme';
}


export const updateReadme = function(readme, currentPageState) {
  return axios.post(getUrl(), { data: readme }).then(() => { 
    return { ...currentPageState, ...{ readme: readme } };
  });
}

export const deleteReadme = function(currentPageState) {
  return axios.delete(getUrl()).then(() => {
    return { ...currentPageState, ...{ readme: null } };
  }); 
}