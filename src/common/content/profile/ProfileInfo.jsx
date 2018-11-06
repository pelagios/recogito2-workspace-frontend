import React, { Component } from 'react';

import Avatar from './Avatar.jsx';

export default class Identity extends Component {

  formatURL(url) {
    return url.replace(/^https?:\/\//i, '');
  }

  render() {
    const dataAvailable = 
      this.props.account && 
      this.props.account.username &&
      this.props.account.member_since;
      
    return (
      <div className="identity">
        <div className="user">
          <Avatar username={dataAvailable && this.props.account.username} />

          <h1>
            { dataAvailable ?
                ((this.props.account.real_name) ? 
                  this.props.account.real_name : this.props.account.username) :

                (<span className="placeholder" />) }
          </h1>

          <p className="member-since">
            { dataAvailable ?
              <React.Fragment>
                Joined on { new Intl.DateTimeFormat('en-GB', {
                  year : 'numeric',
                  month: 'short',
                  day  : '2-digit'
                }).format(new Date(this.props.account.member_since)) }
              </React.Fragment> : <span className="placeholder" />
            }
          </p>
        </div>

        <div className="user-extended">
          { dataAvailable && this.props.account.bio &&
            <p className="bio">{this.props.account.bio}</p> }

          { dataAvailable && this.props.account.website && 
            <p className="homepage">
              <a href={this.props.account.website}>{this.formatURL(this.props.account.website)}</a>
            </p>
          }
        </div>
      </div>
    )
  }

}
