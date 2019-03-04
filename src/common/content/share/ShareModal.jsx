import React, { Component } from 'react';
import Modal from '../../components/Modal.jsx';
import PublicAccess from './views/PublicAccess.jsx';

export default class ShareModal extends Component {

  state = {
    view: 'PUBLIC_ACCESS'
  };

  setView = (name) => {
    this.setState({ view: name });
  }


  renderPublicAccess = () => {
    return <PublicAccess />
  }

  getView = () => {
    if (this.state.view === 'PUBLIC_ACCESS') {
      return this.renderPublicAccess();
    }
  }

  render() {
    return (
      <Modal
        className="share-options" 
        title="Share"
        onClose={this.props.onCancel}>
        <div className="share-options-body">
          <div className="share-options-sidemenu">
            <ul>
              <li 
                className={this.state.view === 'PUBLIC_ACCESS' ? 'active': ''}
                onClick={() => this.setView('PUBLIC_ACCESS')} >
                Public Access
              </li>

              <li 
                className={this.state.view === 'COLLABORATORS' ? 'active': ''}
                onClick={() => this.setView('COLLABORATORS')} >
                Collaborators
              </li>

              <li
                className={this.state.view === 'DISTRIBUTE_COPIES' ? 'active': ''}
                onClick={() => this.setView('DISTRIBUTE_COPIES')} >
                Distribute Copies
              </li>
            </ul>
          </div>

          <div className="share-options-settings">
            { this.getView() }            
          </div>
        </div>
      </Modal>
    )
  }

}
