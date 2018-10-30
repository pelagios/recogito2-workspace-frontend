import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import { AutoSizer, List } from 'react-virtualized';

import Selection from '../Selection.js';
import Folder from './Folder.jsx';
import Document from './Document.jsx';
import Readme from '../Readme.jsx';

import DropzoneDecoration from '../upload/DropzoneDecoration.jsx';

const ITEM_SIZE = 192;

/**
 * Using the following example:
 *
 * https://stackoverflow.com/questions/46368305/how-to-make-a-list-grid-with-a-responsive-number-of-columns-using-react-virtuali
 * http://plnkr.co/edit/zjCwNeRZ7XtmFp1PDBsc?p=preview
 */
export default class GridPane extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selection: new Selection(props.folders.concat(props.documents), props.selection) 
    };
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

    if (isShift)
      this.state.selection.selectRange(idx);
    else
      this.state.selection.selectItem(item, isCtrl);

    this.props.onSelect(this.state.selection.getSelectedItems());
    evt.preventDefault();
  }

  onDoubleClick(item) {
    window.location.href= `document/${item.id}/part/1/edit`;
  }

  rowRenderer(itemsPerRow, rowCount) {
    const allItems = this.props.folders.concat(this.props.documents);

    return ((args) => {
      const fromIndex = args.index * itemsPerRow;
      const toIndex = Math.min(fromIndex + itemsPerRow, allItems.length);
      const itemsInRow = toIndex - fromIndex;

      const renderedItems = new Array(itemsInRow).fill(undefined).map((_, rowIdx) => {
        const idx = rowIdx + fromIndex;
        const item = allItems[idx];

        const isFolder = item.name; // Dummy condition
        if (isFolder)
          return (
            <Folder key={idx} name={item.name} />
          )
        else
          return (
            <Document
              key={idx}
              id={item.id}
              title={item.title}
              filetypes={item.filetypes}
              fileCount={item.file_count}
              selected={this.props.selection && this.props.selection.includes(item)}
              onClick={e => this.onClick(e, item, args.index)} 
              onDoubleClick={this.onDoubleClick.bind(this, item)} />
          )
      });

      if (itemsInRow < itemsPerRow) // Add dummies to preserve grid layout
        renderedItems.push(new Array(itemsPerRow - itemsInRow).fill(undefined).map((_, idx) =>
          <div className="cell dummy" key={`dummy-${idx}`} />
        ))

      return (
        <div
          key={args.key}
          style={args.style}
          className="row">
          {renderedItems}
        </div>
      )
    });
  }

  onDrag(active) {
    this.setState({ drag: active });
  }

  onDrop(files, _, evt) {
    const url = evt.dataTransfer.getData('URL');

    this.setState({ drag: false });

    if (files.length > 0) this.props.onDropFiles(files);
    else if (url) this.props.onDropURL(url);
  }

  render() {
    const readme = React.Children.toArray(this.props.children)
      .filter(c => c.type === Readme)
      .shift(); // First readme or undefined

    return (
      <React.Fragment>
        {readme}
        <div className="documents-pane grid-pane">
          <Dropzone
            className="dropzone"
            disableClick={true}
            onDragEnter={this.onDrag.bind(this, true)}
            onDragLeave={this.onDrag.bind(this, false)}
            onDrop={this.onDrop.bind(this)}>

            <AutoSizer>
              {({ height, width }) => {
                const itemCount = this.props.folders.length + this.props.documents.length;
                const itemsPerRow = Math.floor(width / ITEM_SIZE);
                const rowCount = Math.ceil(itemCount / itemsPerRow);

                return (
                  <List
                    className="virtualized-grid"
                    width={width}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={ITEM_SIZE}
                    rowRenderer={this.rowRenderer(itemsPerRow, rowCount)} />
                )
              }}
            </AutoSizer>
          </Dropzone>

          { this.state.drag && <DropzoneDecoration /> }
        </div>
      </React.Fragment>
    )
  }

}
