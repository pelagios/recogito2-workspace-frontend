import React from 'react';

import Account from './sections/Account';
import NewContent from './sections/NewContent';
import Views from './sections/Views';
import Storage from './sections/Storage';
import MyActivity from './sections/MyActivity';

const Sidebar = props => {

  return (
    <div className="sidebar">
      <Account 
        account={props.account} />

      {/*
      <NewContent 
        onCreateFolder={props.onCreateFolder} 
        onUploadFiles={props.onUploadFiles} 
        onImportSource={props.onImportSource} /> */}

      <Views
        currentView={props.view} 
        onChangeView={props.onChangeView} />
      
      <Storage
        account={props.account} />

        {/*
      <MyActivity 
        account={props.account} /> */}
    </div>
  );

}

export default Sidebar;
