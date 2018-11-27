import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Readme extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false }
  }

  render() {
    return (
      <div className={this.state.editing ? "readme editing" : "readme"}>
       {this.state.editing ? 
          <div 
            className="inner"
            contentEditable={true}>{this.props.children}</div>
          :
          <div className="inner">
            <ReactMarkdown source={this.props.children} />            
          </div>
        }
      </div>
    )
  }

}
