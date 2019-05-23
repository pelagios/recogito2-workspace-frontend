import React, { Component } from 'react';
import axios from 'axios';
import ImportProgressModal from './ImportProgressModal';

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
      totalSize: props.files.reduce((total, f) => f.size + total, 0),
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
  updateUploadState = (upload, diff) => {
    this.setState(prev => { 
      return { 
        uploads: prev.uploads.map(u => u.file === upload.file ? { ...u, ...diff } : u) 
      }
    });
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
        this.updateUploadState(upload, { progress: evt.loaded });
      }

      return axios.post(`/my/upload/${this.state.uploadId}/file`, formdata, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        onUploadProgress: onUploadProgress
      }).then(result => {
        this.updateUploadState(upload, { 
          filepartId: result.data.uuid
        });
        return result;
      }).catch(error => {
        this.updateUploadState(upload, {
          status: 'FAILED',
          error: error.response.data
        });
        throw error;
      });
    }

    // The list of request promises...
    const requests = this.state.uploads.map(uploadOne);

    // ... rolled into a promise of the list of request results
    return Promise.all(requests);
  }

  importRemoteSource() {
    this.setState({ phase: 'Importing' });

    const formdata = new FormData();
    formdata.append('url', this.props.remoteSource.url);
    formdata.append('type', this.props.remoteSource.sourceType);

    return axios.post(`/my/upload/${this.state.uploadId}/file`, formdata, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }

  finalizeDocument = (withError) => {
    const currentFolder = document.location.hash.substring(1);

    const url = currentFolder ?
      `/my/upload/${this.state.uploadId}/finalize?folder=${currentFolder}` :
      `/my/upload/${this.state.uploadId}/finalize`;

    return axios.post(url, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).then(result => {
      const tasks = result.data.running_tasks;

      if (tasks && tasks.length > 0) {
        this.setState({ phase: 'Importing...' });
        this.pollTaskProgress(result.data.document_id, tasks);
      } else {
        this.setState({ phase: 'Completed' });
        this.state.uploads.forEach(u => {
          if (u.status !== 'FAILED') this.updateUploadState(u, { status: 'COMPLETED' });
        });
        if (!withError)
          this.props.onComplete();
      }
    });
  }

  pollTaskProgress = (documentId, taskTypes) => {    
    axios.get(`/api/job?id=${documentId}`)
      .then(result => {
        this.state.uploads.forEach(u => {
          const progress = result.data.subtasks.find(t => t.filepart_id === u.filepartId);
          if (progress)
            this.updateUploadState(u, { status: progress.status });
          else // No progress status - complete
            this.updateUploadState(u, { status: 'COMPLETED' });
        });

        const isComplete = this.state.uploads.reduce((isComplete, u) => {
          return isComplete && u.status === 'COMPLETED';
        }, true);

        if (isComplete) {
          this.setState({ phase: 'Completed' });
          this.props.onComplete();
        } else {
          setTimeout(() => this.pollTaskProgress(documentId, taskTypes), 1000);
        }
      }).catch(error => {
        if (error.response.status === 404)
          // Tasks might still be initializing
          setTimeout(() => this.pollTaskProgress(documentId, taskTypes), 1000);
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
      return this.props.remoteSource ?
        this.importRemoteSource() : this.uploadFiles();
    }).then(this.finalizeDocument).catch(error => {
      this.setState({ error: error });
      this.finalizeDocument(true);
      throw error;
    });
  }

  render() {
    return (
      <ImportProgressModal
        phase={this.state.phase}
        totalSize={this.state.totalSize}
        uploads={this.state.uploads}
        error={this.state.error}
        onClose={this.props.onClose} />
    )
  }

}