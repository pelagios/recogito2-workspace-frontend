import React, { Component } from 'react';

export default class Document extends Component {

  render() {
    const type = this.props.filetypes[0]; // TODO make more clever in the future
    const isStacked = this.props.fileCount > 1;

    return (
      <div
        className={`cell${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick} >
        
        <div className="inner">
          <div className={`item-wrapper${isStacked ? ' stacked' : ''}`}>
            { isStacked && <div className="stack" /> }
            <a href={`document/${this.props.id}/part/1/edit`} className={`document ${type}`}>
              <div className="label">
                {this.props.title}
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

}
