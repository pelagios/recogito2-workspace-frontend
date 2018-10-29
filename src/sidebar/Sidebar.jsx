import React, { Component } from 'react';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <div className="identity">
          <div className="avatar">
            <div className="inner">R</div>
          </div>
          <h1>Rainer Simon</h1>
          <p className="member-since">Joined on 08 Jun 2016</p>
        </div>
        <div className="bio">
          A collector of things worth knowing and things not worth knowing.
        </div>
        <div className="homepage">
          <a href="http://github.com/rsimon">github.com/rsimon</a>
        </div>
      </div>
    );
  }

}