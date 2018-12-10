import React, { Component } from 'react';
import axios from 'axios';

import Meter from '../../components/Meter.jsx';

export default class JobProgress extends Component {

  constructor(props) {
    super(props);

    // Using this to track ONE JOB only!
    // Props should have ONLY... 
    // - job ID 
    // - title 

    // The rest is in the state, which is updated via the 
    // API responses

    /*
    {
      "document_id" : "ry72uwi9bw7ofl",
      "status" : "COMPLETED",
      "progress" : 100,
      "subtasks" : [ {
        "task_type" : "NER",
        "filepart_id" : "c817840c-fe07-465f-9042-c0a109070694",
        "status" : "COMPLETED",
        "progress" : 100
      } ]
    }
    */


    this.state = {
      title: '',
      errors: []
    }
  }

  pollProgress(jobId) { 
    axios.get(`/api/job/${jobId}`)
      .then(result => {
        /* Update status per file
        this.state.filepartIds.map(id => this.updateStatusForFile(id, result.data));
        const isDone = result.data.status === 'COMPLETED' || result.data.status === 'FAILED';
        if (isDone)
          this.props.onUploadComplete()
        else
          setTimeout(() => this.pollTaskProgress(documentId, taskTypes), 1000);
        */
      });
  }

  onClose() {

  }

  render() {
    return (
      <div className="job-progress">
        <div className="header">
          {this.props.title}
          <button 
            className="close nostyle"
            onClick={this.onClose.bind(this)}>&#xe897;</button>
        </div>

        <div className="body">
          <div className="message">
            Completing task 3 of 9
          </div>

          <div className="progress">
            <Meter value={0.33} />
          </div>
        </div>
      </div>
    )
  }

}