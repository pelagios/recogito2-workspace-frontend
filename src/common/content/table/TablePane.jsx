import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import Dropzone from 'react-dropzone'

import DropzoneDecoration from '../upload/DropzoneDecoration.jsx';
import Readme from '../Readme.jsx';
import Selection from '../Selection.js';

import HeaderRow from './rows/HeaderRow.jsx';
import DocumentRow from './rows/DocumentRow.jsx';
import FolderRow from './rows/FolderRow.jsx';
import PreferencesModal from  './preferences/PreferencesModal.jsx';

export default class TablePane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      prefsOpen: false,
      selection: new Selection(props.folders.concat(props.documents), props.selection)
    }
  }

  /** Set derived state **/
  componentWillReceiveProps(next) {
    this.setState({ 
      selection: new Selection(next.folders.concat(next.documents), next.selection)
    });
  }

  /** Handle click/SHIFT+click/CTRL+click selection via Selection helper class */
  onClick(evt, item, idx) {
    const isShift = evt.getModifierState("Shift");
    const isCtrl = evt.getModifierState("Control");

    // Is this a selection or deselection?
    const isSelectAction = 
      isShift || isCtrl || !this.props.selection.includes(item);

    if (isSelectAction) {
      if (isShift)
        this.state.selection.selectRange(idx);
      else
        this.state.selection.selectItem(item, isCtrl);

      this.props.onSelect(this.state.selection.getSelectedItems());
      evt.preventDefault();
    }
  }

  rowRenderer() {
    const allItems = this.props.folders.concat(this.props.documents);

    return ((args) => {
      const item = allItems[args.index];
      const isFolder = item.name;

      if (isFolder)
        return (
          <FolderRow key={args.key} style={args.style} name={item.name} />
        )
      else
        return (
          <DocumentRow
            key={args.key}
            style={args.style}
            columns={this.props.columns}
            item={item}
            selected={this.props.selection && this.props.selection.includes(item)}
            onClick={e => this.onClick(e, item, args.index)} />
        )
    })
  }

  showPreferences(visible) {
    this.setState({ prefsOpen: visible });
  }

  onSavePreferences(columns) {
    this.setState({ prefsOpen: false });
    this.props.onChangeColumnPrefs(columns);
  }

  sortBy(field) {
    const asc = this.props.sorting ?
      this.props.sorting.by === field ? !this.props.sorting.asc : true :
      true;

    this.props.onSort({ by: field, asc: asc });
  }

  onDrag(active) {
    this.setState({ drag: active });
  }

  onDrop(files, _, evt) {
    const url = evt.dataTransfer.getData('URL');

    const hostname = url ? (() => {
      const a = document.createElement('a');
      a.href = url;
      return a.hostname;
    })() : null;

    this.setState({ drag: false });

    if (files.length > 0)
      this.props.onDropFiles(files);
    else if (url && hostname !== window.location.hostname) // Require external link
      this.props.onDropURL(url);
  }

  render() {
    const readme = React.Children.toArray(this.props.children)
      .filter(c => c.type === Readme)
      .shift(); // First readme or undefined

    const tablePane =
      <div className="documents-pane table-pane">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="virtualized-list"
              width={width}
              height={height}
              rowCount={this.props.folders.length + this.props.documents.length}
              rowHeight={47}
              rowRenderer={this.rowRenderer()} />
          )}
        </AutoSizer>

        { this.state.drag && <DropzoneDecoration /> }
        { this.props.busy && <div className="busy-mask" /> }
      </div>

    return (
      <React.Fragment>
        <div className="documents-table-header">
          <HeaderRow 
            columns={this.props.columns} 
            onSort={this.sortBy.bind(this)}
            sortColumn={this.props.sorting ? this.props.sorting.by : null} 
            sortAsc={this.props.sorting ? this.props.sorting.asc : null} />

          <button
            className="column-options-btn nostyle icon"
            onClick={this.showPreferences.bind(this, true)} >&#xf141;</button>
        </div>

        {readme}

        {this.props.disableFiledrop ? tablePane :
          <Dropzone
            className="dropzone"
            disableClick={true}
            onDragEnter={this.onDrag.bind(this, true)}
            onDragLeave={this.onDrag.bind(this, false)}
            onDrop={this.onDrop.bind(this)}>
            
            {tablePane}
            
          </Dropzone>
        }

        {this.state.prefsOpen &&
          <PreferencesModal
            columns={this.props.columns}
            onCancel={this.showPreferences.bind(this, false)} 
            onSave={this.onSavePreferences.bind(this)} />
        }
      </React.Fragment>
    )
  }

}
