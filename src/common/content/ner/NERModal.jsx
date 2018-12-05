import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/Modal.jsx';
import AuthoritySelection from './authorities/AuthoritySelection.jsx';
import EngineSelection from './engines/EngineSelection.jsx';

const AUTHORITIES = [
  { "identifier":"http://pleiades.stoa.org", "authority_type":"PLACE", "shortname":"Pleiades", "fullname":"Pleiades Gazetteer of the Ancient World", "homepage":"http://pleiades.stoa.org", "shortcode":"pleiades", "color":"#1f77b4" },
  { "identifier":"CHGIS_RDF_2016-07-07","authority_type":"PLACE","shortname":"CHGIS","fullname":"China Historical GIS","shortcode":"chgis","color":"#9467bd" },
  { "identifier":"dare-20180219","authority_type":"PLACE","shortname":"DARE","fullname":"Digital Atlas of the Roman Empire","homepage":"http://dare.ht.lu.se","shortcode":"dare","color":"#ff7f0e" },
  { "identifier":"http://www.geonames.org","authority_type":"PLACE","shortname":"GeoNames","fullname":"A subset of GeoNames populated places, countries and first-level administrative divisions","shortcode":"geonames","color":"#2ca02c" },
  { "identifier":"moeml_locations_geo","authority_type":"PLACE","shortname":"MoEML","fullname":"Map of Early Modern London","shortcode":"moeml","color":"#8c564b" },
  { "identifier":"indias_13k_slim","authority_type":"PLACE","shortname":"HGIS de las Indias","fullname":"Historical-Geographic Information System for Spanish America (1701-1808)","homepage":"https://www.hgis-indias.net/","shortcode":"indias","color":"#e64a19" }
];

export default class NERModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available_engines: [],
      available_authorities: [],

      selected_engine: null,
      selected_all_authorities: true,
      selected_authorities: [] // AUTHORITIES.map(a => a.identifier)
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
        console.log(result.data);
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
          authorities={AUTHORITIES} 
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
