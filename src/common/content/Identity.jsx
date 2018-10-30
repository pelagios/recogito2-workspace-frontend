import React, { Component } from 'react';

export default class Identity extends Component {

  // https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
  stringToHslColor(str) {
    let hash = 0;
    for (let i=0; i<str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }

  render() {
    const dataAvailable = 
      this.props.account && 
      this.props.account.username &&
      this.props.account.member_since;
      
    const avatarColor = (dataAvailable) ?
     `hsl(${this.stringToHslColor(this.props.account.username)}, 35%, 65%)` : '#e2e2e2';

    return (
      <div className="identity">
        <div className="user">
          <div className="avatar" style={{ backgroundColor: avatarColor }}>
            <div className="inner">
              { dataAvailable &&
                this.props.account.username.charAt(0).toUpperCase() }
            </div>
          </div>

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
              <a href={this.props.account.website}>{this.props.account.website}</a>
            </p>
          }
        </div>
      </div>
    )
  }

}
