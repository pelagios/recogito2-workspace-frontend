import React, { Component } from 'react';
import axios from 'axios';

import UploadProgressModal from './UploadProgressModal';

/** 
 * A stateful container component to manage the
 * upload process.
 */
export default class Uploader extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState(props);
    this.start();
  }

  initialState(props) {
    return {
      phase: 'Uploading',
      uploadId: null,
      uploads: props.files.map(f => {
        return {
          file: f,
          filepartId: null,
          status: 'UPLOADING', 
          progress: 0,
          error: null
        };
      }),
      error: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState(this.initialState(props));
  }

  /** Helper to update a specific upload in the state array **/
  updateUploadState = (upload) => {
    // Clone uploads list
    const newUploads = [ ...this.state.uploads ];

    // Replace the specific upload
    newUploads[newUploads.indexOf(upload)] = upload; 

    // Update state
    this.setState({ uploads: newUploads });
  }

  /**
   * Initializes a new document, using the filename as title,
   * or a 'New document' placeholder in case there are multiple files.
   */
  initNewDocument = () => {
    const title = (this.state.uploads.length === 1) ? this.state.uploads[0].file.name : 'New document';
    const formdata = new FormData();
    formdata.append('title', title);

    return axios.post('/my/upload', formdata, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }

  /** Uploads files in parallel **/
  uploadFiles = () => {
    // Helper: handles upload for one file
    const uploadOne = upload => {
      const formdata = new FormData();
      formdata.append('file', upload.file);

      const onUploadProgress = (evt) => {
        this.updateUploadState({ ...upload, ...{ progress: evt.loaded } });
      }

      return axios.post(`/my/upload/${this.state.uploadId}/file`, formdata, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        onUploadProgress: onUploadProgress
      }).then(result => {
        this.updateUploadState({ ...upload, ...{ filepartId: result.data.uuid } });
        return result;
      }).catch(error => {
        this.updateUploadState({ ...upload, ...{
          status: 'FAILED',
          error: error.response.data
        }});
      });
    }

    // The list of request promises...
    const requests = this.state.uploads.map(uploadOne);

    // ... rolled into a promise of the list of request results
    return Promise.all(requests);
  }

  finalizeDocument = () => {
    const currentFolder = document.location.hash.substring(1);

    const url = currentFolder ?
      `/my/upload/${this.state.uploadId}/finalize?folder=${currentFolder}` :
      `/my/upload/${this.state.uploadId}/finalize`;

    return axios.post(url, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).then(result => {
      const tasks = result.data.running_tasks;
      if (tasks.length > 0) {
        this.setState({ phase: 'Importing...' });
        this.pollTaskProgress(result.data.document_id, tasks);
      } else {
        this.props.onComplete();
      }
    }).catch(error => {
      console.log(error);
      this.setState({ error: error.response.data });
    });
  }

  /** 
   * Starts a new upload.
   * 
   * Since one document generally consists of multiple files, the 
   * upload process is three-stage: 
   * 
   * 1. the new document is initialized, and assigned an ID on the server
   * 2. all files are uploaded to this document
   * 3. a finalization requests closes the document, and waits for any
   *   processing (image tiling, TEI conversion) to finish
   */
  start() {
    this.initNewDocument().then((result) => {
      this.setState({ uploadId: result.data.id });
      // Branch based on files vs. remote URL
      return this.state.remoteSource ?
        this.importSource() : this.uploadFiles();
    }).catch(error => {
      this.setState({ error: error.response.data });
    }).then(this.finalizeDocument);
  }

  render() {
    return (
      <UploadProgressModal
        phase={this.state.phase}
        uploads={this.state.uploads}
        onCancel={this.props.onCancel} />
    )
  }

}