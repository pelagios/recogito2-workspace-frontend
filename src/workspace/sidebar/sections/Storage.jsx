import React from 'react';
import NumberFormat from 'react-number-format';
import Meter from '../../../common/Meter.jsx';

const Storage = props => {

  const dataAvailable = props.account && props.account.storage;
  const quota = dataAvailable ? props.account.storage.quota_mb : 0;
  const used = dataAvailable ? props.account.storage.used_mb : 0;

  return (
    <div className="section storage">
      <span className="icon">&#xf1c0;</span> Storage
      <div className="used-diskspace">
        <Meter
          value={(quota > 0) ? Math.min(1, used / quota) : 0} />

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
  );

}

export default Storage;
