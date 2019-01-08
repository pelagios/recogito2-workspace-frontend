import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Meter from '../../components/Meter.jsx';

export default class JobProgress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 'PENDING',
      progress: 0, // 0 - 100
      tasks: 0,
      tasksCompleted: 0
    };

    this.pollProgress();
  }

  pollProgress() { 
    axios.get(`/api/job/${this.props.jobId}`)
      .then(result => {
        this.setState({
          status: result.data.status,
          progress: result.data.progress,
          tasks: result.data.subtasks.length,
          tasksCompleted: result.data.subtasks.filter(t => t.status === 'COMPLETED').length,
          tasksFailed: result.data.subtasks.filter(t => t.status === 'FAILED').length
        });

        const isDone = result.data.status === 'COMPLETED' || result.data.status === 'FAILED';
        if (isDone)
          this.props.onComplete && this.props.onComplete();
        else
          setTimeout(() => this.pollProgress(), 1000);
      })
      .catch(error => {
        if (error.response.status === 404)
          // Tasks might still be initializing
          setTimeout(() => this.pollProgress(), 1000);
      });
  }

  handleClose = () => {
    this.props.onClose && this.props.onClose();
  }

  render() {
    const isDone = 
      this.state.status === 'COMPLETED' || 
      this.state.status === 'FAILED';

    const labelCompleted = this.props.labelCompleted || 'Completed';
    const labelTasks = this.props.labelTasks || 'tasks';

    return ReactDOM.createPortal(
      <div className="job-progress">
        <div className="header">
          {this.props.title}
          {isDone && <button 
            className="close nostyle"
            onClick={this.handleClose}>&#xe897;</button>
          }
        </div>

        <div className="body">
          <div className="message">
            {labelCompleted} {this.state.tasksCompleted} of {this.state.tasks} {labelTasks}
            <span className={`icon spinner ${this.state.status}`}></span>
          </div>

          <div className="progress">
            <Meter value={this.state.progress / 100} />
          </div>
        </div>
      </div>,
      document.body
    )
  }

}