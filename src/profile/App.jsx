import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Columns } from '../common/documents/table/Columns';
import operations from './operations';
import { initialState, persistState } from './initialState';
import Profile from './Profile';
import Selection from '../common/documents/Selection';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = initialState();

    this._profileOwner = (process.env.NODE_ENV === 'development') ? 'foobar' : window.location.pathname.substring(1);
    this._rootEl = document.getElementById('app');

    window.onhashchange = this.refreshPage;
  }

  componentDidMount() {
    this._rootEl.addEventListener('keydown', this.onKeydown, false);
    this._rootEl.addEventListener('mousedown', this.onMousedown, false);
    
    const a = axios.get(`/api/account/${this._profileOwner}`).then(r => {
      this.setState({ visitedAccount: r.data });
    });

    const b = axios.get('/api/me').then(r => {
      this.setState({ me: r.data });
    });

    Promise.all([a, b]).then(() => this.refreshPage());
  }

  /** Remveo deselect listeners **/
  componentWillUnmount() {
    this._rootEl.removeEventListener('keydown', this.onKeydown, false);
    this._rootEl.removeEventListener('mousedown', this.onMousedown, false);
  }

  /** Clear selection on ESC key **/
  onKeydown = evt => {
    if (evt.which === 27) 
      this.setState({ selection: new Selection() });
    else if (evt.which === 46 && !this.state.selection.isEmpty())
      this.deleteSelection();
  }

  /** Clear selection on click ouside the document pane **/
  onMousedown = evt => {
    const isClickOutside = !(
      document.querySelector('.documents-pane').contains(evt.target) ||
      document.querySelector('.main-header-icons').contains(evt.target)
    );

    if (isClickOutside) this.setState({ selection: new Selection() });
  }

  refreshPage = () => {
    this.setState({ busy: true });

    const folderId = document.location.hash.substring(1);

    const path = folderId ? 
      `${this._profileOwner}/${folderId}` :
      `${this._profileOwner}`;

    const config = this.state.presentation === 'GRID' ? null :
      {
        columns: Columns.expandAggregatedColumns(this.state.table_config.columns),
        sort: this.state.table_config.sorting
      }

    return axios.post(`/api/directory/${path}`, config).then(r => {
      const { breadcrumbs, readme, total_count, items } = r.data;
      this.setState(prev => {
        return { 
          page: {
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
      })
    });
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

  sortTable = (sorting) => {
    this.setState(prev => {
      const config = { ...prev.table_config, ...{ sorting: sorting } };
      persistState('table_config', config);
      return { table_config: config };
    }, () => {
      this.refreshPage();
    });      
  }

  changeColumConfig = columns => {
    this.setState(prev => { 
      const config = {...prev.table_config, ...{ columns: columns } };
      persistState('table_config', config);
      return { table_config: config };
    });
  }

  sendMessage = () => {
    const sender = this.state.me.username;
    const recipient = this.state.visitedAccount.username;
    operations.sendMessage(sender, recipient);
  }

  forkSelection = () =>  {
    const { selection } = this.state;

    this.setState({ busy: true });

    // Currently called *ONLY* with single document selections, but just in case
    if (selection.isSingleDocument()) {
      const doc = selection.get(0);
      operations.forkDocument(doc.id).then(() => this.setState({ busy: false }));        
    }
  }

  render() {
    return (
      <Profile 
        me={this.state.me} 
        visitedAccount={this.state.visitedAccount} 
        presentation={this.state.presentation}
        page={this.state.page} 
        tableConfig={this.state.table_config}
        selection={this.state.selection}
        busy={this.state.busy} 
        onTogglePresentation={this.togglePresentation} 
        onSelect={this.select}
        onSort={this.sortTable}
        onChangeColumnConfig={this.changeColumnConfig} 
        onSendMessage={this.sendMessage}
        onFork={this.forkSelection} />
    );
  }
}

render(<App />, document.getElementById('app'));
