import React, { Component } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

const VIEW_LABELS = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

export default class FolderBrowser extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.pageToState(props.page);
  }
  
  /** 
   * Reads a page object and converst the info to the state's
   * expected { currentFolder, subfolders } format.
   */
  pageToState = page => {
    const b = page.breadcrumbs;
    
    // Build currentFolder from breadcrumbs
    const currentFolder = b.length > 1 ? 
      { ...b[b.length - 1], parent: b[b.length - 2].id } : // has parent folder
      b.length > 0 ? b[b.length - 1] : null;

    // Filter items to folders only
    const subfolders = page.items.filter(item => item.type === 'FOLDER');

    return { 
      currentFolder,
      subfolders,
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

  navigateUp = () => {
    const goUp = () => {
      const { currentFolder } = this.state;
      if (this.currentFolder)
        this.goToFolder(currentFolder.parent);      
      else
        this.goToFolder(); // Root  
    }

    this.setState({ transition: 'UP'}, goUp);
  }

  navigateInto = (folderId, evt) => {
    evt.stopPropagation(); // Avoid select

    const goInto = () => {
      this.goToFolder(folderId);
    }

    this.setState({ transition: 'INTO'}, goInto);
  }

  render() {
    const folders = this.state.subfolders.map(f => 
      <li 
        key={f.id}
        className={this.state.selected === f.id ? 'selected' : undefined}
        onClick={() => this.select(f.id)}>{f.title}
        { f.has_subfolders && 
          <button 
            className="nostyle icon" 
            onClick={evt => this.navigateInto(f.id, evt)}>&#xe684;</button> }
      </li>
    );

    return (
      <div className="clicktrap">
        <div className="modal-wrapper">
          <Draggable handle=".header">
            <div className="modal folder-browser">
              <div className="header">
                { this.state.currentFolder && 
                  <button
                    className="nostyle icon up"
                    onClick={this.navigateUp}>&#xe686;</button>
                }

                <span className="title">
                  { this.state.currentFolder ? this.state.currentFolder.title : VIEW_LABELS[this.props.view] }
                </span>

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
                      key={this.state.currentFolder ? this.state.currentFolder.id : this.props.view}>{folders}</ul>

                </ReactCSSTransitionReplace>
              </div>

              <div className="footer">
                <button 
                  className="btn"
                  disabled={this.state.selected === null}>Move here</button>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }

}