import React, { Component } from 'react';
import { render } from 'react-dom';
import Draggable from 'react-draggable';

class Prompt extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (evt) => {
    if (evt.which === 27) this.props.onNo();
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
                 <button className="btn yes" onClick={this.props.onYes}>YES</button>
                 <button className="btn outline no" onClick={this.props.onNo}>NO</button>
              </p>
            </div>
          </div>
        </Draggable>
      </div>
    )
  }

}

export const confirm = props => {
  const promptRoot = document.createElement('div');
  promptRoot.setAttribute('id', 'confirm-prompt-root');
  document.body.append(promptRoot);

  const onYes = () => {
    promptRoot.remove();
    props.onConfirm();
  }

  const onNo = () => {
    promptRoot.remove();
    props.onCancel();
  }

  render(
    <Prompt 
      title={props.title}
      type={props.type}
      message={props.message}
      onYes={onYes}
      onNo={onNo} />, promptRoot);
}