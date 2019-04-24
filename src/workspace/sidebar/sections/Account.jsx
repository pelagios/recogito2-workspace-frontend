import React, { Component } from 'react';

import Menu from '../../../common/Menu';
import IdentityInfo from '../../../common/account/IdentityInfo';

export default class Account extends Component {

  state = {
    menuVisible: false 
  };

  openMenu = () => {
    this.setState({ menuVisible: true });
  }

  closeMenu = () => {
    this.setState({ menuVisible: false });
  }

  render() {
    return (
      <div
        className="section account"
        onClick={this.openMenu} >

        <IdentityInfo 
          account={this.props.account} />

        { this.state.menuVisible &&
          <Menu 
            className="account-menu"
            onCancel={this.closeMenu}>

            <Menu.Group name="settings">
              <Menu.Item icon={'\uf0ad'} label="Account settings" link="/settings/account" />
            </Menu.Group>
            
            <Menu.Group name ="general">
              <Menu.Item icon={'\uf128'} label="Help" link="/help" />
              <Menu.Item icon={'\uf011'} label="Sign out" link="/logout" />
            </Menu.Group>
          </Menu>
        }
      </div>
    )
  }

}
