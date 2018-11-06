import React, { Component } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import API from '../API.js';
import Avatar from '../../common/content/Avatar.jsx';
import Identity from '../../common/content/Identity.jsx';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { collaborators: [] }

    this.fetchCollaborators(props);
  }

  componentWillReceiveProps(props) {
    this.fetchCollaborators(props);
  }

  fetchCollaborators(props) {
    if (props.account && props.account.username)
      API
        .fetchCollaborators(props.account.username)
        .then(result => this.setState({ collaborators: result.data }));
  }

  padEdits() {
    const interval = 3600000 * 24 * 7; // 1 week

    const empty = new Array(19);
    empty.fill(0);

    const timestamps = empty.reduce((arr, _) => {
      const prev = arr[arr.length - 1];
      arr.push(prev - interval);
      return arr;
    }, [ new Date().getTime() ]).reverse();

    return timestamps.map(timestamp => {
      return { timestamp: timestamp, value: Math.random() };
    });
  }

  render() {
    const edits = (this.props.account) ? this.props.account.stats.over_time.map(obj => {
      return { timestamp: Date.parse(obj.date), value: obj.value };
    }) : null;

    const tickFormatter = (tick) => new Intl.DateTimeFormat('en-GB', {
      month: 'short'
    }).format(new Date(tick));
    
    return (
      <div className="sidebar">
        <div className="section">
          <Identity account={this.props.account} />
        </div>

        <div className="section compact edit-stats">
          <h2>Activity <span className="count">3,412 edits</span></h2>
          {this.props.account && 
            <BarChart width={237} height={55} data={this.padEdits()}>
              <XAxis 
                dataKey="timestamp"
                type="number"
                tick={{
                  fontSize:"12px",
                  color:"#3f3f3f",
                  
                  
                }}
                tickLine={{
                  stroke: '#3f3f3f' 
                }}
                axisLine={{ 
                  stroke: '#3f3f3f' 
                }}
                tickSize={4}
                tickCount={6}
                height={20}
                tickFormatter={tickFormatter}
                domain={['dataMin', 'dataMax']}
                padding={{ left: 5, right: 4 }}
                 />
              <Bar dataKey="value" fill="#4483c4" />
            </BarChart>
          }
        </div>

        <div className="section compact">
          <div className="collaborators">
            <h2>Top collaborators</h2>
            <ul>
              {this.state.collaborators.map(user => 
                <li key={user.username}>
                  <a href={`/${user.username}`} title={user.username}><Avatar username={user.username} /></a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}