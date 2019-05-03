import React, { Component } from 'react';
import axios from 'axios';

export default class PublicAccess extends Component {

  state = {
    visibility: 'PRIVATE',
    access_level: 'READ_ALL'
  }

  componentDidMount() {
    axios.get(`/api/sharing/folders/${this.props.item.id}/visibility`)
      .then(result => {
        const { visibility, access_level } = result.data;
        this.setState({ visibility: visibility, access_level: access_level || 'READ_ALL' });
      });
  }

  updateSetting = (update) => {
    this.setState(update, () => {
      axios.post('/api/sharing/folders/visibility', {
        ...this.state, ids: [ this.props.item.id ]
      }).catch(error => {
        // TODO 
      });
    });
  }

  onChangeVisibility = (visibility) => {
    this.updateSetting({ visibility: visibility });
  }

  onChangeAccessLevel = (evt) => {
    this.updateSetting({ access_level: evt.target.value });
  }

  render() {
    return (
      <div className="public-access">
        <div className="multi-share-section">
          <h3>Enable Public Access</h3>
          <div>
            <input 
              type="radio" 
              name="public-access" id="pa-off"
              checked={this.state.visibility === 'PRIVATE'} 
              onChange={() => this.onChangeVisibility('PRIVATE')} />
            <label htmlFor="pa-off">Off</label>
            <p>
              Only people you explicitly add as collaborators have access.
            </p>
          </div>

          <div>
            <input 
              type="radio" 
              name="public-access" 
              id="pa-public" 
              checked={this.state.visibility === 'PUBLIC'} 
              onChange={() => this.onChangeVisibility('PUBLIC')} />
            <label htmlFor="pa-public">Anyone on the Web</label>
            <p>
              Public documents are listed on your profile page, and anyone on the Internet can find them.
            </p>
          </div>

          <div>
            <input 
              type="radio"
              name="public-access" 
              id="pa-with-link" 
              checked={this.state.visibility === 'WITH_LINK'} 
              onChange={() => this.onChangeVisibility('WITH_LINK')} />
            <label htmlFor="pa-with-link">Anyone with the Link</label>
            <p>
              Accessible to anyone who has the link, but it is not listed on your profile page.
            </p>
          </div>
        </div>

        <div className="multi-share-section">
          <strong>Access:</strong> anyone can

          <select value={this.state.access_level} onChange={this.onChangeAccessLevel}>
            <option value="READ_ALL">view</option>
            <option value="READ_DATA">view map and downloads but not document content</option>
            <option value="WRITE">annotate</option>
          </select>

          <p>
            Annotating requires a Recogito account. Visitors who are not logged in can view
            documents (if enabled), and download annotations from the download page. But 
            they cannot add annotations, even when public annotation is enabled. Blocking 
            access to document content will also limit some of the download options.
          </p>
        </div>
      </div>
    )
  }

}
