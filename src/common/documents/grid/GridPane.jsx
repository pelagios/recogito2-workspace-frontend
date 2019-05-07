import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { AutoSizer, List } from 'react-virtualized';
import Document from './Document';
import Folder from './Folder';
import FiledropHint from '../FiledropHint';

const TILE_SIZE = 192;

/**
 * Using the following example:
 *
 * https://stackoverflow.com/questions/46368305/how-to-make-a-list-grid-with-a-responsive-number-of-columns-using-react-virtuali
 * http://plnkr.co/edit/zjCwNeRZ7XtmFp1PDBsc?p=preview
 */
export default class GridPane extends Component {

  state = {
    drag: false
  }

  onTileClick(evt, item, idx) {
    const selection = 
      this.props.selection && this.props.selection.handleClick(evt, item, idx, this.props.items);    

    if (selection)
      this.props.onSelect(selection);
  }

  rowRenderer(itemsPerRow) {
    return (args => {
      const fromIndex = args.index * itemsPerRow;
      const toIndex = Math.min(fromIndex + itemsPerRow, this.props.items.length);
      const itemsInRow = toIndex - fromIndex;

      const renderedItems = new Array(itemsInRow).fill(undefined).map((_, rowIdx) => {
        const idx = rowIdx + fromIndex;
        const item = this.props.items[idx];
        const selected = this.props.selection && this.props.selection.includes(item);

        return (item.type === 'FOLDER') ?
            <Folder
              key={idx} 
              id={item.id}
              title={item.title} 
              selected={selected}
              onClick={e => this.onTileClick(e, item, idx)} /> :
            
            <Document
              key={idx}
              id={item.id}
              title={item.title}
              filetypes={item.filetypes}
              fileCount={item.file_count}
              selected={selected}
              onClick={e => this.onTileClick(e, item, idx)} />
      });

      if (itemsInRow < itemsPerRow) { // Add dummies to preserve grid layout
        renderedItems.push(new Array(itemsPerRow - itemsInRow).fill(undefined).map((_, idx) =>
          <div className="cell dummy" key={`dummy-${idx}`} />
        ))
      }

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

  onDrag = (active) => {
    this.setState({ drag: active });
  }

  onDrop = (files, _, evt) => {
    const url = evt.dataTransfer.getData('URL');

    this.setState({ drag: false });

    if (files.length > 0) this.props.onDropFiles(files);
    else if (url) this.props.onDropSourceURL(url);
  }

  render() {
    const gridPane =
      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow = Math.floor(width / TILE_SIZE);
          const rowCount = Math.ceil(this.props.items.length / itemsPerRow);

          return (
            <List
              className="virtualized-grid"
              width={width}
              height={height}
              rowCount={rowCount}
              rowHeight={TILE_SIZE}
              rowRenderer={this.rowRenderer(itemsPerRow)} />
          )
        }}
      </AutoSizer>

    return (
      <React.Fragment>
        <div className="documents-pane grid-pane">
          {this.props.disableFiledrop ? gridPane :
            <Dropzone
              className="dropzone"
              disableClick={true}
              onDragEnter={() => this.onDrag(true)}
              onDragLeave={() => this.onDrag(false)}
              onDrop={this.onDrop}>

              {gridPane}

            </Dropzone>
          }

          { this.state.drag && <FiledropHint /> }
        </div>
      </React.Fragment>
    )
  }

}
