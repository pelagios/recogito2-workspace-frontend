import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios';

export default class UserSearch extends Component {

  state = {
    isLoading: false,
    options: [],
    selected: null,
    inputValue: null
  }

  fetchSuggestions = query => {
    this.setState({isLoading: true});
    const exclude = this.props.exclude ? this.props.exclude : [];
    axios.get(`/api/sharing/search?q=${query}`)
      .then(result => this.setState({
        isLoading: false,
        options: result.data.filter(username => !exclude.includes(username))
      }));
  }

  onChange = (selected) => {
    this.setState({ selected: selected });
  }

  onInputChange = (value) => {
    this.setState({ inputValue: value });
  }

  clear = () => {
    this._input.getInstance().clear();
    this.setState({ 
      selected: null,
      inputValue: null
    });
  }

  onKeyDown = (evt) => {
    const { selected, inputValue, options } = this.state;
    if (evt.which === 13) { // Enter
      if (selected && selected.length === 1)
        this.props.onSelect(selected[0]);
      else if (inputValue && options.includes(inputValue))
        this.props.onSelect(inputValue);
    }
  }

  render() {
    return (
      <AsyncTypeahead
        id="typeahead"
        ref={r => this._input = r}
        className="user-search"
        placeholder="Enter username"
        selected={this.state.selected}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        onKeyDown={this.onKeyDown}
        isLoading={this.state.isLoading}
        onSearch={this.fetchSuggestions} 
        options={this.state.options} />
    )
  }

}