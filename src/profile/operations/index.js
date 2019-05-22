import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import Modal from '../../common/Modal';

const ForkingModal = props => {

  return (
    <Modal className="now-forking">
      <h2>Cloning Document</h2>
      <div className="wait-spinner" />
      <p>Please wait while I'm creating a copy in your workspace.</p>
    </Modal>
  );

}

export const forkDocument = id => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  const minWait = new Promise(resolve => {
    // Wait at least a few seconds, so the user can read the popup
    setTimeout(() => resolve(), 3000);
  });

  const op = axios.post(`/api/clone/document/${id}`);

  render(<ForkingModal />, container);

  return Promise.all([ minWait, op ]).then(() => container.remove());
}