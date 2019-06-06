import React from 'react';
import { render } from 'react-dom';
import FolderBrowser from './FolderBrowser';

export const moveSelection = args => {

  const container = document.createElement('div');
  document.body.appendChild(container);

  const onComplete = () => {
    container.remove();
    args.onComplete();
  }

  const onCancel = () => {
    container.remove();
  }

  render(
    <FolderBrowser
      view={args.view}
      page={args.page}
      selection={args.selection} 
      onComplete={onComplete}
      onCancel={onCancel} />, container);

}