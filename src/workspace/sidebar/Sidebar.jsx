import React, { Component } from 'react';

import CollaboratorList from '../../common/content/profile/CollaboratorList.jsx';

import Account   from './sections/Account.jsx';
import CreateNew from './sections/CreateNew.jsx';
import ViewList  from './sections/Views.jsx';
import Storage   from './sections/Storage.jsx';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { collaborators: [] };
  }

  render() {
    return (
      <div className="sidebar">
        <Account
          account={this.props.account} />

        <CreateNew 
          onUploadFiles={this.props.onUploadFiles} />
          
        <ViewList
          account={this.props.account}
          currentView={this.props.currentView}
          onChangeView={this.props.onChangeView} />

        <Storage 
          account={this.props.account} /> 

        <CollaboratorList 
          className="section collaborators"
          title="My top collaborators"
          username={this.props.account && this.props.account.username} />
      </div>
    )
  }

}
