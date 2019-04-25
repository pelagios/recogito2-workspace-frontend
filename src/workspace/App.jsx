import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { Columns } from '../common/documents/table/Columns';
import initialState from './initialState';
import operations from './operations';
import Selection from '../common/documents/Selection';
import Workspace from './Workspace';

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
    }).then(() => {
      this.refreshPage();
    });

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
      this.setState(prev => {
        const { breadcrumbs, readme, total_count, items } = result.data;
        return {
          page : {
            ...prev.page,
            ...{
              breadcrumbs,
              readme,
              total_count,
              items
            }
          },
          busy: false
        } 
      });
    });
  }

  changeView = (view) => {
    this.setState({ view: view }, this.refreshPage);
  }

  onTogglePresentation = () => {
    this.setState(prev => { 
      const presentation = (prev.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      // StoredUIState.save('presentation', p);
      return { presentation: presentation };
    });
  }

  onSelect = selection => {
    this.setState({ selection: selection });
  }

  changeColumConfig = columns => {
    this.setState(prev => { 
      return { table_config: {...prev.table_config, ...{ columns: columns } }}
    });
  }

  createReadme = () => {
    this.setState(prev => {
      return {
         page: {...prev.page, ...{ readme: true }} 
      }
    });
  }

  changeFolder = () => {
    this.setState({ selection: new Selection() }, () => {
      this.refreshPage();
    });
  }

  render() {
    return(
      <Workspace 
        account={this.state.account}
        view={this.state.view}
        presentation={this.state.presentation}
        page={this.state.page}
        tableConfig={this.state.table_config}
        selection={this.state.selection}
        onChangeView={this.changeView}
        onTogglePresentation={this.onTogglePresentation}
        onSelect={this.onSelect}
        onChangeColumnConfig={this.changeColumConfig}
        onCreateReadme={this.createReadme}
        onCreateFolder={() => operations.createFolder().then(this.refreshPage)}
        onUploadFiles={() => operations.uploadFiles().then(this.refreshPage)}
        onImportSource={() => operations.importSource().then(this.refreshPage)}
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
