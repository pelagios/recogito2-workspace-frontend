import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { HEADER_NAMES } from '../Columns.js';

const SortableItem = SortableElement(({ label }) =>
  <div className="card">{label}</div>
);

const SortableList = SortableContainer(({ items }) =>
  <div className="column-order">
    {items.map((item, idx) => (
      <SortableItem key={`card-${idx}`} index={idx} label={HEADER_NAMES[item]} />
    ))}
  </div>
);

export default class ColumnOrder extends Component {

  render() {
    return (
      <SortableList
        items={this.props.items}
        onSortEnd={e => this.props.onSortEnd(e.oldIndex, e.newIndex)} />
    )
  }

}
