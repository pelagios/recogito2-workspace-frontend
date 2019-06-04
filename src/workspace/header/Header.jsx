import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Breadcrumbs from '../../common/header/Breadcrumbs';
import HeaderIcon from '../../common/header/HeaderIcon';
import Menu from  '../../common/Menu';
import Search from './search/Search';

const OptionsMenu = props => {

  const canDuplicate = // Single document in my workspace
    props.selection.isSingleDocument() && props.view === 'MY_DOCUMENTS';

  const canShare = // Single folder in my workspace
    props.selection.isSingleFolder() && props.view === 'MY_DOCUMENTS';

  const openInNewTab = () => {
    window.open(`document/${props.selection.get(0).id}/part/1/edit`, '_blank');
    props.onCancel();
  }

  // TODO probably worth splitting this up into a separate source file, or
  // perhaps two (one OptionsMenu container & one presentational component)
  return (
    <Menu 
      className="selection-options-menu"
      onCancel={props.onCancel}>

      <Menu.Group>
        <Menu.Item 
          label="Open" 
          disabled={!props.selection.isSingleSelection()} 
          link={props.selection.isSingleSelection() && `document/${props.selection.get(0).id}/part/1/edit`} />

        <Menu.Item 
          label="Open in new tab" 
          disabled={!props.selection.isSingleDocument()} 
          onSelect={openInNewTab} />
      </Menu.Group>
      
      <Menu.Group>
        <Menu.Item
          icon={'\uf114'}
          label="Move to"
          onSelect={props.onMoveSelection} />

        <Menu.Item
          icon={'\uf0c5'}
          label="Duplicate"
          disabled={!canDuplicate}
          onSelect={props.onDuplicateSelection} />

        <Menu.Item 
          icon={'\uf014'} 
          label="Delete"
          onSelect={props.onDeleteSelection} /> 
      </Menu.Group>

      <Menu.Group>
        <Menu.Item 
          icon={'\uf234'}
          label="Share" 
          disabled={!canShare} 
          onSelect={props.onShareSelection} />
      </Menu.Group>

      <Menu.Group>
        <Menu.Item 
          icon={'\uf085'} 
          label="Named Entity Recognition" 
          disabled={!props.selection.includesText()} 
          onSelect={props.onNER} />
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

  closeOptionsMenu = () => {
    this.setState({ optionsMenuVisible: false });
  }

  /** Helper that closes the menu and executes a select action **/
  closeAndThen = fn => {
    return args => {
      this.setState({ optionsMenuVisible: false });
      fn(args);
    }
  }

  render() {
    const hasSelection = !this.props.selection.isEmpty();

    return (
      <div className={this.props.readme ? "header" : "header no-readme"}>
        <div className="top-row">
          <Search
            account={this.props.account}
            view={this.props.view}
            presentation={this.props.presentation}
            searchScope={this.props.searchScope}
            tableConfig={this.props.tableConfig} 
            onResponse={this.props.onSearchResponse} 
            onQuit={this.props.onQuitSearch} />

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
              <OptionsMenu 
                view={this.props.view} 
                selection={this.props.selection} 
                onMoveSelection={this.closeAndThen(this.props.onMoveSelection)}
                onDuplicateSelection={this.closeAndThen(this.props.onDuplicateSelection)}
                onDeleteSelection={this.closeAndThen(this.props.onDeleteSelection)} 
                onShareSelection={this.closeAndThen(this.props.onShareSelection)}
                onNER={this.closeAndThen(this.props.onNER)}
                onCancel={this.closeOptionsMenu} /> }

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