import React, { Component } from 'react';
import UserSearch from '../../../../common/UserSearch';

export default class DistributeCopies extends Component {

  state = {
    recipients: []
  }

  removeRecipient = recipient => {
    this.setState(prev => {
      return { recipients: prev.recipients.filter(r => r !== recipient) }
    });
  }

  addRecipient = recipient => {
    this.setState(prev => {
      return { recipients:  [ ...prev.recipients, recipient ] }
    });
  }
  
  sendCopies = () => {
    // TODO 
  }

  render() {
    const recipients = this.state.recipients.map(r => 
      <tr key={r}>
        <td>{r}</td>
      </tr>
    );

    return (
      <div className="distribute-copies">
        <h3>Send copies to</h3>
        
        <table className="recipients">
          <tbody>
            { recipients }
          </tbody>
        </table>

        <UserSearch 
          placeholder="Add a recipient"
          exclude={this.state.recipients.map(c => c.username)} 
          onSelect={this.addRecipient} />

        <button
          className="btn" 
          disabled={recipients.length === 0}
          onClick={this.sendCopies}>Send now</button>
      </div>
    )
  }

}
