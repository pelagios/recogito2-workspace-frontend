import React from 'react';

import ActivityHistory from '../../../common/account/ActivityHistory';
import TopCollaborators from '../../../common/account/TopCollaborators';

const MyActivity = props => {
  
  return (
    <React.Fragment>
      <ActivityHistory 
        className="section" 
        width={237}
        height={55}
        fill="#4483c4"
        stats={props.account && props.account.stats} />

      <TopCollaborators 
        className="section collaborators"
        title="My top collaborators"
        username={props.account && props.account.username} />
    </React.Fragment>
  );

}

export default MyActivity;