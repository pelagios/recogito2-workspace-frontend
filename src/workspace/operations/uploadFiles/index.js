import React from 'react';
import { render } from 'react-dom';

import Uploader from './Uploader';
import { promises } from 'fs';

export const uploadFiles = files => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = result => {
      container.remove();
      resolve(result);
    }

    render(<Uploader 
      files={files}
      onComplete={onComplete} />, container);
  });
}

const importSource = (url, type) => {

}

/*
const foo = (files) => {
  
  
  let phase = 'Uploading';

  const totalSize = files.reduce((total, f) => total + f.size, 0);

  const uploads = files.map(f => {
    return {
      file: f,
      status: 'UPLOADING', 
      progress: 0,
      error: null
    }
  });

  //
      remoteSource: props.url,
      phase: 'Uploading',
      totalSize: props.files.reduce((total, f) => total + f.size, 0),
      filepartIds: (props.files.length > 0) ? props.files.map(() => null) : [ null ],
      uploadId: null,
      uploadStatus: (props.files.length > 0) ? props.files.map(() => 'UPLOADING') : [ 'UPLOADING'],
      progress: (props.files.length > 0) ? props.files.map(() => 0) : [ 0 ],
      errors: []
    };
  }

  componentWillReceiveProps(next) {
    if (this.props.files === next.files && this.props.url === next.url)
      return;

    this.setState(this._emptyState(next), () => this.start());
  }

  /** 
   * Starts a new upload.
   * 
   * Since one document generally consists of multiple files, the 
   * upload process is multi-stage: 
   * 
   * - first, the new document is initialized, and assigned an ID on the server
   * - then, all files are uploaded to this document
   * - finally, a finalization requests closes the document, and waits for any
   *   processing (image tiling, TEI conversion) to finish
   *
  start() {
    this.initNewDocument()
      .then((result) => { 
        this.setState({ uploadId: result.data.id });

        // Branch based on files vs. remote URL
        if (this.state.files.length > 0)
          return this.uploadFiles() 
        else if (this.state.remoteSource)
          return this.registerURL()
      })
      .catch(error => {
        this.setState(prev => {
          const errors = prev.errors.slice(0);
          errors.push(error.response.data);
          return { errors: errors };
        });
      })
      .then(this.finalizeDocument.bind(this));
  }

  /**
   * Initializes a new document, using the filename as title,
   * or a 'New document' placeholder in case there are multiple files.
   *
  initNewDocument() {
    const title = (this.state.files.length === 1) ? this.state.files[0].name : 'New document';
    const formdata = new FormData();
    formdata.append('title', title);

    return axios.post('/my/upload', formdata, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }

  registerURL() {
    this.setState({ phase: 'Importing' });

    const formdata = new FormData();
    formdata.append('url', this.state.remoteSource);

    return axios.post(`/my/upload/${this.state.uploadId}/file`, formdata, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }

  updateStatusForFile(filepartId, pollResult) {
    const progress = pollResult.subtasks.find(t => t.filepart_id === filepartId);
    const idx = this.state.filepartIds.indexOf(filepartId);

    const setUploadStatus = (value) => {
      this.setState(prev => {
        const uploadStatus = prev.uploadStatus.slice(0);
        uploadStatus[idx] = value;
        return { uploadStatus: uploadStatus };
      })
    }

    if (progress)
      setUploadStatus(progress.status);
    else // No task running for this file - complete
      setUploadStatus('COMPLETED');
  }

  /**
   * Polls import task progress
   *
  pollTaskProgress(documentId, taskTypes) {    
    axios.get(`/api/job?id=${documentId}`)
      .then(result => {
        // Update status per file
        this.state.filepartIds.map(id => this.updateStatusForFile(id, result.data));
        const isDone = result.data.status === 'COMPLETED' || result.data.status === 'FAILED';
        if (isDone)
          this.props.onUploadComplete()
        else
          setTimeout(() => this.pollTaskProgress(documentId, taskTypes), 1000);
      })
      .catch(error => {
        if (error.response.status === 404)
          // Tasks might still be initializing
          setTimeout(() => this.pollTaskProgress(documentId, taskTypes), 1000);
      });
  }

  isUploadComplete() {
    return this.state.uploadStatus
      .reduce((complete, next) => complete && (next === 'COMPLETED' || next === 'FAILED'));
  }

  onCancel(evt) {
    if (this.isUploadComplete())
      this.props.onUploadComplete();
  }

  render() {
    const totalLoaded = this.state.progress.reduce((total, next) => total + next, 0);

    return (
      <div className="upload-progress">
        <div className="phase">
          {this.state.phase}
          <button 
            className="close nostyle"
            onClick={this.onCancel.bind(this)}>&#xe897;</button>
        </div>
        <ul className={`files${(this.state.errors.length > 0) ? ' has-errors' : ''}`}>
          {this.state.files.map((f, idx) =>
            <li key={idx}>
              {f.name}
              <span className={`icon spinner ${this.state.uploadStatus[idx]}`}></span>
            </li>
          )}

          {this.state.remoteSource &&
            <li>
              Fetching content from remote source...
              <span className="icon spinner RUNNING"></span>
            </li>
          }
        </ul>
        {this.state.errors.length > 0 && 
          <ul className="errors">
            {this.state.errors.map((message, idx) => <li key={idx}>{message}</li>)}
          </ul>
        }
        <div className="progress">
          <Meter value={totalLoaded / this.state.totalSize} />
        </div>
      </div>
    )
  }

} */