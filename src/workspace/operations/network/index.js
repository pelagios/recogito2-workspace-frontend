import React from 'react';
import { render } from 'react-dom';
import NetworkModal from './NetworkModal';

export const exploreNetwork = selection => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const close = url => { 
      container.remove();
      resolve();
    }

    render(
      <NetworkModal
        onClose={close} />, container);
  });

}