import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Columns } from '../common/documents/table/Columns';
import { initialState, persistState } from './initialState';
import Profile from './Profile';

import '../../assets/style/profile/index.scss';

export default class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = initialState();

    this._profileOwner = (process.env.NODE_ENV === 'development') ? 'rainer' : window.location.pathname.substring(1);

    window.onhashchange = this.refreshPage;
  }

  componentDidMount() {
    const a = axios.get(`/api/account/${this._profileOwner}`).then(r => {
      this.setState({ visitedAccount: r.data });
    });

    const b = axios.get('/api/me').then(r => {
      this.setState({ me: r.data });
    });

    Promise.all([a, b]).then(() => this.refreshPage());
  }

  refreshPage = () => {
    this.setState({ busy: true });

    const folderId = document.location.hash.substring(1);

    const path = folderId ? 
      `${this._profileOwner}/${folderId}` :
      `${this._profileOwner}`;

    const config = this.state.presentation === 'GRID' ? null :
      {
        columns: Columns.expandAggregatedColumns(this.state.table_config.columns),
        sort: this.state.table_config.sorting
      }

    return axios.post(`/api/directory/${path}`, config).then(r => {
      const { breadcrumbs, readme, total_count, items } = r.data;
      this.setState(prev => {
        return { 
          page: {
            ...prev.page,
            ...{
              breadcrumbs,
              readme,
              total_count,
              items
            }
          },
          busy: false
        }
      })
    });
  }

  togglePresentation = () => {
    this.setState(prev => { 
      const presentation = (prev.presentation === 'TABLE') ? 'GRID' : 'TABLE';
      persistState('presentation', presentation);
      return { presentation: presentation };
    });
  }

  sortTable = (sorting) => {
    this.setState(prev => {
      const config = { ...prev.table_config, ...{ sorting: sorting } };
      persistState('table_config', config);
      return { table_config: config };
    }, () => {
      this.refreshPage();
    });      
  }

  changeColumConfig = columns => {
    this.setState(prev => { 
      const config = {...prev.table_config, ...{ columns: columns } };
      persistState('table_config', config);
      return { table_config: config };
    });
  }

  render() {
    return (
      <Profile 
        me={this.state.me} 
        visitedAccount={this.state.visitedAccount} />
    );
  }
}

render(<App />, document.getElementById('app'));
