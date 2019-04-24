import React from 'react';

const ViewListItem = props => {

  return (
    <li
      className={props.current ? 'current' : null}
      onClick={props.onClick}>
      <span className="icon">{props.icon}</span> {
        props.children
      }
    </li>
  );

}

const Views = props => {
  
  return (
    <div className="section views">
      <ul>
        <ViewListItem
          icon="&#xf2be;"
          current={props.view === 'MY_DOCUMENTS'}
          onClick={() => props.onChangeView('MY_DOCUMENTS')}>
          My Documents
        </ViewListItem>

        <ViewListItem
          icon="&#xf064;"
          current={props.view === 'SHARED_WITH_ME'}
          onClick={() => props.onChangeView('SHARED_WITH_ME')}>
          Shared with me
        </ViewListItem>
      </ul>
    </div>
  );

}

export default Views;