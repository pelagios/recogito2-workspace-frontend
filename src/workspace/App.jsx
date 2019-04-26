import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { Columns } from '../common/documents/table/Columns';
import { initialState, persistState } from './initialState';
import operations from './operations';
import Selection from '../common/documents/Selection';
import Workspace from './Workspace';

import '../../assets/style/workspace/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = initialState();

    this._rootEl = document.getElementById('app');
    window.onhashchange = this.changeFolder;
  }

  /** Init: add deselect listeners and load contents */
  componentDidMount() {
    this._rootEl.addEventListener('keydown', this.onKeydown, false);
    this._rootEl.addEventListener('mousedown', this.onMousedown, false);

    // Init account data
    axios.get('/api/account/my').then(result => { 
      this.setState({ account: result.data }) 
    }).then(() => {
      this.refreshPage();
    });

    // TODO clean up
    // API.latestAnnouncement().then(result => {
    //  this.setState({ announcement: result.data });
    // })
  }

  /** Remveo deselect listeners **/
  componentWillUnmount() {
    this._rootEl.removeEventListener('keydown', this.onKeydown, false);
    this._rootEl.removeEventListener('mousedown', this.onMousedown, false);
  }

  /** Clear selection on ESC key **/
  onKeydown = (evt) => {
    if (evt.which === 27) this.setState({ selection: new Selection() });
  }

  /** Clear selection on click ouside the document pane **/
  onMousedown = (evt) => {
    const isClickOutside = !(
      document.querySelector('.documents-pane').contains(evt.target) ||
      document.querySelector('.main-header-icons').contains(evt.target)
    );

    if (isClickOutside) this.setState({ selection: new Selection() });
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

  changeFolder = () => {
    this.setState({ selection: new Selection() }, () => {
      this.refreshPage();
    });
  }
  
  changeView = (view) => {
    persistState('view', view);
    this.setState({ view: view }, this.refreshPage);
  }

  togglePresentation = () => {
    this.setState(prev => { 
      const presentation = (prev.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      persistState('presentation', presentation);
      return { presentation: presentation };
    });
  }

  select = selection => {
    this.setState({ selection: selection });
  }

  changeColumConfig = columns => {
    this.setState(prev => { 
      const config = {...prev.table_config, ...{ columns: columns } } 
      persistState('table_config', config);
      return { table_config: config };
    });
  }

  createReadme = () => {
    this.setState(prev => {
      return { page: {...prev.page, ...{ readme: true }} }
    });
  }

  updateReadme = (readme) => {
    operations.updateReadme(readme, this.state.page).then(page => {
      this.setState({ page: page });
    });
  }

  deleteReadme = () => {
    operations.deleteReadme(this.state.page).then(page => {
      this.setState({ page: page });
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
        onTogglePresentation={this.togglePresentation}
        onSelect={this.select}
        onChangeColumnConfig={this.changeColumConfig}
        onCreateReadme={this.createReadme}
        onUpdateReadme={this.updateReadme}
        onDeleteReadme={this.deleteReadme}
        onCreateFolder={() => operations.createFolder().then(this.refreshPage)}
        onRenameFolder={(folder, title) => operations.renameFolder(folder, title).then(this.refreshPage)}
        onUploadFiles={() => operations.uploadFiles().then(this.refreshPage)}
        onImportSource={() => operations.importSource().then(this.refreshPage)}
      />
    )
  }

  /*  
  onSortTable(sorting) {
    StoredUIState.save('table_sorting', sorting);
    this.setState({ table_sorting: sorting }, () => {
      this.refreshCurrentView();
    });
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
  */

}

render(<App />, document.getElementById('app'));
