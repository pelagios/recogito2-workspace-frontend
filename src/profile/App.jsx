import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DocumentsPane from './documents/DocumentsPane.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';

import '../../assets/style/profile/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <TopBar />
        <Sidebar />
        <DocumentsPane />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
