import React from 'react';

const VIEW_LABELS = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

const Breadcrumbs = props => {

  const title = props.view ? VIEW_LABELS[props.view] : props.label;

  return (
    <div className="breadcrumbs">
      <h2>
        <a className="root" href="#">{title}</a>
        {props.path && props.path.map(b => 
          <a className="folder" href={`#${b.id}`} key={b.id}>{b.title}</a>
        )}
      </h2>
      
      { props.docCount &&
        <span className="count">{`(${props.docCount})`}</span> }

      { props.children }
    </div>
  );

}

export default Breadcrumbs;