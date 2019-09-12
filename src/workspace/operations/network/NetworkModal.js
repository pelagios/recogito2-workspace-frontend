import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../../../common/Modal';
import { prompt } from '../prompt';

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

  merge = () => {
    const executeMerge = () => {
      axios.post(`/api/document/${this.props.selected}/merge?from=${this.props.id}`)
        .then(response => this.props.onMergeComplete());

      // TODO handle errors
    }

    const message = 
      `This operation will merge annotations from both documents, potentially overwriting 
       edits you have made. Are you sure you want to do this?`;

    prompt({
      title: 'Merge Annotations',
      message: message,
      type: 'WARNING',
      onConfirm: executeMerge
    });
  }

  render() {
    const { feature_toggles} = this.props.account;
    const isSelected = this.props.selected === this.props.id;

    return (
      <li>
        <span className={isSelected ? 'selected doc-id' : 'doc-id'}>
          <a href={`/${this.props.owner}`}>
            { this.props.owner }
          </a> / <a href={`/document/${this.props.id}`}>
            { this.props.id }
          </a>
        </span>
        { this.state.edits_since > 0 && 
          <>
            <span className="edits-since">+ {this.state.edits_since} edits</span>
            { feature_toggles && feature_toggles.includes('merge-documents') && !isSelected &&
              <button className="merge btn tiny" onClick={this.merge}>Merge Annotations</button> 
            }
          </>
        }
        { this.props.children && 
          <ul>
            { this.props.children.map(doc => 
              <NetworkTreeNode 
                key={doc.id} 
                account={this.props.account}
                selected={this.props.selected} 
                onMergeComplete={this.props.onMergeComplete}
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
                account={this.props.account}
                {...this.state.network.root} 
                selected={this.props.selection.get(0).id} 
                onMergeComplete={this.props.onMergeComplete} />
            </ul>
          }
        </div>
      </Modal>
    )
  }

}
