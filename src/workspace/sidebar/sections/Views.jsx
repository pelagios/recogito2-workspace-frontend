import React, { Component } from 'react';

class ViewListItem extends Component {

  render() {
    return (
      <li
        className={this.props.current ? 'current' : null}
        onClick={this.props.onClick}>
        <span className="icon">{this.props.icon}</span> {
          this.props.children
        } {this.props.count != null &&
          <span className="doc-count badge">{this.props.count}</span>
        }
      </li>
    )
  }

}

export default class ViewList extends Component {

  render() {
    const dataAvailable = this.props.account && this.props.account.documents;

    return (
      <div className="sidebar-section views">
        <ul>
          <ViewListItem
            icon="&#xf2be;"
            count={dataAvailable && this.props.account.documents.my_documents}
            current={this.props.currentView == 'MY_DOCUMENTS'}
            onClick={this.props.onChangeView.bind(this, 'MY_DOCUMENTS')}>
            My Documents
          </ViewListItem>

          <ViewListItem
            icon="&#xf064;"
            count={dataAvailable && this.props.account.documents.shared_with_me}
            current={this.props.currentView == 'SHARED_WITH_ME'}
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
