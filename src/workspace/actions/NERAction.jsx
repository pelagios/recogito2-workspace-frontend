import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NERModal from '../../common/content/ner/NERModal.jsx';

export default class NERAction extends Component {

  render() {
    return ReactDOM.createPortal(
      <NERModal onCancel={this.props.onCancel} />, 
      document.body
    )
  }

}
