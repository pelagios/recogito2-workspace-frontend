import React, { Component } from 'react';
import axios from 'axios';

import AdvancedSearch from './AdvancedSearch.jsx';

const SCOPE_NAMES = {
  MY_DOCUMENTS   : 'my',
  SHARED_WITH_ME : 'shared'
} 

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      advancedSearchOpen: false 
    };
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
    if (evt.which === 27 && this.props.searchScope) {
      this.setState({ query: '' });
      this.props.onQuit();
    }
  }

  toggleAdvancedSearch = () => {
    this.setState(prev => ({ 
      advancedSearchOpen: !prev.advancedSearchOpen,
      query: ''
    }));
  }

  executeSearch = args => {
    const data = {
      ...args,
      ...this.props.tableConfig
    };

    axios.post('/api/search', data).then(result => {
      this.props.onResponse(result.data);
    });
  }

  onSearch = evt => {
    const query = evt.target.value;
    this.setState({ query: query });

    if (query.length === 0) {
      this.props.onQuit();
    } else if (query.length > 1) {
      const scope = this.props.searchScope ? 
        this.props.searchScope : this.props.view;

      this.executeSearch({
        q: query,
        in: SCOPE_NAMES[scope]
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
              value={this.state.query}
              onChange={this.onSearch} />
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
