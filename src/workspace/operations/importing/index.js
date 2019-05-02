import React from 'react';
import { render } from 'react-dom';

import Importer from './Importer';

const importContent = (files, remoteSource) => {
  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      container.remove();
      resolve();
    }

    const onClose = result => {
      container.remove();
    }

    render(<Importer 
      files={files}
      remoteSource={remoteSource}
      onComplete={onComplete}
      onClose={onClose} />, container);
  });
}

export const uploadFiles = files => {
  return importContent(files);
}

export const importSource = (url, sourceType) => {
  return importContent([], { url: url, sourceType: sourceType });
}