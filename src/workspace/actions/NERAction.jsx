import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import JobProgress from '../../common/content/job/JobProgress.jsx';
import NERModal from '../../common/content/ner/NERModal.jsx';

export default class NERAction extends Component {

  constructor(props) {
    super(props);
    this.state = { running: false };
  }

  startNER = (config) => {
    const documents = this.props.selection.filter(d => {
      const isDocument = d.type === 'DOCUMENT'
      const hasTextParts = d.filetypes.filter(t => t.startsWith('TEXT_')).length > 0;
      return isDocument && hasTextParts
    });

    const taskDefinition = Object.assign(
      { task_type: 'NER', documents: documents.map(d => d.id) }, 
      config
    );

    axios.post('/api/job', taskDefinition)
      .then(response => {
        this.setState({
          running: true,
          jobId: response.data.job_id
        });
      });
  }

  handleCompleted = () => {
    this.props.onComplete && this.props.onComplete();
  }

  render() {
    if (this.state.running) {
      return <JobProgress 
        title="Named Entity Recognition"
        jobId={this.state.jobId} 
        onComplete={this.handleCompleted}
        onClose={this.props.onClose}
        labelCompleted="Parsed"
        labelTasks="files" />
    } else {
      return ReactDOM.createPortal(
        <NERModal 
          onStart={this.startNER}
          onCancel={this.props.onCancel} />, 
        document.body
      )
    }
  }

}
