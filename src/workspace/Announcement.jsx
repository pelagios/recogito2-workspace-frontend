import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import API from './API.js';
import Modal from '../common/components/Modal.jsx';

export default class BasePopupForm extends Component {

  confirm = () => {
    API.confirmAnnouncement(this.props.id).then(() => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <Modal 
        title="A Message from Recogito" 
        className="announcement"
        onClose={this.confirm}>

        <div className="content">
          <ReactMarkdown source={this.props.message} />
        </div>

        <div className="buttons">
          <button
            className="btn "
            onClick={this.confirm}>Got it, thanks!</button>
        </div>
      </Modal>
    )
  }

}