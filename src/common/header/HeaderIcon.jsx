import React from 'react';

const HeaderIcon = props => {

  return (
    <div
      className={`header-icon ${props.className}`}
      onClick={props.onClick}>
      {(props.link) ? 
        <a href={props.link} className="icon inner">
          {props.icon}
        </a> :

        <span className="icon inner">
          {props.icon}
        </span>
      }
    </div>
  );

}

export default HeaderIcon;