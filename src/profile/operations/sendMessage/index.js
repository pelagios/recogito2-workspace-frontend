import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Modal from '../../../common/Modal';

class SendMessageForm extends Component {

  state = {
    message: ''
  }

  onChange = evt => {
    this.setState({ message: evt.target.value });
  }

  render() {
    return(
      <Modal 
        className="message-form-container"
        title="Send Message"
        onClose={this.props.onCancel}>
        <div>
          <dl>
            <dt>
              <label htmlFor="recipient">To</label>
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
              <label htmlFor="message">Message</label>
            </dt>
            <dd>
              <textarea 
                rows={10} 
                value={this.state.message}
                onChange={this.onChange} />
            </dd>
          </dl>

          <div className="buttons">
            <button
              className="btn outline small" 
              onClick={this.props.onCancel}>Cancel</button>

            <button
              className="btn small"
              onClick={() => this.props.onSend(this.state.message)}>Send</button>
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

    const onSend = message => {
      axios.post('/api/send-message', { to, message }).then(() => {
        container.remove();
        resolve();
      });
    }

    render(
      <SendMessageForm 
        recipient={to} 
        onSend={onSend}
        onCancel={onCancel} />, container
    );
  });

}