import React, { Component } from 'react';
import { render } from 'react-dom';
import Draggable from 'react-draggable';

class Alert extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (evt) => {
    if (evt.which === 27) this.props.onClose();
  }

  render() {
    const className = (this.props.type) ? `prompt ${this.props.type.toLowerCase()}` : 'prompt';

    return (
      <div className="clicktrap">
        <Draggable handle=".prompt-header">
          <div className={className}>
            <div className="prompt-header">
              <h1 className="title">{this.props.title}</h1>
            </div>

            <div className="prompt-body">
              <p className="message">{this.props.message}</p>
              <p className="buttons">
                <button className="btn" onClick={this.props.onClose}>Close</button>
              </p>
            </div>
          </div>
        </Draggable>
      </div>
    )
  }

}

export const alert = props => {
  const promptRoot = document.createElement('div');
  promptRoot.setAttribute('id', 'alert-root');
  document.body.append(promptRoot);

  const onClose = () => {
    promptRoot.remove();
    props.onClose && props.onClose();
  }

  render(
    <Alert 
      title={props.title}
      type={props.type}
      message={props.message}
      onClose={onClose} />, promptRoot);
}