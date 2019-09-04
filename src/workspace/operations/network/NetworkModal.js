import React, { Component } from 'react';
import Modal from '../../../common/Modal';

export default class NetworkModal extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (evt) => {
    evt.stopPropagation();
    if (evt.which === 27) this.props.onClose();
  }

  render() {
    return (
      <Modal
        className="explore-network-modal" 
        title="Explore Network"
        onClose={this.props.onClose}>
        <div className="explore-network">
          <p>{/* TODO */}</p>
        </div>
      </Modal>
    )
  }

}
