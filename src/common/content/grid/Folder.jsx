import React, { Component } from 'react';

export default class Folder extends Component {

  render() {
    return (
      <a href={`#${this.props.id}`} 
        className={`cell${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}>

        <div className="inner">
          <div className="item-wrapper">
            <div className="folder">
              <div className="label">
                {this.props.title}
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

}
