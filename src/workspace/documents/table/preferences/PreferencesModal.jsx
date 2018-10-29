import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import Modal from '../../../common/Modal.jsx';
import ColumnOrder from './ColumnOrder.jsx';

import { COLUMNS, HEADER_NAMES } from '../Columns.js';

export default class PreferencesModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns.slice(0)
    }
  }

  componentWillReceiveProps(next) {
    if (next.columns != this.props.columns)
      this.setState({ columns: next.columns.slice(0) });
  }

  /** Computes a map (fieldname -> checked) from the current columns state **/
  getCheckboxStates(props) {
    const states = {};

    COLUMNS.forEach(field => {
      const isChecked = this.state.columns.includes(field);
      states[field] = isChecked;
    });

    return states;
  }

  /** Sets visibility for all rows to the given boolean value **/
  setAllRows(checked) {
    const checkAll = () => {
      const toAppend = 
        COLUMNS.filter(field => !this.state.columns.includes(field));

      this.setState({ columns: this.state.columns.concat(toAppend) });
    };

    const uncheckAll = () => {
      this.setState({ columns: [] });
    };

    if (checked) 
      checkAll();
    else
      uncheckAll();
  }

  /**
   * Clicking 'ALL' either checks all boxes or - if all are currently
   * checked, unchecks them.
   */
  onClickAll() {
    const allRowsChecked = COLUMNS.length == this.state.columns.length;
    if (allRowsChecked)
      this.setAllRows(false);
    else
      this.setAllRows(true);
  }

  /** Toggles the checkbox with the given name **/
  toggleOne(name) {
    this.setState(prev => {
      const idx = prev.columns.indexOf(name);
      if (idx < 0)
        prev.columns.push(name);
      else
        prev.columns.splice(idx, 1);        
    
      return prev;
    });
  }

  onSort(oldIndex, newIndex) {
    this.setState({
      columns: arrayMove(this.state.columns, oldIndex, newIndex)
    });
  }

  render() {
    // Helper to create a single checkbox + label row
    const createRow = (field) =>
      <li key={field}>
        <input
          type="checkbox"
          id={field}
          name={field}
          checked={this.state.columns.includes(field)}
          onChange={this.toggleOne.bind(this, field)} />
        <label htmlFor={field}>{HEADER_NAMES[field]}</label>
      </li>

    return (
      <Modal
        className="preferences"
        title="Configure Columns"
        onClose={this.props.onCancel}>

        <div className="scroll-pane">
          <div className="selected-columns">
            <button
              className="all nostyle"
              onClick={this.onClickAll.bind(this)}>All</button>
            <ul>
              { COLUMNS.map(createRow) }
            </ul>
          </div>

          <ColumnOrder
            items={this.state.columns} 
            onSortEnd={this.onSort.bind(this)} />
        </div>

        <div className="buttons">
          <button
            className="btn"
            onClick={this.props.onSave.bind(this, this.state.columns)}>Save</button>

          <button 
            className="btn outline"
            onClick={this.props.onCancel}>Cancel</button>
        </div>
      </Modal>
    )
  }

}
