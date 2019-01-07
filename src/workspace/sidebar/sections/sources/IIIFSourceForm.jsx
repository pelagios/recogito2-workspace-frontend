import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import URLInput from '../../../../common/components/URLInput.jsx';

export default class IIIFSourceForm extends Component {

  handleOk = () => {
    console.log('ok');
  }

  handleCancel = () => {
    console.log('cancel');
  }

  render() {
    const popup =
      <div className={`clicktrap ${this.props.className}`}>
        <div className="modal-wrapper iiif-source">
          <div className="modal">
            <div className="modal-body">
              <URLInput 
                onSubmit={this.handleOk} />

              <div className="buttons">
                <button 
                  className="btn outline tiny"
                  onClick={this.handleCancel}>Cancel</button>

                <button
                  className="btn tiny"
                  onClick={this.handleOk}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    return ReactDOM.createPortal(popup, document.body);
  }

}