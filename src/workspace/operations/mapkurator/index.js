import React from 'react';
import { render } from 'react-dom';
import MapKurator from './MapKurator';

export const mapKurator = selection => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () =>
      resolve();

    const onClose = () =>
      container.remove();

    render(
      <MapKurator 
        selection={selection}
        onClose={onClose}
        onComplete={onComplete} />, container);
  });

}