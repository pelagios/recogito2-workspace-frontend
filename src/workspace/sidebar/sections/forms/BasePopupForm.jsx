import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class BasePopupForm extends Component {

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

  handleOk = () => {
    this.props.onOk && this.props.onOk();
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();    
  }

  render() {
    return (
      <div className={`clicktrap ${this.props.className}`}>
        <div
          className={`modal-wrapper popup-form ${this.props.className}`}>
          <div className="modal">
            <div className="modal-body">
              <div className="form-body">
                {this.props.children}
              </div>

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
    )
  }

}