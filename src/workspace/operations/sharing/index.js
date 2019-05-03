import React from 'react';
import { render } from 'react-dom';
import ShareModal from './ShareModal';

export const shareSelection = selection => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const close = url => { 
      container.remove();
      resolve();
    }

    render(
      <ShareModal
        selection={selection}
        onClose={close} />, container);
  });

}