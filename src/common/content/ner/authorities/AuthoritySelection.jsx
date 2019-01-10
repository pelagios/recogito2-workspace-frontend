import React, { Component } from 'react';

export default class AuthoritySelection extends Component {

  onChange(identifier) {   
    const selection = this.props.selected; 
    const currentIdx = selection.indexOf(identifier);

    if (currentIdx < 0)
      selection.push(identifier);
    else
      selection.splice(currentIdx, 1); 

    this.props.onChange(selection);
  }

  render() {    
    return (
      <div className="authorities">
        <h2>Authority Files</h2>

        <input
          type="checkbox" 
          id="use-all-authorities"
          checked={this.props.useAll} 
          onChange={this.props.onToggleAll} />
        <label htmlFor="use-all-authorities">identify entities against all available authority files</label>

        <div className={`authority-list${this.props.useAll ? ' disabled' : ''}`}>
          <table>
            <tbody>
              {this.props.authorities.map(authority => 
                <tr key={authority.identifier}>
                  <td>
                    <input 
                      type="checkbox" 
                      id={authority.identifier} 
                      checked={this.props.selected.includes(authority.identifier)} 
                      onChange={this.onChange.bind(this, authority.identifier)} />
                    <label htmlFor={authority.identifier} />
                  </td>

                  <td className="shortname">
                    <span style={{ backgroundColor: authority.color}}>
                      {authority.homepage ? 
                        <a href={authority.homepage} 
                          target="_blank"
                          rel="noopener noreferrer">{authority.shortname}</a>
                        : 
                        authority.shortname
                      }
                    </span>
                  </td>

                  <td className="fullname">
                    {authority.fullname}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}
