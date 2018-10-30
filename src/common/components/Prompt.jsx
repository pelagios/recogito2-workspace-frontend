import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class Prompt extends Component {

  constructor(props) {
    super(props);
    this.onKeydown = this.onKeydown.bind(this);
  }

  /** Clear selection on ESC **/
  onKeydown(evt) {
    if (evt.which === 27) this.props.onNo();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
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