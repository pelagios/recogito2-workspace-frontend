import React, { Component } from 'react';

export default class TopBar extends Component {

  render() {
    return (
      <div className="top-bar">
        <div className="top-left">
          <a href="/" className="home">LOGO</a>
          <a href="/help/about">About</a>
        </div>

        <div className="top-right">
          <div className="search"></div>
          <div className="login">
            <div className="not logged-in">
              <a href="/login">Log in</a> | New to Recogito? 
              <a href="/">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}