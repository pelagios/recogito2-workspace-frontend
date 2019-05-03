import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../../../../common/Modal';
import AuthoritySelection from './authorities/AuthoritySelection';
import EngineSelection from './engines/EngineSelection';

export default class NERModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      available_engines: [],
      available_authorities: [],

      selected_engine: null,
      selected_all_authorities: true,
      selected_authorities: []
    };

    this.initAvailableAuthorities();
    this.initAvailableEngines();
  }

  isInitComplete() {
    return this.state.available_engines.length > 0 &&
      this.state.available_authorities.length > 0;
  }

  initAvailableEngines() {
    if (this.state.available_engines.length === 0)
      axios.get('/api/plugins/ner')
        .then(result => {
          const diff = { available_engines: result.data };

          if (!this.state.selected_engine) // Select first as default
            diff.selected_engine = result.data[0] && result.data[0].identifier;

          this.setState(diff);
        });
  }

  initAvailableAuthorities() {
    axios.get('/api/authorities/gazetteers')
      .then(result => {
        const diff = { available_authorities: result.data };

        if (this.state.selected_all_authorities || 
             (!this.state.selected_all_authorities && this.state.selected_authorities.length === 0))
          diff.selected_authorities = result.data.map(a => a.identifier);

        this.setState(diff);
      });
  }

  changeEngine(identifier) {
    this.setState({ selected_engine: identifier });
  }

  toggleAllAuthorities() {
    this.setState(prev => {
      return { selected_all_authorities: !prev.selected_all_authorities }
    });
  }

  changeAuthorities(authorities) {
    this.setState({ selected_authorities: authorities });
  }

  onStart() {
    const response = { engine: this.state.selected_engine };

    if (this.state.selected_all_authorities)
      response.all_authorities = true;
    else 
      response.authorities = this.state.selected_authorities;

    this.props.onStart(response);
  }

  render() {
    return (
      <Modal
        className="ner" 
        title="Named Entity Recognition (NER)"
        onClose={this.props.onCancel}>

        <p>
          NER identifies places and persons in your text automatically. 
          Depending on the length of your text, this may take a while. 
        </p>

        <EngineSelection 
          engines={this.state.available_engines} 
          selected={this.state.selected_engine}
          onChange={this.changeEngine.bind(this)} />

        <AuthoritySelection 
          authorities={this.state.available_authorities} 
          useAll={this.state.selected_all_authorities}
          selected={this.state.selected_authorities}
          onToggleAll={this.toggleAllAuthorities.bind(this)} 
          onChange={this.changeAuthorities.bind(this)} />

        <div className="buttons">
          <button
            className="btn start"
            onClick={this.onStart.bind(this)}>Start NER</button>

          <button 
            className="btn outline cancel"
            onClick={this.props.onCancel}>Cancel</button>
        </div>
      </Modal>
    )
  }

}
