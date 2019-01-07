import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Modal from '../../common/components/Modal.jsx';

export default class ImportIIIFAction extends Component {

  render() {
    const popup =
      <div className={`clicktrap ${this.props.className}`}>
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-body">
              <input />
              <input />
            </div>
          </div>
        </div>
      </div>

    return ReactDOM.createPortal(popup, document.body);
  }

}