import React, { Component } from 'react';

import Modal from '../../components/Modal.jsx';

export default class BasePopupForm extends Component {

  handleOk = () => {
    this.props.onOk && this.props.onOk();
  }

  render() {
    return (
      <Modal 
        title="Message" 
        className="announcement"
        onClose={this.props.onClose}>

        <div className="content">
          {this.props.message}
        </div>

        <button
          className="btn"
          onClick={this.handleOk}>Got it</button>
      </Modal>
    )
  }

}