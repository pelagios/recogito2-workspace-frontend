import React, { Component } from 'react';

export default class Avatar extends Component {

  // https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
  stringToHslColor(str) {
    let hash = 0;
    for (let i=0; i<str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }

  render() {
    const color = this.props.username ? `hsl(${this.stringToHslColor(this.props.username)}, 35%, 65%)` : '#e2e2e2';

    return (
      <div className="avatar" style={{ backgroundColor: color }}>
        <div className="inner">
          { this.props.username && this.props.username.charAt(0).toUpperCase() }
        </div>
      </div>
    )
  }

}