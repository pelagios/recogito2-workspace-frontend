import React from 'react';
import { render } from 'react-dom';
import FolderBrowser from './FolderBrowser';

export const moveSelection = args => {

  // TODO implement

  const { 
    selection
  } = args;

  const container = document.createElement('div');
  document.body.appendChild(container);

  const onCancel = () => {
    container.remove();
  }

  render(
    <FolderBrowser
      selection={selection} 
      onCancel={onCancel} />, container);

}