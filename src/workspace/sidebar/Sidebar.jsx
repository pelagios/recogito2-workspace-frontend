import React, { Component } from 'react';

import ActivityWidget from '../../common/content/activity/ActivityWidget.jsx';
import CollaboratorList from '../../common/content/profile/CollaboratorList.jsx';

import Account   from './sections/Account.jsx';
import CreateNew from './sections/CreateNew.jsx';
import ViewList  from './sections/Views.jsx';
import Storage   from './sections/Storage.jsx';

export default class Sidebar extends Component {

  handleCreateFromSource = (value) => {
    if (value.type === 'IIIF_SOURCE') {
      this.props.onCreateFromSource && this.props.onCreateFromSource(value.url);
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Account
          account={this.props.account} />

        <CreateNew 
          onCreateFolder={this.props.onCreateFolder}
          onUploadFiles={this.props.onUploadFiles} 
          onImportSource={this.props.onImportSource} />
          
        <ViewList
          account={this.props.account}
          view={this.props.view}
          onChangeView={this.props.onChangeView} />

        <Storage 
          account={this.props.account} /> 

        <ActivityWidget 
          className="section" 
          width={237}
          height={55}
          fill="#4483c4"
          stats={this.props.account && this.props.account.stats} />

        <CollaboratorList 
          className="section collaborators"
          title="My top collaborators"
          username={this.props.account && this.props.account.username} />
      </div>
    )
  }

}
