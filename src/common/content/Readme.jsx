import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Readme extends Component {

  render() {
    return (
      <div className="readme">
        <div className="inner">
          <ReactMarkdown source={this.props.children} />
        </div>
      </div>
    )
  }

}
