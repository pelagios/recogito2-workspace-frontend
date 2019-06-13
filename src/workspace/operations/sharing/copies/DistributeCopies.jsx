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

  render() {
    const recipients = this.state.recipients.map(r => 
      <tr key={r}>
        <td>{r}</td>
      </tr>
    );

    return (
      <div className="distribute-copies">
        <h3>Send copy to</h3>
        <table className="recipients">
          <tbody>
            { recipients.length > 0 ? 
              recipients : <tr className="no-recipients"><td>Enter a username below to add a recipient.</td></tr>
            }
          </tbody>
        </table>

        <UserSearch 
          exclude={this.state.recipients.map(c => c.username)} 
          onSelect={this.addRecipient} />
      </div>
    )
  }

}
