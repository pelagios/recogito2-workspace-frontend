import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import API from './API.js';
import Modal from '../common/components/Modal.jsx';

export default class BasePopupForm extends Component {

  handleOk = () => {
    // TODO confirm via API
    API.confirmAnnouncement(this.props.id).then(() => {
      this.props.onClose();
    });
  }

  render() {
    console.log(this.props.id);
    return (
      <Modal 
        title="A Message from Recogito" 
        className="announcement"
        onClose={this.props.onClose}>

        <div className="content">
          <ReactMarkdown source={this.props.message} />
        </div>

        <div className="buttons">
          <button
            className="btn "
            onClick={this.handleOk}>Got it, thanks!</button>
        </div>
      </Modal>
    )
  }

}