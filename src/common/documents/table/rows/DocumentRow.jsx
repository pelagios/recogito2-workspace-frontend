import React from 'react';
import NumberFormat from 'react-number-format';
import TimeAgo from 'react-timeago';

import BaseRowComponent from './BaseRowComponent';

/** Icons for possible content type values **/
const ICONS = {
  TEXT_PLAIN   : 'icon_text.png',
  TEXT_TEIXML  : 'icon_tei.png',
  IMAGE_UPLOAD : 'icon_image.png',
  IMAGE_IIIF   : 'icon_iiif.png',
  DATA_CSV     : 'icon_csv.png'
};

/** Formatting rules for possible field types **/
const FORMATTERS = {
  language: (language) => 
    language.toUpperCase(),

  uploaded_at: (datetime) => 
    new Intl.DateTimeFormat('en-GB', {
      year : 'numeric',
      month: 'short',
      day  : '2-digit'
    }).format(new Date(datetime)),
  
  last_edit_at: (datetime) => 
    <TimeAgo date={datetime} />,

  public_visibility: (visibility) => {
    if (visibility === 'PUBLIC') 
      return ( <span className="icon" title="Open to anyone">&#xf09c;</span> );
    else if (visibility === 'WITH_LINK')
      return ( <span className="icon" title="Open to anyone with the link">&#xf0c1;</span> );
    else 
      return ( <span className="icon" title="Private">&#xf023;</span> );
  },

  access_level: (level) => {
    if (level === 'ADMIN')
      return ( <span className="icon" title="ADMIN">&#xf0ad;</span> );
    else if (level === 'WRITE')
      return ( <span className="icon" title="WRITE">&#xf040;</span> );
    else
      return ( <span className="icon" title="READ">&#xf06e;</span> );
  },

  annotations: (annotations) =>
    <NumberFormat 
      displayType="text"
      value={annotations}
      thousandSeparator={true} />,

  status_ratio: (ratio) => {
    const total = ratio.verified + ratio.unverified + ratio.not_identifiable;
    const pctGreen = ratio.verified / total * 100;
    const pctYellow = ratio.not_identifiable / total * 100;

    const labels = {
      'verified': 'verified',
      'unverified': 'unverified',
      'not_identifiable': 'flagged'
    }

    const tooltip = ['verified', 'unverified', 'not_identifiable'].reduce((tooltip, next) => {
      const count = ratio[next];
      if (count === 0)
        return tooltip;
      else
        return `${tooltip} ${count} ${labels[next]},`;
    }, '').slice(0, -1);

    return (
      <span className="bar" title={tooltip}>
        <span className="verified" style={{ width: `${pctGreen}%` }} />
        <span className="not_identifiable" style={{ width: `${pctYellow}%` }} />
      </span>
    )
  }

};

/** Rules for aggregate fields **/
const AGGREGATE_FIELDS = {
  agg_document: (item) => (item.author) ?
                            `${item.author}, ${item.title}` : item.title
};

export default class DocumentRow extends BaseRowComponent {

  createAggregateField(url, field) {
    return (
      <a 
        key={field}
        href={url} 
        className={field.substring(4)}
        style={{ width: `${100 * super.getWidth(field)}%` }}>

        {AGGREGATE_FIELDS[field](this.props.item)}
      </a>
    )
  }

  createField(url, field) {
    const formatter = FORMATTERS[field];

    const value = this.props.item[field] !== undefined ? 
      (formatter ? formatter(this.props.item[field]) : this.props.item[field]) :
      ''; // empty value

    return (
      <a 
        key={field}
        href={url}
        className={field}
        style={{ width: `${100 * super.getWidth(field)}%` }}>{value}</a>
    )
  }

  render() {
    const type = this.props.item.filetypes[0];
    const url = `document/${this.props.item.id}/part/1/edit`;

    return (
      <div
        className={`row${(this.props.selected) ? ' selected' : ''}`}
        style={this.props.style}
        onClick={this.props.onClick} >
        
        { this.props.columns.map(field => field.startsWith('agg_') ? 
          this.createAggregateField(url, field) : this.createField(url, field)) }

        <span className={`type icon ${type}`}>
          <img src={`/assets/images/${ICONS[type]}`} alt={`icon type ${type}`} />
        </span>
      </div>
    )
  }

}
