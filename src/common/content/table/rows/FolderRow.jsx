import React, { Component } from 'react';

export default class FolderRow extends Component {

  render() {
    return (
      <div
        style={this.props.style}
        className={`row folder${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}>

        <a href={`#${this.props.item.id}`} 
           className="folder-title">{this.props.item.title}</a>

        <span className="type icon">&#xf07b;</span>
      </div>
    )
  }

}
