import React from 'react';
import BaseRowComponent from './BaseRowComponent';
import { HEADER_NAMES } from '../Columns';

export default class HeaderRow extends BaseRowComponent {

  render() {
    return (
      <div className="column-labels">
        {this.props.columns.map(field =>
          <span
            key={field}
            style={{ width: `${100 * super.getWidth(field)}%` }}
            className={`label ${field}`}
            onClick={this.props.onSort.bind(this, field)}>
            <span className="inner-wrapper">
              <span className="inner">
                {HEADER_NAMES[field] || field}
              </span>
              {this.props.sortColumn === field &&
                <span className="sort icon">
                  <span className="inner">
                    {(this.props.sortAsc) ? '\ue688' : '\ue682' }
                  </span>
                </span>
              }
            </span>
          </span>
        )}
      </div>
    )
  }

}
