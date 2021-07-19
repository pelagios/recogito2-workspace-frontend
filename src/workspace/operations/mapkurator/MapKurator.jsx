import React, { Component } from 'react';
import axios from 'axios';

export default class MapKurator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      running: false,
      jobId: null
    }

    this.start();
  }

  start = () => {
    // This is unsafely hard-wired to assume a single image filepart
    const document = this.props.selection.getItems()[0];

    const taskDefinition = {
      task_type: 'MAPKURATOR', 
      documents: [ document.id ], 
      version: '1.0'
    }

    axios.post('/api/job', taskDefinition).then(response => {
      this.setState({
        running: true,
        jobId: response.data.job_id
      });
    });
  }

  render() {
    const isDone = false;

    return (
      <div className="job-progress">
        <div className="header">
          mapKurator { isDone && <button 
            className="close nostyle"
            onClick={this.props.onClose}>&#xe897;</button>
          }
        </div>

        <div className="body">
          <div className="message">
            This may take a while...
          </div>
        </div>
      </div>
    )
  }

}