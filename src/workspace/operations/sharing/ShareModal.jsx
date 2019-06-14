import React, { Component } from 'react';
import Modal from '../../../common/Modal';
import PublicAccess from './public/PublicAccess';
import Collaborators from './collaborators/Collaborators';
import DistributeCopies from './copies/DistributeCopies';

export default class ShareModal extends Component {

  state = {
    view: 'PUBLIC_ACCESS'
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (evt) => {
    evt.stopPropagation();
    if (evt.which === 27) this.props.onClose();
  }

  setView = (name) => {
    this.setState({ view: name });
  }

  getView = () => {
    if (this.state.view === 'PUBLIC_ACCESS')
      return <PublicAccess item={this.props.selection.get(0)} onClose={this.props.onClose}/>
    else if (this.state.view === 'COLLABORATORS')
      return <Collaborators item={this.props.selection.get(0)} onClose={this.props.onClose} />
    else if (this.state.view === 'DISTRIBUTE_COPIES')
      return <DistributeCopies item={this.props.selection.get(0)} onClose={this.props.onClose} />
  }

  render() {
    return (
      <Modal
        className="multi-share-modal" 
        title="Share"
        onClose={this.props.onClose}>
        <div className="multi-share">
          <div className="multi-share-tabs">
            <ul>
              <li 
                className={this.state.view === 'PUBLIC_ACCESS' ? 'active' : ''}
                onClick={() => this.setView('PUBLIC_ACCESS')} >
                Public Access
              </li>

              <li 
                className={this.state.view === 'COLLABORATORS' ? 'active' : ''}
                onClick={() => this.setView('COLLABORATORS')} >
                Collaborators
              </li>

              <li className="disabled">
                Distribute Copies
              </li>
            </ul>
          </div>

          <div className="multi-share-body">
            <div className="view-container">
              { this.getView() }     
            </div>
          </div>
        </div>
      </Modal>
    )
  }

}
