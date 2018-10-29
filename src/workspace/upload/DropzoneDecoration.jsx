import React, { Component } from 'react';
import posed from 'react-pose';

const AnimatedDiv = posed.div({
  open:   { 
    bottom: '30px',
    transition: {
      ease: 'easeOut',
      duration:200
    }
  },
  closed: { bottom: '-140px' }
});

export default class DropzoneDecoration extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true });
  }

  render() {
    return (
      <div className="dropzone-decoration">
        <AnimatedDiv className="inner" pose={this.state.visible ? 'open' : 'closed'}>
          <span className="icon">&#xf0ee;</span>
          <p className="instructions">
            Drop files or IIIF manifest URLs to add them to your workspace.
          </p>
          <p className="supported">
            Supported formats: plain text (UTF-8), TEI/XML, image files, CSV (UTF-8)
          </p>
        </AnimatedDiv>
      </div>
    )
  }

}
