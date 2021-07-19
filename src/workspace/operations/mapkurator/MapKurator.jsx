import React, { Component } from 'react';

export default class MapKurator extends Component {

  // onClose
  // onComplete

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