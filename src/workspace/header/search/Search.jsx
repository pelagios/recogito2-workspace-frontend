import React, { Component } from 'react';
import axios from 'axios';

import AdvancedSearch from './AdvancedSearch.jsx';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { advancedSearchOpen: false };
    this._rootEl = document.getElementById('app');
  }

  componentDidMount() {
    this._rootEl.addEventListener('keydown', this.onKeydown, false);
  }

  /** Remove deselect listeners **/
  componentWillUnmount() {
    this._rootEl.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = evt => {
    if (evt.which === 27) {
      // TODO
    }
  }

  toggleAdvancedSearch = () => {
    this.setState(prev => (
      { advancedSearchOpen: !prev.advancedSearchOpen }
    ));
  }

  search = evt => {
    const query = evt.target.value;
    const data = {
      q: query,
      ...this.props.tableConfig
    }

    if (query.length > 1) {
      axios.post(`/api/search`, data).then(result => {
        this.props.onResponse(result.data);
      });
    }
  }

  advancedSearch = settings => {
    console.log(settings);
  }

  render() {
    const placeholder = this.props.view === 'MY_DOCUMENTS' ?
      'Search my workspace' : 
      this.props.view === 'SHARED_WITH_ME' ? 'Search shared documents' : '';

    return (
      <div className="wrapper">
        <div className="search">
          <div className="wrapper">
            <input
              placeholder={placeholder}
              onChange={this.search} />
            <button
              className="icon nostyle advanced"
            onClick={this.toggleAdvancedSearch.bind(this)}>{'\ue688'}</button>
          </div>
          <span className="icon hand-lens">&#xf002;</span>
        </div>
        {this.state.advancedSearchOpen &&
          <AdvancedSearch 
            account={this.props.account}
            onSearch={this.advancedSearch}
            onClose={this.toggleAdvancedSearch}/>
        }
      </div>
    )
  }

}
