import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios';

export default class AutoComplete extends Component {

  state = {
    isLoading: false,
    options: []
  }

  fetchSuggestions = query => {
    this.setState({isLoading: true});
    axios.get(`/document/random/settings/collaborator/search?q=${query}`)
      .then(result => this.setState({
        isLoading: false,
        options: result.data
      }));
  }

  render() {
    return (
      <AsyncTypeahead
        className="autocomplete"
        isLoading={this.state.isLoading}
        onSearch={this.fetchSuggestions} 
        options={this.state.options} />
    )
  }

}