import React, { Component } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import NumberFormat from 'react-number-format';

const LINE_STYLE = {
  stroke: '#c2c2c2', 
  strokeWidth:1
}

const AXIS_STYLE = {
  fontSize:"12px",
  color:"#3f3f3f"
}

const WEEK = 3600000 * 24 * 7; // A week in milliseconds

const tickFormatter = (tick) => new Intl.DateTimeFormat('en-GB', {
  month: 'short'
}).format(new Date(tick));

export default class ActivityWidget extends Component {

  /** Helper that generates an empty time series of N buckets with value 0 */
  createEmptySeries(n, toTimestamp) {
    const empty = new Array(n);
    empty.fill(0); // Needs to contain *something* for .reduce to work

    const timestamps = empty.reduce((arr, _) => {
      const last = arr[arr.length - 1];
      arr.push(last - WEEK);
      return arr;
    }, [ toTimestamp - WEEK ]).reverse();

    return timestamps.map(timestamp => {
      return { timestamp: timestamp, value: 0 };
    });
  }

  padTimeseries(t) {
    const toTime = t.length > 0 ? t[0].timestamp : new Date().getTime();
    const padding = this.createEmptySeries(19 - t.length, toTime);
    return padding.concat(t);
  }

  computeChart() {
    // Data comes as ISO strings - convert
    const timeseries = this.props.stats.over_time.map(t => {
      return { timestamp: Date.parse(t.date), value: t.value };
    });

    if (timeseries.length < 20) {
      return this.padTimeseries(timeseries);
    } else {
      return timeseries;
    }
  }

  render() {
    return (
      <div className={this.props.className ? 
        `activity-widget ${this.props.className}` : "activity-widget"}>

        <h2>Activity 
          {this.props.stats && 
            <span className="count">
              <NumberFormat 
                displayType="text"
                value={this.props.stats.total_contributions}
                thousandSeparator={true} /> edits
            </span>
          }
        </h2>

        {this.props.stats &&
          <BarChart 
            width={this.props.width} 
            height={this.props.height} 
            barCategoryGap={1.5}
            data={this.computeChart()} >

            <CartesianGrid 
              strokeDasharray="3" 
              horizontal={false}/>

            <XAxis 
              type="number"
              dataKey="timestamp"

              axisLine={LINE_STYLE} 

              tick={AXIS_STYLE}
              tickSize={4}
              tickCount={6}
              tickLine={LINE_STYLE}
              tickFormatter={tickFormatter}

              height={20}
              domain={['dataMin', 'dataMax']}
              padding={{ left: 5, right: 5 }} />

            <Bar 
              dataKey="value" 
              fill={this.props.fill} />

          </BarChart>
        }
      </div>
    )
  }

}