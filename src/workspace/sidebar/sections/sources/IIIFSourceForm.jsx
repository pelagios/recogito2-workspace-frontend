import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import URLInput from '../../../../common/components/URLInput.jsx';

export default class IIIFSourceForm extends Component {

  state = { sourceURL: null }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false);
  }

  handleKeydown = (evt) => {
    // Escape key
    if (evt.which === 27) this.handleCancel();
  }
  
  handleChange = (value) => {
    this.setState({ sourceURL: value });
  }

  handleOk = () => {
    this.props.onSubmit && this.props.onSubmit({
      source: 'IIIF',
      url: this.state.sourceURL
    });    
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();    
  }

  render() {
    const popup =
      <div className={`clicktrap ${this.props.className}`}>
        <div className="modal-wrapper iiif-source">
          <div className="modal">
            <div className="modal-body">
              <URLInput 
                onChange={this.handleChange}
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