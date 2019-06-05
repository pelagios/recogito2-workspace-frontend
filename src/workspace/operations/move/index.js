import React from 'react';
import { render } from 'react-dom';
import FolderBrowser from './FolderBrowser';

export const moveSelection = args => {

  const container = document.createElement('div');
  document.body.appendChild(container);

  const onCancel = () => {
    container.remove();
  }

  render(
    <FolderBrowser
      view={args.view}
      page={args.page}
      selection={args.selection} 
      onCancel={onCancel} />, container);

}