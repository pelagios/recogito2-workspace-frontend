import React from 'react';
import { render } from 'react-dom';
import DestinationBrowser from './DestinationBrowser';

export const moveSelection = args => {

  // TODO implement

  const { 
    selection
  } = args;

  const container = document.createElement('div');
  document.body.appendChild(container);

  render(
    <DestinationBrowser
      selection={selection} />, container);

}