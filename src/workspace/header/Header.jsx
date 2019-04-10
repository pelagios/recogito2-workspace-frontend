import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Search from './search/Search.jsx';
import HeaderIcon from '../../common/content/HeaderIcon.jsx';
import Selection from '../../common/content/Selection.js';
import Breadcrumbs from '../../common/content/Breadcrumbs.jsx';
import MenuPopup from '../../common/components/MenuPopup.jsx';
import DeleteAction from '../actions/DeleteAction.jsx';
import NERAction from '../actions/NERAction.jsx';
import API from '../API';

import ShareModal from '../../common/content/share/ShareModal.jsx';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: null,
      menuVisible: false
    };

    document.body.addEventListener('keydown', this.onKeydown.bind(this), false);
  }

  onKeydown(evt) {
    if (this.props.selection.length > 0 && evt.which === 46)
      this.startDeleteAction();
  }

  /** User clicked the DELETE button in the mini-menu */
  startDeleteAction() {
    const deleteAction =
      <DeleteAction
        view={this.props.view}
        selection={this.props.selection}
        onStart={this.props.onDelete}
        onSuccess={this.onDeleteSuccess.bind(this)}
        onError={this.onDeleteError.bind(this)}
        onCancel={this.cancelAction.bind(this)} />

    this.setState({ action: deleteAction });
  }

  /** User clicked CANCEL in the warning prompt **/
  cancelAction() {
    this.setState({ action: null });
  }

  /** Delete executed successfully **/
  onDeleteSuccess() {
    this.setState({ action: null }, () => {
      this.props.afterAction();
    });
  }

  onDeleteError(error) {
    this.setState({ action: null }, () => {
      this.props.afterAction(); // TODO error message
    });
  }

  handleNERComplete() {
    setTimeout(() => this.props.afterAction(), 500);
  }

  showActionsMenu() {
    this.setState({ menuVisible: true });
  }

  actionStarted(jobId) {
    this.setState({ action: null });
  }

  onSelectMenuOption(option) { 
    this.setState({ menuVisible: false });

    const firstSelected = this.props.selection[0];

    if (option === 'OPEN') {
      if (Selection.isSingleDocument(this.props.selection)) 
        window.location.href= `document/${firstSelected.id}/part/1/edit`;
      else if (Selection.isSingleFolder(this.props.selection))
        window.location.hash = firstSelected.id;
    } else if (option === 'OPEN_TAB') {
      if (Selection.isSingleDocument(this.props.selection)) 
        window.open(`document/${firstSelected.id}/part/1/edit`, '_blank');
    } else if (option === 'DUPLICATE') {
      this.props.onDelete(); // Hack...
      API.duplicateDocument(firstSelected.id).then(() => {
        this.props.afterAction();
      });
    } else if (option === 'DELETE') {
      this.startDeleteAction();
    } else if (option === 'SHARE') {
      this.setState({ action: 
        <ShareModal 
          selection={this.props.selection}
          onCancel={this.cancelAction.bind(this)} /> 
      });
    } else if (option === 'NER') {
      this.setState({ action: 
        <NERAction
          selection={this.props.selection}
          onStarted={this.actionStarted.bind(this)}
          onComplete={this.handleNERComplete.bind(this)}
          onCancel={this.cancelAction.bind(this)} 
          onClose={this.cancelAction.bind(this)} /> 
      });
    }
  }

  onCancelMenu() {
    this.setState({ menuVisible: false });
  }

  render() {
    const isOpen = this.props.selection.length > 0;

    return (
      <div className={this.props.readme ? "header" : "header no-readme"}>
        <div className="top-row">
          <Search/>
          <div className="header-icons">
            <HeaderIcon icon="&#xe64a;" className="help stroke7" link="/help" />
          </div>
        </div>
        <div className="subheader">
          <Breadcrumbs 
            view={this.props.view}
            path={this.props.breadcrumbs}
            count={this.props.docCount}>

            {!this.props.readme && this.props.view === 'MY_DOCUMENTS' &&
              <button 
                className="add-abstract nostyle"
                onClick={this.props.onCreateReadme} >
                <span className="icon">&#xf055;</span>
                <span className="label">Add a description...</span>
              </button>
            }
          </Breadcrumbs>

          <div className="subheader-icons">
            <CSSTransition
              in={isOpen} 
              timeout={500} 
              classNames="selection-actions">

              <div 
                className="selection-actions"
                onClick={this.showActionsMenu.bind(this)}>              
                <span className="label">Options</span>
                <span className="more icon">&#xf078;</span>
              </div>
            </CSSTransition>

            {this.state.menuVisible &&
              <MenuPopup
                className="selection-actions-menu"
                menu={[
                  { group: 'open', options: [
                    { label: 'Open', value: 'OPEN', disabled: !Selection.isSingleSelection(this.props.selection) },
                    { label: 'Open in new tab', value: 'OPEN_TAB', disabled: !Selection.isSingleDocument(this.props.selection) }
                  ]},
                  { group: 'file-ops', options: [
                    { icon: '\uf114', label: 'Move to', value: 'MOVE_TO', disabled: true },
                    { icon: '\uf0c5', label: 'Duplicate', value: 'DUPLICATE', disabled: !Selection.isSingleDocument(this.props.selection) },
                    { icon: '\uf014', label: 'Delete', value: 'DELETE' }
                  ]},
                  { group: 'share', options: [
                    { 
                      icon: '\uf234', 
                      label: 'Share', 
                      value: 'SHARE', 
                      disabled: !(
                        Selection.isSingleFolder(this.props.selection) && 
                        this.props.view === 'MY_DOCUMENTS'
                      )
                    }
                  ]},
                  { group: 'jobs', options: [
                    { 
                      icon: '\uf085', 
                      label: 'Named Entity Recognition', 
                      value: 'NER', 
                      disabled: !Selection.includesText(this.props.selection) 
                    }
                  ]}
                ]} 
                onSelect={this.onSelectMenuOption.bind(this)}
                onCancel={this.onCancelMenu.bind(this)} />
            }

            <HeaderIcon
              className="presentation-toggle stroke7"
              icon={(this.props.presentation === 'TABLE') ? '\ue645' : '\ue636'} 
              onClick={this.props.onTogglePresentation} />

            {this.state.action}
          </div>
        </div>
      </div>
    )
  }

}
