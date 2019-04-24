import React, { Component } from 'react';

import Breadcrumbs from './Breadcrumbs';
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

        <div className="main-header">
          <Breadcrumbs 
            view={this.props.view}
            path={this.props.breadcrumbs}
            docCount={this.props.docCount}>

            {!this.props.readme && this.props.view === 'MY_DOCUMENTS' &&
              <button 
                className="add-abstract nostyle"
                onClick={this.props.onCreateReadme} >
                <span className="icon">&#xf055;</span>
                <span className="label">Add a description...</span>
              </button>
            }
          </Breadcrumbs>

          <div className="main-header-icons">
            <HeaderIcon
              className="presentation-toggle stroke7"
              icon={this.props.presentation === 'TABLE' ? '\ue645' : '\ue636'} 
              onClick={this.props.onTogglePresentation} />
          </div>
        </div>
      </div>
    )
  }

}