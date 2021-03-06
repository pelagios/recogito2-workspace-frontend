import React, { Component } from 'react';

const MenuGroup = props => {

  const classNames = props.className ? 
    [ 'group', props.className ] : [ 'group']

  return (
    <li
      className={classNames.join(' ')}>
      <ul>
        {props.children}
      </ul>
    </li>
  );

}

const MenuItem = props => {

  return (
    <li
      key={props.label}
      className={`option${props.disabled ? ' disabled' : '' }`}
      onClick={(props.disabled || !props.onSelect) ? null : props.onSelect}>

      {props.link ? 
        <a href={props.link}>
          {props.icon && <span className="icon">{props.icon}</span> } {props.label}
        </a>
        : 
        <span>
          {props.icon && <span className="icon">{props.icon}</span>} {props.label}
        </span>
      }
    </li>
  );

}

class Menu extends Component {

  constructor(props) {
    super(props);
    this.onMousedown = this.onMousedown.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMousedown, false);
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMousedown, false);
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onMousedown(evt) {
    const isClickOutside = !this._node.contains(evt.target);
    if (isClickOutside) this.props.onCancel();
  }

  onKeydown(evt) {
    if (evt.which === 27) this.props.onCancel();
  }

  render() {
    return (
      <div
        ref={n => this._node = n}
        className={`modal-menu ${this.props.className}`}>
        <ul>
          { this.props.children }
        </ul>
      </div>
    )
  }

}

Menu.Group = MenuGroup;
Menu.Item = MenuItem;

export default Menu;
