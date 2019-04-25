import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Breadcrumbs from './Breadcrumbs';
import HeaderIcon from './HeaderIcon';
import Menu from  '../../common/Menu';
import Search from './search/Search';

const OptionsMenu = props => {

  const canDuplicate = // Single document in my workspace
    props.selection.isSingleDocument() && props.view === 'MY_DOCUMENTS';

  const canShare = // Single folder in my workspace
    props.selection.isSingleFolder() && props.view === 'MY_DOCUMENTS';

  return (
    <Menu className="selection-actions-menu">
      <Menu.Group name="open">
        <Menu.Item label="Open" disabled={!props.selection.isSingleSelection()} />
        <Menu.Item label="Open in new tab" disabled={!props.selection.isSingleDocument()} />
      </Menu.Group>
      
      <Menu.Group name="file-ops">
        <Menu.Item icon={'\uf114'} label="Move to" disabled/>
        <Menu.Item icon={'\uf0c5'} label="Duplicate" disabled={!canDuplicate} />
        <Menu.Item icon={'\uf014'} label="Delete"/> 
      </Menu.Group>

      <Menu.Group name="share">
        <Menu.Item icon={'\uf234'} label="Share" disabled={!canShare} />
      </Menu.Group>

      <Menu.Group name="jobs">
        <Menu.Item icon={'\uf085'} label="Named Entity Recognition" disabled={!props.selection.includesText()} />
      </Menu.Group>
    </Menu>
  );

}


export default class Header extends Component {

  state = {
    optionsMenuVisible: false
  }

  showOptionsMenu = () => {
    this.setState({ optionsMenuVisible: true });
  }

  render() {
    const hasSelection = !this.props.selection.isEmpty();

    return (
      <div className={this.props.readme ? "header" : "header no-readme"}>
        <div className="top-row">
          <Search
            tableConfig={this.props.tableConfig} 
            onResponse={this.props.onSearchResponse} />

          <div className="header-icons">
            <HeaderIcon icon="&#xe64a;" className="help stroke7" link="/help" />
          </div>
        </div>

        <div className="main-header">
          <Breadcrumbs 
            view={this.props.view}
            path={this.props.breadcrumbs}
            docCount={this.props.docCount}>

            {!this.props.readme && this.props.view === 'MY_DOCUMENTS' &&
              <button 
                className="add-abstract nostyle"
                onClick={this.props.onCreateReadme} >
                <span className="icon">&#xf055;</span>
                <span className="label">Add a description...</span>
              </button>
            }
          </Breadcrumbs>

          <div className="main-header-icons">
           <CSSTransition
              in={hasSelection} 
              timeout={200} 
              classNames="selection-options">

              <div 
                className="selection-options"
                onClick={this.showOptionsMenu}>              
                <span className="label">Options</span>
                <span className="more icon">&#xf078;</span>
              </div>
            </CSSTransition>

            { this.state.optionsMenuVisible &&
              <OptionsMenu view={this.props.view} selection={this.props.selection} /> }

            <HeaderIcon
              className="presentation-toggle stroke7"
              icon={this.props.presentation === 'TABLE' ? '\ue645' : '\ue636'} 
              onClick={this.props.onTogglePresentation} />
          </div>
        </div>
      </div>
    )
  }

}