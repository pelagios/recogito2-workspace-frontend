import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BasePopupForm from './BasePopupForm.jsx';
import URLInput from '../../../../common/components/URLInput.jsx';

export default class IIIFSourceForm extends Component {

  state = { sourceURL: null }
  
  handleChange = (value) => {
    this.setState({ sourceURL: value });
  }

  handleOk = () => {
    this.props.onSubmit && this.props.onSubmit({
      source: 'IIIF',
      url: this.state.sourceURL
    });    
  }

  render() {
    const popup =
      <BasePopupForm
        className="iiif"
        onOk={this.handleOk}
        onCancel={this.props.onCancel}>

        <URLInput 
          autofocus={true}
          placeholder="Paste or drag IIIF manifest URL"
          onChange={this.handleChange}
          onSubmit={this.handleOk} />
      </BasePopupForm>

    return ReactDOM.createPortal(popup, document.body);
  }

}