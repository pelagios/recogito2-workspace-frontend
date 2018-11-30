import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from './API.js';

import GridPane from '../common/content/grid/GridPane.jsx';
import TablePane from '../common/content/table/TablePane.jsx';
import Breadcrumbs from '../common/content/Breadcrumbs.jsx';
import HeaderIcon from '../common/content/HeaderIcon.jsx';
import Readme from '../common/content/Readme.jsx';
import StoredUIState from '../common/StoredUIState.js';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';
import { Columns } from '../common/content/table/Columns.js';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    const state = {
      me             : null, // Login identity
      visitedAccount : null,
      presentation   : 'TABLE',
      table_columns  : [
        "author",
        "title",
        "language",
        "date_freeform",
        "uploaded_at",
        "last_edit_at"
      ],
      table_sorting  : null,
      busy           : false,
      documents      : null, // Can be null (not loaded yet) or [] (no shared documents)
      total_docs     : null,
      readme        : null
    }

    Object.assign(state, StoredUIState.load());
    this.state = state;

    this._profileOwner = (process.env.NODE_ENV === 'development') ? 'rainer' : window.location.pathname.substring(1);
  }

  componentDidMount() {
    API
      .fetchPublicAccountInfo(this._profileOwner)
      .then(r => this.setState({ visitedAccount: r.data }));

    API
      .fetchLoginStatus()
      .then(r => this.setState({ me: r.data })); 

    this.reloadDocuments();
  }

  reloadDocuments() {
    API
      .fetchAccessibleDocuments(this._profileOwner, this.getDisplayConfig())
      .then(r => this.setState({ 
        readme: r.data.readme,
        documents: r.data.items,
        total_docs: r.data.total
      }));
  }

  getDisplayConfig() {
    if (this.state.presentation === 'GRID')
      return; // No configs for grid view

    return {
      columns: Columns.expandAggregatedColumns(this.state.table_columns),
      sort: this.state.table_sorting
    };
  }

  onTogglePresentation(presentation) {
    this.setState(before => { 
      const p = (before.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      StoredUIState.save('presentation', p);
      return { presentation: p };
    });
  }

  onChangeColumnPrefs(columns) {
    StoredUIState.save('table_columns', columns);
    this.setState({ table_columns: columns }, () => {
      this.reloadDocuments();
    });
  }
  
  onSortTable(sorting) {
    StoredUIState.save('table_sorting', sorting);
    this.setState({ table_sorting: sorting }, () => {
      this.reloadDocuments();
    });
  }

  render() {
    const documents = this.state.documents || [];

    return (
      <React.Fragment>
        <TopBar 
          me={this.state.me} />

        <Sidebar 
          account={this.state.visitedAccount}/>

        <div className="container">
          <Breadcrumbs
            label="Public Documents" 
            count={this.state.total_docs} />

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
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
