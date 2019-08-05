import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from '../../../common/Modal';

class SendMessageForm extends Component {

  render() {
    return(
      <Modal 
        className="message-form-container"
        title="Send Message"
        onClose={this.props.onCancel}>
        <div>
          <dl>
            <dt>
              <label for="recipient">To</label>
            </dt>
            <dd>
              <input 
                disabled
                type="text" 
                id="recipient" 
                value={this.props.recipient} />
            </dd>
          </dl>

          <dl>
            <dt>
              <label for="message">Message</label>
            </dt>
            <dd>
              <textarea rows={10} />
            </dd>
          </dl>

          <div className="buttons">
            <button
              className="btn outline small" 
              onClick={this.props.onCancel}>Cancel</button>

            <button className="btn small">Send</button>
          </div>
        </div>
      </Modal>
    )
  }

}

export const sendMessage = (from, to) => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onCancel = () => {
      container.remove();
      resolve();
    }

    render(
      <SendMessageForm 
        recipient={to} 
        onCancel={onCancel} />, container
    );

    /*
    const onOk = folderName => { 
      const currentFolderId = document.location.hash.substring(1);

      axios.post('/api/folder', {
        title: folderName || 'Unnamed Folder',
        parent: currentFolderId
      }).then(() => {
        container.remove();
        resolve();
      });
    }
    */
  });

}