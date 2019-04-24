import React, { Component } from 'react';

export default class ModalForm extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false);
  }

  handleKeydown = (evt) => {
    if (evt.which === 27) this.props.onCancel(); // Escape
  }

  render() {
    return (
      <div className={`clicktrap ${this.props.className}`}>
        <div className={`modal-wrapper modal-form-wrapper ${this.props.className}`}>
          <div className="modal">
            <div className="modal-inner">
              <div>
                {this.props.children}
              </div>

              <div className="footer">
                <button 
                  className="btn outline tiny"
                  onClick={this.props.onCancel}>Cancel</button>

                <button
                  className="btn tiny"
                  onClick={this.props.onOk}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}