import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import Dropzone from 'react-dropzone'

import DocumentRow from './rows/DocumentRow';
import FiledropHint from '../FiledropHint';
import FolderRow from './rows/FolderRow';
import HeaderRow from './rows/HeaderRow';
import PreferencesModal from  './preferences/PreferencesModal';

export default class TablePane extends Component {

  state = {
    drag: false,
    tablePreferencesOpen: false,
  }

  rowRenderer() {
    return ((args) => {
      const item = this.props.items[args.index];
      const selected = this.props.selection.includes(item);

      return (item.type === 'FOLDER') ?
        <FolderRow 
          key={args.key} 
          style={args.style} 
          item={item} 
          selected={selected}
          onClick={e => this.onRowClick(e, item, args.index)} 
          onRename={this.props.onRenameFolder} /> :

        <DocumentRow
          key={args.key}
          style={args.style}
          columns={this.props.config.columns}
          item={item}
          selected={selected}
          onClick={e => this.onRowClick(e, item, args.index)} />
    });
  }

  /** 
   * Handle click/SHIFT+click/CTRL+click selection via Selection helper class 
   * 
   * TODO is this identical to the select code in GridPane?
   */
  onRowClick(evt, item, idx) {
    const isShift = evt.getModifierState("Shift");
    const isCtrl = evt.getModifierState("Control");
    
    // Is this a selection or deselection?
    const isSelectAction = 
      (isShift || isCtrl || !this.props.selection.includes(item));

    if (isSelectAction) {
      const newSelection = isShift ?
        this.props.selection.selectRange(this.props.items, idx) :
        this.props.selection.selectItem(item, isCtrl);

      this.props.onSelect(newSelection);
      evt.preventDefault();
    }
  }

  showPreferences = visible => {
    this.setState({ tablePreferencesOpen: visible });
  }

  onSavePreferences = columns => {
    this.setState({ tablePreferencesOpen: false });
    this.props.onChangeColumnConfig(columns);
  }

  sortBy = field => {
    const asc = this.props.sorting.by === field ? 
      ! this.props.sorting.asc : true;

    this.props.onSort({ by: field, asc: asc });
  }

  onDrag = active => {
    this.setState({ drag: active });
  }

  onDrop = (files, _, evt) => {
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
    const tablePane =
      <div className="documents-pane table-pane">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="virtualized-list"
              width={width}
              height={height}
              rowCount={this.props.items.length}
              rowHeight={47}
              rowRenderer={this.rowRenderer()} />
          )}
        </AutoSizer>

        { this.state.drag && 
          <FiledropHint /> }
        
        { this.props.busy &&
           <div className="busy-mask" /> }
      </div>

    return (
      <React.Fragment>
        <div className="documents-table-header">
          <HeaderRow 
            columns={this.props.config.columns} 
            onSort={this.sortBy}
            sortColumn={this.props.config.sorting.by} 
            sortAsc={this.props.config.sorting.asc} />

          <button
            className="column-options-btn nostyle icon"
            onClick={() => this.showPreferences(true)} >&#xf141;</button>
        </div>

        { this.props.enableFiledrop ?
          <Dropzone
            className="dropzone"
            disableClick={true}
            onDragEnter={() => this.onDrag(true)}
            onDragLeave={() => this.onDrag(false)}
            onDrop={this.onDrop}>
            { tablePane }
          </Dropzone> : { tablePane }
        }

        { this.state.tablePreferencesOpen &&
          <PreferencesModal
            columns={this.props.config.columns}
            onCancel={() => this.showPreferences(false)} 
            onSave={this.onSavePreferences} />
        }
      </React.Fragment>
    )
  }

}
