import React, { Component } from 'react';
import axios from 'axios';

export default class MapKurator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      jobId: null,
      error: null
    }

    this.start();
  }

  pollProgress() { 
    axios.get(`/api/job/${this.state.jobId}`)
      .then(result => {
        const isDone = result.data.status === 'COMPLETED' || result.data.status === 'FAILED';
        if (isDone) {
          if (result.data.status === 'FAILED') {
            const { message } = result.data.subtasks[0];
            this.setState({ complete: true, error: message });
            this.props.onComplete();
          } else {
            this.setState({ complete: true });
            this.props.onComplete();
          }
        } else {
          setTimeout(() => this.pollProgress(), 1000);
        }
      })
      .catch(error => {
        if (error.response.status === 404)
          // Tasks might still be initializing
          setTimeout(() => this.pollProgress(), 1000);
      });
  }

  start = () => {
    // This is unsafely hard-wired to assume a single image filepart
    const document = this.props.selection.getItems()[0];

    const taskDefinition = {
      task_type: 'MAPKURATOR', 
      documents: [ document.id ]
    }

    axios.post('/api/job', taskDefinition).then(response => {
      this.setState({
        jobId: response.data.job_id
      });

      this.pollProgress();
    });
  }

  render() {
    return (
      <div className="job-progress">
        <div className="header">
          mapKurator { this.state.complete && <button 
            className="close nostyle"
            onClick={this.props.onClose}>&#xe897;</button>
          }
        </div>

        <div className="body">
          <div className="message">
            {(this.state.complete && !this.state.error) && 
              <span>Processing successful!</span>
            }

            {this.state.error && 
              <span>Processing failed: {this.state.error}</span>
            }

            {!this.state.complete &&
              <span>This may take a while...</span>
            }
          </div>
        </div>
      </div>
    )
  }

}