import React, { Component } from 'react';

import HeaderIcon from './HeaderIcon';
import Search from './search/Search';

export default class Header extends Component {

  state = {
    optionMenuVisible: false
  }

  render() {
    return (
      <div className={this.props.readme ? "header" : "header no-readme"}>
        <div className="top-row">
          <Search
            tableConfig={this.props.tableConfig} 
            onResponse={this.props.onSearchResponse} />

          <div className="header-icons">
            <HeaderIcon icon="&#xe64a;" className="help stroke7" link="/help" />
          </div>
        </div>
      </div>
    )
  }

}