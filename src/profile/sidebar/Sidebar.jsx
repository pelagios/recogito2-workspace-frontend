import React, { Component } from 'react';

// import ActivityWidget from '../../common/content/activity/ActivityWidget.jsx';
// import CollaboratorList from '../../common/content/profile/CollaboratorList.jsx';
// import ProfileInfo from '../../common/content/profile/ProfileInfo.jsx';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar"> {/*
        <div className="section">
          <ProfileInfo account={this.props.account} />
        </div>

        <ActivityWidget 
          className="section" 
          width={237}
          height={55}
          fill="#4483c4"
          stats={this.props.account && this.props.account.stats} />

        <CollaboratorList 
          className="section"
          title="Top collaborators"
      username={this.props.account && this.props.account.username} /> */}
      </div>
    );
  }

}