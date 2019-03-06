import React, { Component } from 'react';

export default class PublicAccess extends Component {

  render() {
    return (
      <div className="public-access">
        <div className="multi-share-section">
          <h3>Enable Public Access</h3>
          <div>
            <input type="radio" name="public-access" id="pa-off"/>
            <label htmlFor="pa-off">Off</label>
            <p>
              Only people you explicitly add as collaborators have access.
            </p>
          </div>

          <div>
            <input type="radio" name="public-access" id="pa-public" />
            <label htmlFor="pa-public">Anyone on the Web</label>
            <p>
              Public documents are listed on your profile page, and anyone on the Internet can find them.
            </p>
          </div>

          <div>
            <input type="radio" name="public-access" id="pa-with-link" />
            <label htmlFor="pa-with-link">Anyone with the Link</label>
            <p>
              Accessible to anyone who has the link, but it is not listed on your profile page.
            </p>
          </div>
        </div>

        <div className="multi-share-section">
          <strong>Access:</strong> anyone can
          
          <select>
            <option>view</option>
            <option>view map and downloads but not document content</option>
            <option>annotate</option>
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
