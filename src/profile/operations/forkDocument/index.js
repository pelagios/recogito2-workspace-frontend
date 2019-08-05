import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import Modal from '../../../common/Modal';

class ForkingModal extends Component {

  state = {
    errorMessage: null
  }

  componentDidMount() {
    const minWait = new Promise(resolve => {
      // Wait at least a few seconds, so the user can read the popup
      setTimeout(() => resolve(), this.props.minWait);
    });
  
    const op = 
      axios.post(`/api/clone/document/${this.props.documentId}`).catch(error => {
        if (error.response.status === 409) // HTTP conflict - per convention, quota exceeded
          this.setState({ errorMessage: 'Oops. Could not create copy - the document exceeds your storage quota.' })
        else
          this.setState({ errorMessage: 'Ooops. Something went wrong.' });
  
        throw error;
      });

    Promise.all([minWait, op]).then(() => {
      this.props.onComplete();
    });
  }

  render() {
    return (
      <Modal className="now-forking">
        <h2>Cloning Document</h2>
        <div className={ this.state.errorMessage ? "error-icon" : "wait-spinner"} />
        { this.state.errorMessage ? 
          <div>
            <p className="error">{this.state.errorMessage}</p> 
            <button className="btn red" onClick={this.props.onComplete}>Close</button>
          </div> :

          <p>Please wait while I'm creating a copy in your workspace.</p>
        }
      </Modal>
    );
  }

}

export const forkDocument = id => {
  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      container.remove();
      resolve();
    }

    render(
      <ForkingModal 
        documentId={id} 
        minWait={3000}
        onComplete={onComplete} />, container);
  });
} 

