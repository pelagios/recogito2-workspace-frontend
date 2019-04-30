import React from 'react';
import { render } from 'react-dom';

import Uploader from './Uploader';

export const uploadFiles = files => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      resolve();
    }

    const onClose = result => {
      container.remove();
    }

    render(<Uploader 
      files={files}
      onComplete={onComplete}
      onClose={onClose} />, container);
  });
}

// const importSource = (url, type) => {
//
// }