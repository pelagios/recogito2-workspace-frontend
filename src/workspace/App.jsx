import React, { Component } from 'react';
import { render } from 'react-dom';

import API from './common/API.js';
import { Columns } from './documents/table/Columns.js';
import GridPane from './documents/grid/GridPane.jsx';
import Header from './header/Header.jsx';
import TablePane from './documents/table/TablePane.jsx';
import Readme from './documents/Readme.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import StoredUIState from './StoredUIState.js';
import Uploader from './upload/Uploader.jsx';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    const state = {
      account       : null,           // account info
      view          : 'MY_DOCUMENTS', // view, as selected in sidebar (My Documents, Shared, Recent)
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
      documents     : [],             // Documents
      readme        : null,           // Current folder readme
      selection     : [],             // Selected items (folders and documents)
      fileUploads   : [],             // Files currently uploading
      urlUpload     : null            // URLs currently uploading/registering
    };

    Object.assign(state, StoredUIState.load());
    this.state = state;

    this._root = document.getElementById('app');

    this.onKeydown = this.onKeydown.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
  }

  /** Clear selection on ESC key **/
  onKeydown(evt) {
    if (evt.which == 27) this.setState({ selection: [] });
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
  }

  componentWillUnmount() {
    this._root.removeEventListener('keydown', this.onKeydown, false);
    this._root.removeEventListener('mousedown', this.onMousedown, false);
  }

  getDisplayConfig() {
    if (this.state.presentation == 'GRID')
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
    return API.myDocuments(this.getDisplayConfig()).then(result => {
      this.setState({
        documents: result.data.items, 
        busy: false 
      });
    });
  }

  fetchSharedWithMe() {
    this.setState({ busy: true });
    return API.sharedWithMe(this.getDisplayConfig()).then(result => { 
      this.setState({
        documents: result.data.items, 
        busy: false 
      }) 
    });
  }

  /** Switch between different document views (currently: 'my' vs. 'shared') **/
  changeView(view) {
    if (this.state.view != view) {
      StoredUIState.save('view', view);

      this.setState({
        view: view,
        documents:[]
      }, () => {
        (view == 'MY_DOCUMENTS') ? this.fetchMyDocuments() : this.fetchSharedWithMe();
      });
    }
  }

  /** Reloads the current view from the API */
  refreshCurrentView() {
    if (this.state.view == 'MY_DOCUMENTS')
      return this.fetchMyDocuments();
    else 
      return this.fetchSharedWithMe();
  }

  /** Toggles the view presentation (table vs. grid) **/
  togglePresentation() {
    this.setState(before => { 
      const p = (before.presentation == 'TABLE') ? 'GRID' : 'TABLE';
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
    this.setState({ fileUploads: [], urlUpload: null }, () => {
      this.refreshCurrentView()
        .then(this.fetchAccountData.bind(this));
    });
  }

  setBusy(busy) {
    this.setState({ busy: busy });
  }

  afterDelete() {
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
          onUploadFiles={this.startUpload.bind(this)}
          currentView={this.state.view}
          onChangeView={this.changeView.bind(this)} />

        <div className="container">
          <Header
            view={this.state.view}
            selection={this.state.selection}
            presentation={this.state.presentation}
            onDelete={this.setBusy.bind(this, true)}
            afterDelete={this.afterDelete.bind(this)}
            onTogglePresentation={this.togglePresentation.bind(this)} />

          {this.state.presentation == 'TABLE' ?
            <TablePane
              folders={this.state.folders}
              documents={this.state.documents}
              columns={this.state.table_columns}
              sorting={this.state.table_sorting}
              busy={this.state.busy}
              selection={this.state.selection}
              onSort={this.onSortTable.bind(this)}
              onSelect={this.onSelect.bind(this)} 
              onDropFiles={this.startUpload.bind(this)} 
              onDropURL={this.startRegisterRemoteSource.bind(this)} 
              onChangeColumnPrefs={this.onChangeColumnPrefs.bind(this)} >

              {this.state.readme && <Readme>{this.state.readme}</Readme> }
            </TablePane>
            :
            <GridPane
              folders={this.state.folders}
              documents={this.state.documents}
              busy={this.state.busy}
              selection={this.state.selection}
              onSelect={this.onSelect.bind(this)} 
              onDropFiles={this.startUpload.bind(this)}
              onDropURL={this.startRegisterRemoteSource.bind(this)} >
              
              {this.state.readme && 
                <Readme>{this.state.readme}</Readme> }
            </GridPane>
          }
        </div>

        { isUploading && 
          <Uploader
            files={this.state.fileUploads} 
            url={this.state.urlUpload}
            onUploadComplete={this.onUploadComplete.bind(this)} /> 
        }
      </React.Fragment>
    )
  }

}

render(<App />, document.getElementById('app'));
