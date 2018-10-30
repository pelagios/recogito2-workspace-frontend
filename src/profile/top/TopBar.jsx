import React, { Component } from 'react';

import Search from './Search.jsx';

export default class TopBar extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="top-bar">
          <div className="top-left">
            <a href="/my" className="home">
              <img src="/assets/images/logo-recogito-small.png" alt="Recogito logo" />
            </a>
            <a href="/my">My Workspace</a>
            <a href="/help">Help</a>
            <a href="/help/about">About</a>

            <Search></Search>
          </div>

          <div className="top-right">
            <div className="login">
              <div className="not logged-in">
                <a href="/login">Log in</a>&nbsp; | &nbsp;New to Recogito? &nbsp;<a href="/">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}