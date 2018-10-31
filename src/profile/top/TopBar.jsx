import React, { Component } from 'react';

import Search from './Search.jsx';

export default class TopBar extends Component {

  notLoggedIn() {
    return (
      <div className="not logged-in">
        <a href="/login">Log in</a>&nbsp; | &nbsp;New to Recogito? &nbsp;<a href="/">Learn more</a>
      </div>
    )
  }

  loggedInAs() {
    const name = this.props.me.real_name ? this.props.me.real_name : this.props.me.username;

    return (
      <div className="logged-in">
        Logged in as <a href={`/${this.props.me.username}`}>{name}</a>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="top-bar">
          <div className="top-left">
            <a href="/my" className="home">
              <img src="/assets/images/logo-recogito-small.png" alt="Recogito logo" />
            </a>
            { this.props.me && this.props.me.logged_in && <a href="/my">My Workspace</a> }
            <a href="/help">Help</a>
            <a href="/help/about">About</a>

            <Search></Search>
          </div>

          <div className="top-right">
            {this.props.me && 
              this.props.me.logged_in ? this.loggedInAs() : this.notLoggedIn()
            }
          </div>
        </div>
      </React.Fragment>
    );
  }

}