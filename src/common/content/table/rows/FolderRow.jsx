import React, { Component } from 'react';

export default class FolderRow extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      editable: false,
      title: this.props.item.title 
    }
  }

  componentWillReceiveProps(next) {
    this.setState({ 
      editable: false,
      title: next.item.title 
    });
  }

  makeEditable(evt) {
    this.setState({
      editable: true 
    },() => this._input.select());
    evt.preventDefault();
    evt.stopPropagation();
  }

  onChange(evt) {
    this.setState({ title: evt.target.value });
  }

  onKeyPress(evt) {
    if (evt.which === 13) {
      this.setState({ 
        editable: false
      }, () => this.props.onRename(this.props.item, this.state.title));
    }
  }

  render() {
    return (
      <a
        href={`#${this.props.item.id}`} 
        style={this.props.style}
        className={`row folder${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}>

        <span className="folder-title">
          {this.state.editable ? 
            <input 
              ref={i => this._input = i}
              value={this.state.title}
              onClick={this.makeEditable.bind(this)}
              onChange={this.onChange.bind(this)}
              onKeyDown={this.onKeyPress.bind(this)} />
          : <span
              className="editable" 
              onClick={this.makeEditable.bind(this)} >{this.state.title}</span> }
        </span>

        <span className="type icon">&#xf07b;</span>
      </a>
    )
  }

}
