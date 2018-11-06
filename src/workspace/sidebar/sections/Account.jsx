import React, { Component } from 'react';

import ProfileInfo from '../../../common/content/profile/ProfileInfo.jsx';
import MenuPopup from '../../../common/components/MenuPopup.jsx';

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

  onSelectMenuOption(option) {
    if (option === 'SETTINGS')
      window.location.href= '/settings/account';
    else if (option === 'SIGNOUT')
      window.location.href= '/logout';
    else if (option === 'HELP');
      window.location.href= '/help';
  }

  showMenu() {
    this.setState({ menuVisible: true });
  }

  closeMenu() {
    this.setState({ menuVisible: false });
  }

  render() {
    return (
      <div
        className="section account"
        onClick={this.showMenu.bind(this)} >

        <ProfileInfo account={this.props.account} />

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
      </div>
    )
  }

}
