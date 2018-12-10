import React, { Component } from 'react';

export default class JobProgressPopup extends Component {

  render() {
    return (
      <div className="job-progress">
        <div className="header">
          {this.props.title}
          <button 
            className="close nostyle"
            onClick={this.props.onClose}>&#xe897;</button>
        </div>

        <div className="body">
          <div className="message">{this.props.message}</div>

          <div className="progress">
            <Meter value={this.props.progress / 100} />
          </div>
        </div>
      </div>
    )
  }

}
