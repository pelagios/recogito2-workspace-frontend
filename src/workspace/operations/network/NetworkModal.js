import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../../../common/Modal';

const NetworkTreeNode = props => {

  return (
    <li>
      <a className={props.selected === props.id ? 'selected' : ''}>
        { props.owner }/{ props.id }
      </a>
      { props.children && 
        <ul>
          { props.children.map(doc => <NetworkTreeNode key={doc.id} selected={props.selected} {...doc} />) }
        </ul>
      }
    </li>
  );

}

export default class NetworkModal extends Component {

  state = {
    network: null
  }

  componentDidMount() {
    // Assuming a single-document selection, enforced through the menu component
    const docId = this.props.selection.get(0).id;

    axios.get(`/api/document/${docId}/network`)
      .then(response => this.setState({ network: response.data }));

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
              <NetworkTreeNode {...this.state.network} selected={this.props.selection.get(0).id} />
            </ul>
          }
        </div>
      </Modal>
    )
  }

}
