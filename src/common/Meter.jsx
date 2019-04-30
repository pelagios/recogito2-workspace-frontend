import React, { Component } from 'react';

export default class Meter extends Component {

  render() {
    return (
      <div
        className="meter"
        style={{ position: 'relative' }}>

        <div
          className="bar"
          style={{
            width: `${100 * this.props.value}%`,
            height: '100%'
          }} />
      </div>
    )
  }

}
