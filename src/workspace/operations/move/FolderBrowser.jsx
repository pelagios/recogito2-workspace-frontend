import React, { Component } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Icons from '../../../common/documents/table/rows/TypeIcons';

const TITLES = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

const FolderItem = props => (
  <li
    className={props.selected ? 'folder selected' : 'folder'}
    onClick={() => props.onSelect(props.item.id)}>{props.item.title}
    { props.item.has_subfolders && 
      <button 
        className="nostyle icon" 
        onClick={evt => props.onNavigateInto(props.item.id, evt)}>&#xe684;</button> }
  </li>
)


const DisabledDocumentItem = props =>  {

  const docType = props.item.filetypes[0];

  return (
    <li className="document">
      <img src={`/assets/images/${Icons.get(docType)}`} alt={`icon type ${docType}`} />
      {props.item.title}
    </li>
  )
}

export default class FolderBrowser extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.pageToState(props.page);
  }
  
  /** 
   * Reads a page object and converst the info to the state's
   * expected { location, subfolders } format.
   */
  pageToState = page => {
    const b = page.breadcrumbs;
    
    // Build location from breadcrumbs
    const location = b.length > 1 ? 
      { ...b[b.length - 1], parent: b[b.length - 2].id } : // has parent folder
      b.length > 0 ? b[b.length - 1] : 'ROOT';

    return { 
      location, // 'VIEWS', 'ROOT' or folder object
      items: page.items,
      selected: null,
      transition: null
    };
  }

  select = id => this.setState({ selected: id });

  goToFolder = id => {
    const url = 
      this.props.view === 'MY_DOCUMENTS' ? 
        ( id ? `/api/directory/my/${id}` : '/api/directory/my' ) :
        ( id ? `/api/directory/my/shared/${id}` : '/api/directory/my/shared');

    axios.get(url).then(result => {
      this.setState(this.pageToState(result.data));
    });
  }

  goToViewsOverview = () => {
    this.setState({
      location: 'VIEWS',
      items: [
        { title: 'My Documents', has_subfolders: true }
      ],
      selected: null,
      transition: null
    });
  }

  navigateUp = () => {
    const goUp = () => {
      const { location } = this.state;
      if (location === 'ROOT') // root level of current view
        this.goToViewsOverview();        
      else
        this.goToFolder(location.parent);      
    }

    this.setState({ transition: 'UP'}, goUp);
  }

  navigateInto = (folderId, evt) => {
    evt.stopPropagation(); // Avoid select
    const goInto = () => this.goToFolder(folderId);
    this.setState({ transition: 'INTO'}, goInto);
  }

  move = () => {
    const { selection } = this.props;
    const destination = this.state.selected;

    const documents = selection.getDocuments();
    const folders = selection.getFolders();

    const fDocs = documents.length > 0 ?
      axios.put('/api/document/bulk', {
        action: 'MOVE_TO', 
        destination,
        documents: this.props.selection.getDocuments().map(d => d.id)
      }) : Promise.resolve();

    const fFolders = folders.length > 0 ? 
      axios.put('/api/folder/bulk', {
        action: 'MOVE_TO', 
        destination,
        folders: this.props.selection.getFolders().map(d => d.id)
      }) : Promise.resolve();

    Promise.all([ fDocs, fFolders ]).then(() => this.props.onComplete());
  }

  render() {
    const title = 
      this.state.location === 'VIEWS' ? 'Workspace' :
        this.state.location === 'ROOT' ? TITLES[this.props.view] : this.state.location.title;

    const key = 
      this.state.location.id ? this.state.location.id : this.state.location;

    const items = this.state.items.map(f => f.type === 'DOCUMENT' ?
      <DisabledDocumentItem
        key={f.id ? f.id : f.title}
        item={f} /> :

      <FolderItem 
        key={f.id ? f.id : f.title}
        item={f}
        selected={this.state.selected === f.id}
        onSelect={this.select}
        onNavigateInto={this.navigateInto} />
    );

    return (
      <div className="clicktrap">
        <div className="modal-wrapper">
          <Draggable handle=".header">
            <div className="modal folder-browser">
              <div className="header">
                { this.state.location !== 'VIEWS' && 
                  <button
                    className="nostyle icon up"
                    onClick={this.navigateUp}>&#xe686;</button>
                }

                <span className="title">{title}</span>

                <button
                  className="nostyle icon cancel"
                  onClick={this.props.onCancel}>&#xe680;</button>
              </div>

              <div className="body">
                <ReactCSSTransitionReplace
                  transitionName="wipe"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}>

                  <ul className={this.state.transition === 'UP' ? 'up' : 'into'}
                      key={key}>{items}</ul>

                </ReactCSSTransitionReplace>
              </div>

              <div className="footer">
                <button 
                  className="btn"
                  disabled={this.state.selected === null}
                  onClick={this.move}>Move here</button>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }

}

