import React, { Component } from 'react';

import TopBar from './top/TopBar.jsx';

import '../public/style/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
      </div>
    );
  }
}
