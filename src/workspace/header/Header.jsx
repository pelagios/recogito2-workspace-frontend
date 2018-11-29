import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Search from './search/Search.jsx';
import HeaderIcon from '../../common/content/HeaderIcon.jsx';
import Breadcrumbs from '../../common/content/Breadcrumbs.jsx';
import DeleteAction from '../actions/DeleteAction.jsx';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: null 
    };

    document.body.addEventListener('keydown', this.onKeydown.bind(this), false);
  }

  onKeydown(evt) {
    if (this.props.selection.length > 0 && evt.which === 46)
      this.setState({ action: 'DELETE' });
  }

  /** User clicked the DELETE button in the mini-menu */
  startDeleteAction() {
    this.setState({ action: 'DELETE' });
  }

  /** User clicked CANCEL in the warning prompt **/
  cancelDelete() {
    this.setState({ action: null });
  }

  /** Delete executed successfully **/
  onDeleteSuccess() {
    this.setState({ action: null }, () => {
      this.props.afterDelete();
    });
  }

  onDeleteError(error) {
    this.setState({ action: null }, () => {
      this.props.afterDelete(); // TODO error message
    });
  }

  render() {
    const isOpen = this.props.selection.length > 0;

    return (
      <div className={this.props.readme ? "header" : "header no-readme"}>
        <div className="top-row">
          <Search/>
          <div className="header-icons">
            <HeaderIcon icon="&#xe64a;" className="help stroke7" link="/help" />
            {/* <HeaderIcon icon="&#xe8ae;" className="stats" />
            <HeaderIcon icon="&#xe8c1;" className="notifications" /> */}
          </div>
        </div>
        <div className="subheader">
          <Breadcrumbs 
            view={this.props.view}
            path={this.props.breadcrumbs}
            count={this.props.docCount}>

            {!this.props.readme &&
              <button 
                className="add-abstract nostyle"
                onClick={this.props.onCreateReadme} >
                Add description...
              </button>
            }
          </Breadcrumbs>

          <div className="subheader-icons">
            <CSSTransition
              in={isOpen} 
              timeout={500} 
              classNames="selection-actions">

              <div className="selection-actions">              
                {/* <span className="share icon">&#xf234;</span> */}

                <span
                  className="delete icon" 
                  onClick={this.startDeleteAction.bind(this)}>&#xf014;</span>

                {/* <span className="more icon">&#xf078;</span> */}
              </div>
            </CSSTransition>

            <HeaderIcon
              className="presentation-toggle stroke7"
              icon={(this.props.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
              onClick={this.props.onTogglePresentation} />

            {this.state.action === 'DELETE' &&
                <DeleteAction
                  view={this.props.view}
                  selection={this.props.selection}
                  onStart={this.props.onDelete}
                  onSuccess={this.onDeleteSuccess.bind(this)}
                  onError={this.onDeleteError.bind(this)}
                  onCancel={this.cancelDelete.bind(this)} />
            }
          </div>
        </div>
      </div>
    )
  }

}
