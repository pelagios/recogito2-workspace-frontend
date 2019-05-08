import React, { Component } from 'react';
import axios from 'axios';
import NERProgressModal from './progress/NERProgressModal';
import NERConfigurationModal from './configuration/NERConfigurationModal';

/** 
 * A stateful container component to manage the
 * entity recognition process.
 */
export default class EntityRecognition extends Component {

  state = {
    running: false,
    jobId: null
  }

  start = config => {
    const textDocuments = this.props.selection.getItems().filter(item => {
      const isDocument = item.type === 'DOCUMENT';
      const hasTextParts = item.filetypes.filter(t => t.startsWith('TEXT')).length > 0;
      return isDocument && hasTextParts;
    });

    const taskDefinition = { 
      ...{ task_type: 'NER', documents: textDocuments.map(d => d.id) }, 
      ...config 
    }

    axios.post('/api/job', taskDefinition).then(response => {
      this.setState({
        running: true,
        jobId: response.data.job_id
      });
    });
  }

  render() {
    return this.state.running ? (
      <NERProgressModal
        jobId={this.state.jobId} 
        onComplete={this.props.onComplete} 
        onClose={this.props.onClose} />
    ) : (
      <NERConfigurationModal 
        onStart={this.start} 
        onCancel={this.props.onCancel} />
    )
  }

}