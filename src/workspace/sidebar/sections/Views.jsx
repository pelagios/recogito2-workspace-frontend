import React, { Component } from 'react';

class ViewListItem extends Component {

  render() {
    return (
      <li
        className={this.props.current ? 'current' : null}
        onClick={this.props.onClick}>
        <span className="icon">{this.props.icon}</span> {
          this.props.children
        }
      </li>
    )
  }

}

export default class ViewList extends Component {

  render() {
    return (
      <div className="section views">
        <ul>
          <ViewListItem
            icon="&#xf2be;"
            current={this.props.currentView === 'MY_DOCUMENTS'}
            onClick={this.props.onChangeView.bind(this, 'MY_DOCUMENTS')}>
            My Documents
          </ViewListItem>

          <ViewListItem
            icon="&#xf064;"
            current={this.props.currentView === 'SHARED_WITH_ME'}
            onClick={this.props.onChangeView.bind(this, 'SHARED_WITH_ME')}>
            Shared with me
          </ViewListItem>

          {/* <ViewListItem
            icon="&#xf017;"
            current={this.props.currentView == 'RECENT'}
            onClick={this.props.onChangeView.bind(this, 'RECENT')}>
            Recent
          </ViewListItem> */}
        </ul>
      </div>
    )
  }

}
