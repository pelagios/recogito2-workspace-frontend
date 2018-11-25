import React, { Component } from 'react';
import ContentEditable from "react-sane-contenteditable";

export default class FolderRow extends Component {

  constructor(props) {
    super(props);
    this.state = { title: this.props.item.title }
  }

  componentWillReceiveProps(next) {
    this.setState({ title: next.item.title });
  }

  makeEditable(evt) {
    this.setState({ editable: true });
    evt.preventDefault();
  }

  onChange(evt, value) {
    this.setState({ title: value });
  }

  onKeyPress(evt) {
    if (evt.which === 13)
      this.props.onRename(this.props.item, this.state.title);
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={`row folder${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}>

        <ContentEditable 
          tagName="a"
          href={`#${this.props.item.id}`} 
          className="folder-title"
          content={this.state.title}
          editable={this.state.editable}
          multiLine={false}
          onChange={this.onChange.bind(this)}
          onClick={this.makeEditable.bind(this)} 
          onKeyDown={this.onKeyPress.bind(this)} />

        <span className="type icon">&#xf07b;</span>
      </div>
    )
  }

}
