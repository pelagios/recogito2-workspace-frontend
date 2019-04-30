import React from 'react';
import Meter from '../../../common/Meter.jsx';

const FileProgress = props => {

  return (
    <li>
      {props.upload.file.name}
      <span className={`icon spinner ${props.upload.status}`}></span>
    </li>
  );

}

const ImportProgressModal = props => {
  const totalLoaded = props.uploads.reduce((total, u) => total + u.progress, 0);
    
  const errors = props.uploads.reduce((errors, u) => { 
    if (u.error) errors.push(u.error);
    return errors;
  }, []);

  return (
    <div className="upload-progress">
      <div className="phase">
        { props.phase }

        <button 
          className="close nostyle"
          onClick={props.onClose}>&#xe897;</button>
      </div>

      <ul className={`files${(errors.length > 0) ? ' has-errors' : ''}`}>
        { props.uploads.map(u => <FileProgress key={u.file.name} upload={u} />) }

        { props.isRemoteSource &&
          <li>
            Fetching content from remote source...
            <span className="icon spinner RUNNING"></span>
          </li>
        }
      </ul>

      { errors.length > 0 && 
        <ul className="errors">
          <li>{errors.join()}</li>
        </ul> 
      }

      <div className="progress">
        <Meter value={totalLoaded / props.totalSize} />
      </div>
    </div>
  )

}

export default ImportProgressModal;