import React from 'react';
import { render } from 'react-dom';
import EntityRecognition from './EntityRecognition';

export const entityRecognition = selection => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      resolve();
    }

    const onClose = () => {
      container.remove();
    }

    render(
      <EntityRecognition 
        selection={selection}
        onCancel={onClose} 
        onClose={onClose}
        onComplete={onComplete} />, container);
  });

}