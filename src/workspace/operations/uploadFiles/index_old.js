class Uploader extends Component {


  
}

const startUpload = (files) => {
  this.setState({ 
    fileUploads: files, 
    urlUpload: null
  });
}

/** Remote file registration (IIIF, CTS) **
startRegisterRemoteSource(url) {
  this.setState({ 
    fileUploads: [],
    urlUpload: url
  });
} 

onUploadComplete() {
  this.setState({ 
    view: 'MY_DOCUMENTS', // Force view back to 'My Documents'
    fileUploads: [], 
    urlUpload: null 
  }, () => {
    this.refreshCurrentView()
      .then(this.fetchAccountData.bind(this));
  });
}

const uploadFiles = () => {

  // TODO
  console.log('uploading files');

};*/

export default uploadFiles;

