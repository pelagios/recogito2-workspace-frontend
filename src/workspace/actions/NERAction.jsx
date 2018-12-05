import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NERModal from '../../common/content/ner/NERModal.jsx';

export default class NERAction extends Component {

  startNER(config) {
    console.log(config);
  }

  render() {
    return ReactDOM.createPortal(
      <NERModal 
         onStart={this.startNER.bind(this)}
         onCancel={this.props.onCancel} />, 
      document.body
    )
  }

}
