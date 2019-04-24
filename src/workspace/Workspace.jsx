import React from 'react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';


const Workspace = props => {

  return (
    <React.Fragment>
      <Sidebar
        account={props.account}
        view={props.view}
        onChangeView={props.onChangeView}
        onCreateFolder={props.onCreateFolder}
        onUploadFiles={props.onUploadFiles}
        onImportSource={props.onImportSource} />

      <div className="main-content">
        <Header
          account={props.account}
          view={props.view}
          presentation={props.presentation}
          readme={props.page.readme}
          breadcrumbs={props.page.breadcrumbs}
          docCount={props.page.total_docs}
          selection={props.selection}
          onTogglePresentation={props.onTogglePresentation} 
          onCreateReadme={props.createReadme} />
      
      {/*

      {this.state.presentation === 'TABLE' ?
        <TablePane
          view={this.state.view}
          folders={this.state.folders}
          documents={this.state.documents}
          columns={this.state.table_columns}
          sorting={this.state.table_sorting}
          busy={this.state.busy}
          selection={this.state.selection}
          disableFiledrop={this.state.view !== 'MY_DOCUMENTS'}
          onSort={this.onSortTable.bind(this)}
          onSelect={this.onSelect.bind(this)} 
          onDropFiles={this.startUpload.bind(this)} 
          onDropURL={this.startRegisterRemoteSource.bind(this)} 
          onChangeColumnPrefs={this.onChangeColumnPrefs.bind(this)} 
          onRenameFolder={this.onRenameFolder.bind(this)}>

          {this.state.readme && 
            <Readme
              content={this.state.readme} 
              onUpdate={this.onUpdateReadme.bind(this)} 
              onDelete={this.onDeleteReadme.bind(this)} /> 
          }
        </TablePane>
        :
        <GridPane
          folders={this.state.folders}
          documents={this.state.documents}
          busy={this.state.busy}
          selection={this.state.selection}
          onSelect={this.onSelect.bind(this)} 
          disableFiledrop={this.state.view !== 'MY_DOCUMENTS'}
          onDropFiles={this.startUpload.bind(this)}
          onDropURL={this.startRegisterRemoteSource.bind(this)} >
          
          {this.state.readme && 
            <Readme 
              content={this.state.readme} 
              onUpdate={this.onUpdateReadme.bind(this)} 
              onDelete={this.onDeleteReadme.bind(this)} /> 
          }
        </GridPane>
      }
    */}

    </div>

    {/* isUploading && 
      <Uploader
        files={this.state.fileUploads} 
        url={this.state.urlUpload}
        onUploadComplete={this.onUploadComplete.bind(this)} /> 
    }

    {this.state.announcement && 
      <Announcement
        id={this.state.announcement.id}
        message={this.state.announcement.content} 
        onClose={e => this.setState({ announcement: null })} />
    }
  */}
    </React.Fragment>
  );

}

export default Workspace;