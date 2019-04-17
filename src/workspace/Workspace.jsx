const Workspace = (props) => {

  return (
    <React.Fragment>
      <Sidebar
        account={props.account}
        view={props.view}
        onChangeView={props.onChangeView}
        onCreateFolder={props.onCreateFolder}
        onUploadFiles={props.onUploadFiles}
        onImportSource={props.onImportSource} />

      <div className="container">
        <Header
          account={props.account}
          view={props.view}
          readme={props.readme}

          breadcrumbs={this.state.breadcrumbs}
          docCount={this.state.total_docs}
          selection={this.state.selection}
          presentation={this.state.presentation}
          displayConfig={this.getDisplayConfig()}
          onSearchResponse={this.handleSearchResponse}
          onDelete={this.setBusy.bind(this, true)}
          afterAction={this.afterAction.bind(this)}
          onTogglePresentation={this.togglePresentation.bind(this)} 
          onCreateReadme={this.createReadme.bind(this)} />

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
    </div>

    { isUploading && 
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
  </React.Fragment>

  );

}