import React, { Component } from 'react';

export default class Search extends Component {

  render() {
    return (
      <div className="search">
        <div className="wrapper">
          <input placeholder="Search Recogito..."/>
        </div>
        <span className="icon hand-lens">&#xf002;</span>
      </div>
    )
  }

}