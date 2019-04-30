import React from 'react';
import { render } from 'react-dom';

import Importer from './Importer';

export const uploadFiles = files => {
  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      resolve();
    }

    const onClose = result => {
      container.remove();
    }

    render(<Importer 
      files={files}
      onComplete={onComplete}
      onClose={onClose} />, container);
  });
}

export const importSource = (url, type) => {

}