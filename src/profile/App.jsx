import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import API from '../common/API.js';

import DocumentsPane from './documents/DocumentsPane.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      account : null
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

        <DocumentsPane />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
