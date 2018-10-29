import React, { Component } from 'react';

const VIEW_LABELS = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

export default class Breadcrumbs extends Component {

  render() {
    return (
      <div className="breadcrumbs">
        <h2>{VIEW_LABELS[this.props.view]}</h2>
      </div>
    )
  }

}
