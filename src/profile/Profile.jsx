import React from 'react';
import Breadcrumbs from '../common/header/Breadcrumbs';
import { CSSTransition } from 'react-transition-group';
import GridPane from '../common/documents/grid/GridPane';
import HeaderIcon from '../common/header/HeaderIcon';
import Readme from '../common/documents/Readme';
import Sidebar from './sidebar/Sidebar';
import TablePane from '../common/documents/table/TablePane';
import TopBar from './top/TopBar';

const Profile = props => {

  const canFork = props.selection.isSingleDocument();

  return (
    <React.Fragment>
      <TopBar me={props.me} />

      <Sidebar account={props.visitedAccount}/>

      <div className="main-content">
        <Breadcrumbs 
          label="Public Documents"
          path={props.page.breadcrumbs}
          docCount={props.page.total_docs} />

        <div className="main-header-icons">
          <CSSTransition
            in={canFork} 
            timeout={200} 
            classNames="fork-button">

            <div 
              className="fork-button"
              onClick={props.onFork}> 
              <span className="icon">&#xf126;</span>             
              <span className="label">Clone to my workspace</span>
            </div>
          </CSSTransition>

          <HeaderIcon
            className="presentation-toggle stroke7"
            icon={(props.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
            onClick={props.onTogglePresentation} />
        </div>

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
            selection={props.selection}
            busy={props.busy}
            enableFiledrop={false} 
            onSelect={props.onSelect}
            onSort={props.onSortTable}
            onChangeColumnConfig={props.onChangeColumnConfig} />
        }

        { props.visitedAccount && props.page.items.length > 0 && props.presentation === 'GRID' &&
          <GridPane
            items={props.page.items}
            selection={props.selection}
            busy={props.busy}
            enableFiledrop={false} 
            onSelect={props.onSelect} />         
        }
      </div>
    </React.Fragment>
  );

}

export default Profile;