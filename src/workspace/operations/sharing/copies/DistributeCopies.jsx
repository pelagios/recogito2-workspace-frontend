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
        <td>
          {r} 
          <button 
            className="nostyle icon remove"
            onClick={() => this.removeRecipient(r)}>&#xf00d;</button>
        </td>
      </tr>
    );

    return (
      <div className="distribute-copies">
        <h3>Send copies to</h3>
        
        <table className="recipients">
          <tbody>
            { recipients.length > 0 ? recipients :
              <tr><td className="add-recipients">Add recipients below</td></tr> }
          </tbody>
        </table>

        <UserSearch 
          exclude={this.state.recipients.map(c => c.username)} 
          onSelect={this.addRecipient} />

        <div className="footer">
          <button
            className="btn" 
            disabled={recipients.length === 0}
            onClick={this.sendCopies}>Send now</button>

          <button className="btn" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    )
  }

}
