import React, { Component } from 'react';
import { render } from 'react-dom';

import Announcement from  './Announcement.jsx';
import API from './API.js';
import GridPane from '../common/content/grid/GridPane.jsx';
import TablePane from '../common/content/table/TablePane.jsx';
import Readme from '../common/content/Readme.jsx';
import { Columns } from '../common/content/table/Columns.js';
import StoredUIState from '../common/StoredUIState.js';
import Uploader from '../common/content/upload/Uploader.jsx';
import Header from './header/Header.jsx';
import Sidebar from './sidebar/Sidebar.jsx';

import '../../assets/style/workspace/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    const state = {
      account       : null,           // account info
      view          : 'MY_DOCUMENTS', // view, as selected in sidebar (My Documents, Shared, Recent)
      breadcrumbs   : [],             // the current folder (and parent folders) we are in
      presentation  : 'TABLE',        // presentation mode TABLE or GRID
      table_columns : [               // current table view columns configuration
        "author",
        "title",
        "language",
        "date_freeform",
        "uploaded_at",
        "last_edit_at"
      ],
      table_sorting : null,          // current table sorting (if any)
      busy          : false,          // Document pane in 'busy' state? (Docs loading, action onging, etc.)
      folders       : [],             // Folders
      documents     : [],             // Documents in view
      total_docs    : null,           // Total number of documents
      readme        : null,           // Current folder readme
      selection     : [],             // Selected items (folders and documents)
      fileUploads   : [],             // Files currently uploading
      urlUpload     : null,           // URLs currently uploading/registering
      announcement  : null
    };

    Object.assign(state, StoredUIState.load());
    this.state = state;

    this._root = document.getElementById('app');

    this.onKeydown = this.onKeydown.bind(this);
    this.onMousedown = this.onMousedown.bind(this);

    window.onhashchange = this.changeFolder.bind(this);
  }

  /** Clear selection on ESC key **/
  onKeydown(evt) {
    if (evt.which === 27) this.setState({ selection: [] });
  }

  /** Clear selection on click ouside the document pane **/
  onMousedown(evt) {
    const isClickOutside = !(
      document.querySelector('.documents-pane').contains(evt.target) ||
      document.querySelector('.subheader-icons').contains(evt.target)
    );

    if (isClickOutside) this.setState({ selection: [] });
  }

  componentDidMount() {
    this._root.addEventListener('keydown', this.onKeydown, false);
    this._root.addEventListener('mousedown', this.onMousedown, false);

    this.fetchAccountData();
    this.refreshCurrentView();
    
    API.latestAnnouncement().then(result => {
      this.setState({ announcement: result.data });
    })
  }

  componentWillUnmount() {
    this._root.removeEventListener('keydown', this.onKeydown, false);
    this._root.removeEventListener('mousedown', this.onMousedown, false);
  }

  getDisplayConfig() {
    if (this.state.presentation === 'GRID')
      return; // No configs for grid view

    return {
      columns: Columns.expandAggregatedColumns(this.state.table_columns),
      sort: this.state.table_sorting
    };
  }

  fetchAccountData() {
    return API.accountData().then(result => { this.setState({ account: result.data }) });
  }

  fetchMyDocuments() {
    this.setState({ busy: true });
    const currentFolderId = document.location.hash.substring(1);
    return API.myDocuments(this.getDisplayConfig(), currentFolderId).then(result => {
      this.setState({
        breadcrumbs: result.data.breadcrumbs,
        readme: result.data.readme,
        documents: result.data.items, 
        total_docs: result.data.total,
        busy: false 
      });
    });
  }

  fetchSharedWithMe() {
    this.setState({ busy: true });
    return API.sharedWithMe(this.getDisplayConfig()).then(result => { 
      this.setState({
        breadcrumbs: [],
        documents: result.data.items, 
        total_docs: result.data.total,
        busy: false 
      }) 
    });
  }

  /** Switch between different document views (currently: 'my' vs. 'shared') **/
  changeView(view) {
    if (this.state.view !== view) {
      StoredUIState.save('view', view);

      this.setState({
        view: view,
        documents:[]
      }, () => {
        (view === 'MY_DOCUMENTS') ? this.fetchMyDocuments() : this.fetchSharedWithMe();
      });
    }
  }

  /** Reloads the current view from the API */
  refreshCurrentView() {
    if (this.state.view === 'MY_DOCUMENTS')
      return this.fetchMyDocuments();
    else 
      return this.fetchSharedWithMe();
  }

  changeFolder() {
    this.setState({ selection: [] });
    this.refreshCurrentView();
  }

  /** Toggles the view presentation (table vs. grid) **/
  togglePresentation() {
    this.setState(before => { 
      const p = (before.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      StoredUIState.save('presentation', p);
      return { presentation: p };
    });
  }

  onChangeColumnPrefs(columns) {
    StoredUIState.save('table_columns', columns);
    this.setState({ table_columns: columns }, () => {
      this.refreshCurrentView();
    });
  }
  
  onSortTable(sorting) {
    StoredUIState.save('table_sorting', sorting);
    this.setState({ table_sorting: sorting }, () => {
      this.refreshCurrentView();
    });
  }

  /** File selection **/
  onSelect(selection) {
    this.setState({ selection: selection });
  }

  onRenameFolder(folder, title) {
    API.renameFolder(folder.id, title)
       .then(() => this.refreshCurrentView());
  }

  createReadme() {
    this.setState({ readme: true });
  }

  onUpdateReadme(readme) {
    const currentFolderId = document.location.hash.substring(1);
    API.updateReadme(readme, currentFolderId)
       .then(this.setState({ readme: readme }));
  }

  onDeleteReadme() {
    const currentFolderId = document.location.hash.substring(1);
    API.deleteReadme(currentFolderId)
       .then(this.setState({ readme: null })); 
  }

  /** File upload **/
  startUpload(files) {
    this.setState({ 
      fileUploads: files, 
      urlUpload: null
    });
  }

  /** Remote file registration (IIIF, CTS) **/
  startRegisterRemoteSource(url) {
    this.setState({ 
      fileUploads: [],
      urlUpload: url
    });
  } 

  onUploadComplete() {
    this.setState({ 
      view: 'MY_DOCUMENTS', // Force view back to 'My Documents'
      fileUploads: [], 
      urlUpload: null 
    }, () => {
      this.refreshCurrentView()
        .then(this.fetchAccountData.bind(this));
    });
  }

  setBusy(busy) {
    this.setState({ busy: busy });
  }

  afterAction() {
    this.refreshCurrentView()
      .then(() => this.setState({ busy: false, selection: []}))
      .then(this.fetchAccountData.bind(this));
  }

  render() {
    const isUploading = this.state.fileUploads.length > 0 || this.state.urlUpload;

    return(
      <React.Fragment>
        <Sidebar
          account={this.state.account}
          onFolderCreated={this.refreshCurrentView.bind(this)}
          onUploadFiles={this.startUpload.bind(this)}
          currentView={this.state.view}
          onChangeView={this.changeView.bind(this)} 
          onCreateFromSource={this.startRegisterRemoteSource.bind(this)} />

        <div className="container">
          <Header
            view={this.state.view}
            breadcrumbs={this.state.breadcrumbs}
            readme={this.state.readme}
            docCount={this.state.total_docs}
            selection={this.state.selection}
            presentation={this.state.presentation}
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
    )
  }

}

render(<App />, document.getElementById('app'));
