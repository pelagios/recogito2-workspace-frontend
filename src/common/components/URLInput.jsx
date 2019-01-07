import React, { Component } from 'react';

export default class URLInput extends Component {

  state = {
    value: this.props.value || ''
  }

  handleChange = (evt) => {
    this.setState({ value: evt.target.value });
  }

  handleDrop = (evt) => {
    const url = evt.dataTransfer.getData('text');
    this.setState({ value: url });
  }

  handleKeyPress = (evt) => {
    if (evt.which === 13) // Enter
      this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  render() {
    const placeholder = this.props.placeholder || 'Paste or drag URL';

    return (
      <input 
        type="text" 
        className="url-input"
        value={this.state.value}
        placeholder={placeholder} 
        onChange={this.handleChange}
        onDrop={this.handleDrop}
        onKeyPress={this.handleKeyPress} />
    )
  }

}