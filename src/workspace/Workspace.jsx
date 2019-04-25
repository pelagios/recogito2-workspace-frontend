import React from 'react';

import Header from './header/Header';
import Readme from '../common/documents/Readme';
import Sidebar from './sidebar/Sidebar';
import GridPane from '../common/documents/grid/GridPane';
import TablePane from '../common/documents/table/TablePane';

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
          onCreateReadme={props.onCreateReadme} />

        { props.page.readme && 
          <Readme
            content={props.page.readme} 
            onUpdate={props.onUpdateReadme} 
            onDelete={props.onDeleteReadme} />
        }

        { props.presentation === 'TABLE' &&
          <TablePane
            items={props.page.items}
            config={props.tableConfig}
            selection={props.selection}
            busy={props.busy}
            enableFiledrop={props.view === 'MY_DOCUMENTS'} 
            onSelect={props.onSelect} 
            onChangeColumnConfig={props.onChangeColumnConfig} />
        }

        { props.presentation === 'GRID' &&
          <GridPane
            items={props.page.items}
            selection={props.selection}
            busy={props.busy}
            enableFiledrop={props.view !== 'MY_DOCUMENTS'} 
            onSelect={props.onSelect} />            
        }
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