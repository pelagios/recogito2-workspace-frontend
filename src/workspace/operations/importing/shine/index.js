import React from 'react';
import { render } from 'react-dom';
import SHINEModal from './SHINEModal';

export const importFromShine = () => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onResolve = files => {
      container.remove();
      resolve(files);
    }
    
    render(
      <SHINEModal 
        onClose={onResolve}
        onUploadFiles={onResolve} />, container);
  });

}