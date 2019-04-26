import Meter from '../../components/Meter.jsx';

const UploadProgressModal = props => {

  // files, fileStatusList, isRemoteSource, phase, errors

  // onCancel

  const totalLoaded = this.state.progress.reduce((total, next) => total + next, 0);

  return (
    <div className="upload-progress">
      <div className="phase">
        { props.phase }

        <button 
          className="close nostyle"
          onClick={props.onCancel}>&#xe897;</button>
      </div>

      <ul className={`files${(props.errors.length > 0) ? ' has-errors' : ''}`}>
        { props.files.map((f, idx) =>
          <li key={idx}>
            {f.name}
            <span className={`icon spinner ${props.uploadStatus[idx]}`}></span>
          </li>
        )}

        { props.isRemoteSource &&
          <li>
            Fetching content from remote source...
            <span className="icon spinner RUNNING"></span>
          </li>
        }
      </ul>

      { props.errors.length > 0 && 
        <ul className="errors">
          { props.errors.map((message, idx) => <li key={idx}>{message}</li>) }
        </ul>
      }

      <div className="progress">
        <Meter value={totalLoaded / this.state.totalSize} />
      </div>
      </div>
  )

}