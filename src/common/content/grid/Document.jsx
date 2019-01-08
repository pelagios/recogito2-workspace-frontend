import React, { Component } from 'react';

export default class Document extends Component {

  render() {
    const type = this.props.filetypes[0]; // TODO make more clever in the future
    const isStacked = this.props.fileCount > 1;

    return (
      <a href={`document/${this.props.id}/part/1/edit`}
        className={`cell${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick} >
        
        <div className="inner">
          <div className={`item-wrapper${isStacked ? ' stacked' : ''}`}>
            { isStacked && <div className="stack" /> }
            <div className={`document ${type}`}>
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
