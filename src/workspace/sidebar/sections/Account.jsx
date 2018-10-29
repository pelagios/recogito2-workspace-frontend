import React, { Component } from 'react';

import MenuPopup from '../../common/MenuPopup.jsx';

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

  // https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
  stringToHslColor(str) {
    let hash = 0;
    for (let i=0; i<str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }

  onSelectMenuOption(option) {
    if (option == 'SETTINGS')
      window.location.href= '/settings/account';
    else if (option == 'SIGNOUT')
      window.location.href= '/logout';
    else if (option == 'HELP');
      window.location.href= '/help';
  }

  showMenu() {
    this.setState({ menuVisible: true });
  }

  closeMenu() {
    this.setState({ menuVisible: false });
  }

  render() {
    const dataAvailable = 
      this.props.account && 
      this.props.account.username &&
      this.props.account.member_since;
      
    const avatarColor = (dataAvailable) ?
     `hsl(${this.stringToHslColor(this.props.account.username)}, 35%, 65%)` : '#e2e2e2';

    return (
      <div
        className="sidebar-section account"
        onClick={this.showMenu.bind(this)} >

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

        { this.state.menuVisible &&
          <MenuPopup
            className="account-menu"
            menu={[
              { group: 'settings', options: [
                { icon: '\uf0ad', label: 'Account settings', link: '/settings/account' }
              ]},
              { group: 'general', options: [
                { icon: '\uf128', label: 'Help', link: '/help' },
                { icon: '\uf011', label: 'Sign out', link: '/logout' }
              ]}
            ]}
            onSelect={this.onSelectMenuOption.bind(this)}
            onCancel={this.closeMenu.bind(this)} />
        }

        { dataAvailable && this.props.account.bio &&
          <p className="bio">{this.props.account.bio}</p> }

        { dataAvailable && this.props.account.website && 
          <p className="homepage">
            <a href={this.props.account.website}>{this.props.account.website}</a>
          </p>
        }
      </div>
    )
  }

}
