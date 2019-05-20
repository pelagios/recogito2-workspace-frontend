import React, { Component } from 'react';

const INITIAL_STATE = {
  searchIn: 'ALL', // 'MY', 'SHARED'
  docType: 'ANY', // 'TEXT', 'IMAGE', 'TABLE'
  owner: '', // or username
  metadataContains: null,
  lastModified: 'ANYTIME', // 'WEEK' 
};

export default class AdvancedSearch extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }

    this.onMousedown = this.onMousedown.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMousedown, false);
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMousedown, false);
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onMousedown(evt) {
    const isClickOutside = !this._node.contains(evt.target);
    const isClickOnToggle = evt.target.classList.contains('advanced');
    if (isClickOutside && !isClickOnToggle) this.props.onClose();
  }

  onKeydown(evt) {
    if (evt.which === 27) this.props.onClose();
  }

  onChangeSearchIn = evt => this.setState({ searchIn: evt.target.value });

  onChangeDocType = evt => this.setState({ docType: evt.target.value });

  onChangeOwner = evt => this.setState({ owner: evt.target.value });

  onChangeLastModified = evt => this.setState({ lastModified: evt.target.value });

  onClear = evt => { 
    evt.preventDefault();
    this.setState({ ...INITIAL_STATE });
  }

  onSearch = evt => {
    evt.preventDefault();

    // TODO
  }

  render() {
    return (
      <div
        ref={n => this._node = n}
        className="advanced-search">
        <button
          className="close nostyle"
          onClick={this.props.onClose}>&#xe897;</button>

        <form>
          <fieldset>
            <p>
              <label>Search in</label>
              <select
                value={this.state.searchIn}
                onChange={this.onChangeSearchIn}>
                <option value="ALL">All of Recogito</option>
                <option vale="MY">My documents</option>
                <option value="SHARED">Shared with me</option>
              </select>
              <span className="hint" />
            </p>

            <p>
              <label>Document type</label>
              <select
                value={this.state.docType}
                onChange={this.onChangeDocType}>
                <option value="ANY">Any</option>
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="TABLE">Table</option>
              </select>
              <span className="hint" />
            </p>

            <p>
              <label>Owner</label>
              <select 
                value={this.state.owner}
                onChange={this.onChangeOwner}>
                <option value="">Anyone</option>
                <option value={this.props.account.username}>me</option>
              </select>
              <span className="hint" />
            </p>

            <p>
              <label>Metadata contains</label>
              <input type="text" />
              <span className="hint" />
            </p>

            <p>
              <label>Last modified</label>
              <select 
                value={this.state.lastModified}
                onChange={this.onChangeLastModified}>
                <option value="ANYTIME">Any time</option>
                <option value="WEEK">this week</option>
              </select>
              <span className="hint" />
            </p>
          </fieldset>
          <fieldset className="buttons">
            <button className="nostyle clear" onClick={this.onClear}>Clear</button>
            <button className="btn" onClick={this.onSearch}>Search</button>
          </fieldset>
        </form>
      </div>
    )
  }

}
