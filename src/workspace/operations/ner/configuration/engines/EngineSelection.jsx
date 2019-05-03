import React, { Component } from 'react';

export default class EngineSelection extends Component {

  render() {
    return (
      <div className="engines">
        <h2>Recognition Engines</h2>
        <table cellSpacing="0">
          <tbody>
            {this.props.engines.map((engine, idx) =>
              <React.Fragment key={idx}>
                <tr>
                  <td className="name">
                    <input 
                      id={engine.identifier}
                      type="radio" 
                      group="engines" 
                      checked={this.props.selected === engine.identifier}
                      onChange={this.props.onChange.bind(this, engine.identifier)} />
                    
                    <label htmlFor={engine.identifier}>
                      <span className="name">{engine.name}</span>
                    </label>
                  </td>

                  <td className="languages">
                    { engine.languages.map(lang => <span key={lang}>{lang}</span>) }
                  </td>

                  <td className="description">
                    {engine.description}
                  </td>
                </tr>
                
                <tr className="spacer"></tr>
              </React.Fragment>
            )}
          </tbody>
        </table>
        <p className="note">
          Note: different engines can provide different results and are generally 
          optimized for a specific language.
        </p>
      </div>
    )
  }

}
