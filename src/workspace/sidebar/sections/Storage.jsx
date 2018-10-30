import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import Meter from '../../../common/components/Meter.jsx';

export default class Storage extends Component {

  render() {
    const dataAvailable = this.props.account && this.props.account.storage;
    const quota = dataAvailable ? this.props.account.storage.quota_mb : 0;
    const used = dataAvailable ? this.props.account.storage.used_mb : 0;

    return (
      <div className="section storage">
        <span className="icon">&#xf1c0;</span> Storage
        <div className="used-diskspace">
          <Meter
            value={(quota > 0) ? used / quota : 0} />

          <div className="label">
            <NumberFormat 
              displayType="text"
              value={used}
              thousandSeparator={true} /> 
            {' of  '}
            <NumberFormat 
              displayType="text"
              value={quota}
              thousandSeparator={true} /> MB used
          </div>
        </div>
      </div>
    )
  }

}
