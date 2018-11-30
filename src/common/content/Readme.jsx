import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import ContentEditable from "react-sane-contenteditable";

const INITIAL_STATE = {
  editing: false,
  modifiedContent: null
}

export default class Readme extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onKeydown = this.onKeydown.bind(this);
  }

  onKeydown(evt) {
    if (evt.which === 27) // Esc
      this.onCancel(); 
    else if (evt.ctrlKey && evt.which === 13) // Ctrl+Enter 
      this.onSave();
  }

  onEdit() {
    document.addEventListener('keydown', this.onKeydown, false);
    this.setState({ editing: true });
  }

  onChange(_, value) {
    this.setState({ modifiedContent: value });
  }

  onDelete() {
    document.removeEventListener('keydown', this.onKeydown, false);
    this.props.onDelete && this.props.onDelete();
  }

  onSave() {
    document.removeEventListener('keydown', this.onKeydown, false);
    this.props.onUpdate && this.props.onUpdate(this.state.modifiedContent);
    this.setState(INITIAL_STATE);
  }

  onCancel() {
    document.removeEventListener('keydown', this.onKeydown, false);
    if (typeof this.props.content === 'boolean')
      this.onDelete();
    else
      this.setState(INITIAL_STATE);
  }

  renderView(content) {
    return (
      <div className="readme">
        <div className="wrapper">
          <div className="textbox">
            <ReactMarkdown source={content} />       
          </div>

          <span className="buttons modify">
            <button
              className="icon nostyle"
              title="Edit"
              onClick={this.onEdit.bind(this)}>&#xf040;</button>
          </span>
        </div>
      </div>
    )
  }

  renderEdit(content) {
    return (
      <div className="readme editing">
        <div className="wrapper">
          <ContentEditable 
            tagName="div"
            className="textbox"
            content={content} 
            editable={true} 
            multiLine={true}
            onChange={this.onChange.bind(this)}/>            

          <div className="editbar">
            <span className="hint">Supports styling with <a href="#">Markdown</a></span>
            <span className="buttons">
              <button
                className="label nostyle"
                onClick={this.onDelete.bind(this)}>Delete description</button>

              <button 
                className="icon nostyle"
                onClick={this.onSave.bind(this)}>&#xf00c;</button>

              <button 
                className="icon nostyle"
                onClick={this.onCancel.bind(this)}>&#xf00d;</button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const editOnOpen = typeof this.props.content === 'boolean';
    const content = editOnOpen ? '' : 
      (this.state.modifiedContent ? this.state.modifiedContent : this.props.content);

    return (this.state.editing || editOnOpen) ? this.renderEdit(content) : this.renderView(content);
  }

}
