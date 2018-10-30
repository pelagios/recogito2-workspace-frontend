import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../common/API.js';

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
      account : null,
      presentation  : 'TABLE',
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

  onTogglePresentation(presentation) {
    this.setState(before => { 
      const p = (before.presentation == 'TABLE') ? 'GRID' : 'TABLE';
      return { presentation: p };
    });
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />

        <Sidebar 
          account={this.state.account}/>

        <div className="container">
          <Breadcrumbs label="Public Documents" />

          <HeaderIcon
            className="presentation-toggle stroke7"
            icon={(this.state.presentation == 'TABLE') ? '\ue645' : '\ue636'} 
            onClick={this.onTogglePresentation.bind(this)} />

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
