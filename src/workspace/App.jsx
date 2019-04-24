import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import activities from './activities';
import initialState from './initialState';
import Workspace from './Workspace';

import { Columns } from '../common/content/table/Columns';

import '../../assets/style/workspace/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = initialState;

    this._rootEl = document.getElementById('app');
    window.onhashchange = this.changeFolder;
  }

  /** Init: add deselect listeners and load contents */
  componentDidMount() {
    this._rootEl.addEventListener('keydown', this.onKeydown, false);
    this._rootEl.addEventListener(', though.mousedown', this.onMousedown, false);

    // Init account data
    axios.get('/api/account/my').then(result => { 
      this.setState({ account: result.data }) 
    });

    // this.refreshCurrentView();
    
    /*
    API.latestAnnouncement().then(result => {
      this.setState({ announcement: result.data });
    })
    */
  }

  /** Remveo deselect listeners **/
  componentWillUnmount() {
    this._rootEl.removeEventListener('keydown', this.onKeydown, false);
    this._rootEl.removeEventListener('mousedown', this.onMousedown, false);
  }

  /** Clear selection on ESC key **/
  onKeydown = (evt) => {
    // if (evt.which === 27) this.setState({ selection: [] });
  }

  /** Clear selection on click ouside the document pane **/
  onMousedown(evt) {
    /*
    const isClickOutside = !(
      document.querySelector('.documents-pane').contains(evt.target) ||
      document.querySelector('.subheader-icons').contains(evt.target)
    );

    if (isClickOutside) this.setState({ selection: [] });
    */
  }

  /** 
   * Refreshes the current page.
   * 
   * Note that this doesn't work if the view is currently SEARCH.
   */
  refreshPage = () => {
    this.setState({ busy: true });

    const folderId = document.location.hash.substring(1);

    const path = (this.state.view === 'MY_DOCUMENTS') ?
       (folderId) ? `my/${folderId}` : 'my' :
       (folderId) ? `my/shared/${folderId}` : 'my/shared';

    const config = (this.state.presentation === 'GRID') ? null :
      {
        columns: Columns.expandAggregatedColumns(this.state.table_config.columns),
        sort: this.state.table_config.sorting
      };

    return axios.post(`/api/directory/${path}`, config).then(result => {
      this.setState({
        breadcrumbs: result.data.breadcrumbs,
        readme: result.data.readme,
        documents: result.data.items, 
        total_docs: result.data.total,
        busy: false 
      });
    });
  }

  handleChangeView = (view) => {
    this.setState({ view: view });
  }


  changeFolder = () => {
    // this.setState({ selection: [] });
    // this.refreshCurrentView();
  }

  render() {
    return(
      <Workspace 
        account={this.state.account}
        view={this.state.view}
        onChangeView={this.handleChangeView}
        onCreateFolder={() => activities.createFolder().then(this.refreshPage)}
        onUploadFiles={() => activities.uploadFiles().then(this.refreshPage)}
        onImportSource={() => activities.importSource().then(this.refreshPage)}
      />
    )
  }

  /*
  /** Switch between different document views (currently: 'my' vs. 'shared') **
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

  /** Toggles the view presentation (table vs. grid) **
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

  /** File selection **
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

  /** File upload **
  startUpload(files) {
    this.setState({ 
      fileUploads: files, 
      urlUpload: null
    });
  }

  /** Remote file registration (IIIF, CTS) **
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

  /** Just a hack **
  handleSearchResponse = response => {
    this.setState({
      folders: [],
      documents: response.items
    });
  } */

}

render(<App />, document.getElementById('app'));
