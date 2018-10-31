import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from './API.js';

import GridPane from '../common/content/grid/GridPane.jsx';
import TablePane from '../common/content/table/TablePane.jsx';
import Breadcrumbs from '../common/content/Breadcrumbs.jsx';
import HeaderIcon from '../common/content/HeaderIcon.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      documents      : null // Can be null (not loaded yet) or [] (no shared documents)
    }

    this._profileOwner = 'pelagios3'; // window.location.pathname.substring(1);
  }

  componentDidMount() {
    API
      .fetchPublicAccountInfo(this._profileOwner)
      .then(r => this.setState({ visitedAccount: r.data }));

    API
      .fetchLoginStatus()
      .then(r => this.setState({ me: r.data })); 
  }

  onTogglePresentation(presentation) {
    this.setState(before => { 
      const p = (before.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      return { presentation: p };
    });
  }

  render() {
    return (
      <React.Fragment>
        <TopBar 
          me={this.state.me} />

        <Sidebar 
          account={this.state.visitedAccount}/>

        <div className="container">
          <Breadcrumbs label="Public Documents" />

          <HeaderIcon
            className="presentation-toggle stroke7"
            icon={(this.state.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
            onClick={this.onTogglePresentation.bind(this)} />

          { this.state.documents && (
              
              this.state.documents.length === 0 ? 
                <div className="no-public-documents">
                  {this.state.visitedAccount.username} has not shared any documents yet
                </div> :

                this.state.presentation === 'TABLE' ?
                  <TablePane
                    folders={[]}
                    documents={this.state.documents}
                    columns={this.state.table_columns}
                    sorting={this.state.table_sorting}
                    busy={this.state.busy} 
                    disableFiledrop={true} /> 
                  :
                  <GridPane
                    folders={[]}
                    documents={this.state.documents}
                    busy={this.state.busy} 
                    disableFiledrop={true} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
