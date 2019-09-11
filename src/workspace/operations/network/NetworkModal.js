import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../../../common/Modal';

class NetworkTreeNode extends Component  {

  state = {
    edits_since: null
  }

  componentDidMount() {
    const { cloned_at } = this.props; // null for root
    if (cloned_at) {
      axios.get(`/api/document/${this.props.id}/contributions/count?since=${encodeURIComponent(cloned_at)}`)
        .then(response => this.setState({ edits_since: response.data.contributions }));
    }
  }

  /*
  merge = () => {
    axios.post(`/api/document/${this.props.selected}/merge?from=${this.props.id}`)
      .then(response => {
        // TODO catch errors, close window, refresh view - all that sort of stuff
        console.log(response.data);
      });
  }
  */

  render() {
    return (
      <li>
        <span className={this.props.selected === this.props.id ? 'selected doc-id' : 'doc-id'}>
          <a href={`/${this.props.owner}`}>
            { this.props.owner }
          </a> / <a href={`/document/${this.props.id}`}>
            { this.props.id }
          </a>
        </span>
        { this.state.edits_since > 0 && <span className="edits-since">+ {this.state.edits_since} edits</span> }
        { this.props.children && 
          <ul>
            { this.props.children.map(doc => 
              <NetworkTreeNode 
                key={doc.id} 
                selected={this.props.selected} 
                {...doc} /> 
            )}
          </ul>
        }
      </li>
    )
  }

}

export default class NetworkModal extends Component {

  state = {
    network: null
  }

  componentDidMount() {
    // Assuming a single-document selection, enforced through the menu component
    const docId = this.props.selection.get(0).id;

    axios.get(`/api/document/${docId}/network`)
      .then(response => {

        this.setState({ network: response.data })
      });

    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (evt) => {
    evt.stopPropagation();
    if (evt.which === 27) this.props.onClose();
  }

  render() {
    return (
      <Modal
        className="explore-network-modal" 
        title="Explore Network"
        onClose={this.props.onClose}>
        <div className="explore-network">
          { this.state.network && 
            <ul>
              <NetworkTreeNode 
                {...this.state.network.root} 
                selected={this.props.selection.get(0).id} />
            </ul>
          }
        </div>
      </Modal>
    )
  }

}
