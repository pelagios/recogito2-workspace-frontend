import React from 'react';
import Breadcrumbs from '../common/header/Breadcrumbs';
import GridPane from '../common/documents/grid/GridPane';
import HeaderIcon from '../common/header/HeaderIcon';
import Readme from '../common/documents/Readme';
import Sidebar from './sidebar/Sidebar';
import TablePane from '../common/documents/table/TablePane';
import TopBar from './top/TopBar';

const Profile = props => {

  return (
    <React.Fragment>
      <TopBar me={props.me} />

      <Sidebar account={props.visitedAccount}/>

      <div className="main-content">
        <Breadcrumbs 
          label="Public Documents"
          path={props.page.breadcrumbs}
          docCount={props.page.total_docs} />

        <HeaderIcon
          className="presentation-toggle stroke7"
          icon={(props.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
          onClick={props.onTogglePresentation} />

        { props.visitedAccount && props.page.readme && 
          <Readme content={props.page.readme} />
        }

        { props.visitedAccount && props.page.items.length === 0 &&
          <div className="no-public-documents">
            {props.visitedAccount.username} has not shared any documents yet
          </div>
        }

        { props.visitedAccount && props.page.items.length > 0 && props.presentation === 'TABLE' &&
          <TablePane
            items={props.page.items}
            config={props.tableConfig}
            busy={props.busy}
            enableFiledrop={false} 
            onSort={props.onSortTable}
            onChangeColumnConfig={props.onChangeColumnConfig} />
        }

        { props.visitedAccount && props.page.items.length > 0 && props.presentation === 'GRID' &&
          <GridPane
            items={props.page.items}
            busy={props.busy}
            enableFiledrop={false} />         
        }
      </div>
    </React.Fragment>
  );

}

export default Profile;