import { Component } from 'react';

import { Columns } from '../Columns';

export default class BaseRowComponent extends Component {

  constructor(props) {
    super(props);
    this.updateTotalRowSpan(props);
  }

  componentWillReceiveProps(next) {
    this.updateTotalRowSpan(next);
  }

  /** Updates total unit width requirement for current row layout **/
  updateTotalRowSpan(props) {
    this._totalSpan = props.columns.reduce((total, field) => total + Columns.getSpan(field), 0);
  }

  getWidth(field) {
    const span = Columns.getSpan(field);
    return span / this._totalSpan;
  }
  
}