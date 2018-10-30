import React, { Component } from 'react';

const VIEW_LABELS = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

export default class Breadcrumbs extends Component {

  render() {
    const label = (this.props.view) ? VIEW_LABELS[this.props.view] : this.props.label;
    return (
      <div className="breadcrumbs">
        <h2>{label}</h2>
      </div>
    )
  }

}
