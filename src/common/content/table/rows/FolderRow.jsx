import React, { Component } from 'react';

export default class FolderRow extends Component {

  render() {
    return (
      <div
        style={this.props.style}
        className="row folder">
        <a href="#" className="folder-title">{this.props.title}</a>
        <span className="type icon">&#xf07b;</span>
      </div>
    )
  }

}
