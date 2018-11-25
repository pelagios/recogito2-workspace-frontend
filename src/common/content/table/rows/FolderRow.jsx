import React, { Component } from 'react';
import ContentEditable from "react-sane-contenteditable";

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
    this.setState({ editable: true });
    evt.preventDefault();
  }

  onChange(_, value) {
    this.setState({ title: value });
  }

  onKeyPress(evt) {
    if (evt.which === 13)
      this.props.onRename(this.props.item, this.state.title);
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
            <ContentEditable 
              tagName="span"
              content={this.state.title}
              editable={true}
              multiLine={false}
              onClick={e => e.preventDefault()}
              onChange={this.onChange.bind(this)}
              onKeyDown={this.onKeyPress.bind(this)} />
          : <span onClick={this.makeEditable.bind(this)} >{this.state.title}</span> }
        </span>

        <span className="type icon">&#xf07b;</span>
      </a>
    )
  }

}
