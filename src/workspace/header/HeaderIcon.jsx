import React, { Component } from 'react';

export default class HeaderIcon extends Component {

  render() {
    return (
      <div
        className={`header-icon ${this.props.className}`}
        onClick={this.props.onClick}>
        {(this.props.link) ? 
          <a href={this.props.link} className="icon inner">
            {this.props.icon}
          </a> :

          <span className="icon inner">
            {this.props.icon}
          </span>
        }
      </div>
    )
  }

}
