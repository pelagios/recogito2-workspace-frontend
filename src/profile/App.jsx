import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../common/API.js';

import TablePane from '../common/content/table/TablePane.jsx';
import Breadcrumbs from '../common/content/Breadcrumbs.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      account : null,
      table_columns : [
        "author",
        "title",
        "language",
        "date_freeform",
        "uploaded_at",
        "last_edit_at"
      ],
      table_sorting : null,
      busy          : false
    }
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  fetchAccountData() {
    return API.accountData().then(result => { this.setState({ account: result.data }) });
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />

        <Sidebar 
          account={this.state.account}/>

        <div className="container">
          <Breadcrumbs label="Public Documents" />

          <TablePane
            folders={[]}
            documents={[]}
            columns={this.state.table_columns}
            sorting={this.state.table_sorting}
            busy={this.state.busy} />
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
