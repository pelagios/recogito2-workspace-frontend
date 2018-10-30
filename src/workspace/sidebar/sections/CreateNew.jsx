import React, { Component } from 'react';

import MenuPopup from '../../../common/components/MenuPopup.jsx';

export default class CreateNew extends Component {

  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

  onShowOptions() {
    this.setState({ menuVisible: true });
  }

  onSelectOption(option) {
    this.setState({ menuVisible: false });

    if (option == 'FILE') this._input.click();
  }

  onUploadFiles(evt) {
    const files = Array.from(evt.target.files);
    this.props.onUploadFiles(files);
  }

  onCancel() {
    this.setState({ menuVisible: false });
  }

  render() {
    return (
      <div className="section create-new">
        <button
          className="btn create-new"
          onClick={this.onShowOptions.bind(this)}>
          <span className="icon">&#xf067;</span>
          <span className="label">New</span>
        </button>
        <input
          ref={c => this._input = c}
          type="file"
          name="file"
          multiple
          onChange={this.onUploadFiles.bind(this)}
          style={{ display: 'none' }} />

        {this.state.menuVisible &&
          <MenuPopup
            className="create-new"
            menu={[
              { group: 'local', options: [
                { icon: '\uf07b', label: 'Folder', value: 'FOLDER', disabled: true },
                { icon: '\uf15b', label: 'File upload', value: 'FILE' }
              ]},

              { group: 'remote', options: [
                { icon: '\uf0c1', label: 'From IIIF manifest', value: 'IIIF', disabled: true },
                { icon: '\uf121', label: 'From CTS service', value: 'CTS', disabled: true }
              ]}
            ]}
            onSelect={this.onSelectOption.bind(this)}
            onCancel={this.onCancel.bind(this)} />
        }
      </div>
    )
  }

}
