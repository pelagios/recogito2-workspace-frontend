import React from 'react';
import TopBar from './top/TopBar';
import Sidebar from './sidebar/Sidebar';

const Profile = props => {

  return (
    <React.Fragment>
      <TopBar me={props.me} />

      <Sidebar account={props.visitedAccount}/>

      <div className="main-content">
      {/*
        <Breadcrumbs 
          label="Public Documents"
          path={props.page.breadcrumbs}
          docCount={props.page.total_docs} />

        

        <HeaderIcon
          className="presentation-toggle stroke7"
          icon={(this.state.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
          onClick={this.onTogglePresentation.bind(this)} />

        {this.state.visitedAccount && (
            
            documents.length === 0 ? 
              <div className="no-public-documents">
                {this.state.visitedAccount.username} has not shared any documents yet
              </div> :

              this.state.presentation === 'TABLE' ?
                <TablePane
                  folders={[]}
                  documents={documents}
                  columns={this.state.table_columns}
                  sorting={this.state.table_sorting}
                  busy={this.state.busy} 
                  disableFiledrop={true} 
                  onSort={this.onSortTable.bind(this)} 
                  onChangeColumnPrefs={this.onChangeColumnPrefs.bind(this)}> 

                  {this.state.readme && 
                    <Readme content={this.state.readme} /> }
                </TablePane>
                :
                <GridPane
                  folders={[]}
                  documents={documents}
                  busy={this.state.busy} 
                  disableFiledrop={true}>

                  {this.state.readme && 
                    <Readme content={this.state.readme} /> }
                </GridPane>
        )}
                  */}
      </div>
    </React.Fragment>
  );

}

export default Profile;