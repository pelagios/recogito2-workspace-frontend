import React, { Component } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';
import NumberFormat from 'react-number-format';

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

  createEmpty(num, toTimestamp) {
    const interval = 3600000 * 24 * 7; // 1 week

    const empty = new Array(num);
    empty.fill(0);

    const timestamps = empty.reduce((arr, _) => {
      const prev = arr[arr.length - 1];
      arr.push(prev - interval);
      return arr;
    }, [ toTimestamp - interval ]).reverse();

    return timestamps.map(timestamp => {
      return { timestamp: timestamp, value: 0 };
    });
  }

  padEdits(edits) {
    if (edits.length < 20) {
      const lastStamp = (edits.length > 0) ? edits[0].timestamp : new Date().getTime();
      const head = this.createEmpty(19 - edits.length, lastStamp);
      return head.concat(edits); 
    }

    return edits;
  }

  render() {
    const edits = (this.props.account) ? this.props.account.stats.over_time.map(obj => {
      return { timestamp: Date.parse(obj.date), value: obj.value };
    }) : null;

    const tickFormatter = (tick) => new Intl.DateTimeFormat('en-GB', {
      month: 'short'
    }).format(new Date(tick));
    
    console.log(this.props.account);

    return (
      <div className="sidebar">
        <div className="section">
          <Identity account={this.props.account} />
        </div>

        <div className="section compact edit-stats">
          <h2>Activity 
            {this.props.account && 
              <span className="count">
                <NumberFormat 
                  displayType="text"
                  value={this.props.account.stats.total_contributions}
                  thousandSeparator={true} /> edits
              </span>
            }
          </h2>
          {this.props.account && 
            <BarChart width={237} height={55} data={this.padEdits(edits)} barCategoryGap={1.5}>
              <XAxis 
                dataKey="timestamp"
                type="number"
                tick={{
                  fontSize:"12px",
                  color:"#3f3f3f",
                  
                  
                }}
                tickLine={{
                  stroke: '#c2c2c2', 
                  strokeWidth:1
                }}
                axisLine={{ 
                  stroke: '#c2c2c2',
                  strokeWidth:1
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