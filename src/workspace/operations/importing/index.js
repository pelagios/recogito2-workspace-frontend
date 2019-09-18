import React, { Component } from 'react';
import { render } from 'react-dom';
import Importer from './Importer';
import ModalForm from '../ModalForm';
import { importFromShine } from './shine';

/**
 * Basically a simple popup box with a text input field,
 * but with the added functionality that it's possible to
 * drag-and-drop a URL into the input field.
 */
class URLInputForm extends Component {

  state = {
    url : ''
  }

  onChange = evt => {
    this.setState({ url: evt.target.value });
  }

  onDrop = evt => {
    const url = evt.dataTransfer.getData('text');
    this.setState({ url: url });
  }

  onKeyPress = evt => {
    if (evt.which === 13) // Enter
      this.onOk();
  }

  onOk = () => {
    this.props.onOk(this.state.url);
  }

  render() {
    return (
      <ModalForm
        onOk={this.onOk}
        onCancel={this.props.onCancel}>
  
        <input 
          type="text" 
          autoFocus={true}
          placeholder="Paste or drag URL" 
          value={this.state.url}
          onChange={this.onChange} 
          onDrop={this.onDrop}
          onKeyPress={this.onKeyPress}/>
      </ModalForm>
    )
  }

} 

const promptForUrl = () => {

  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const done = url => { 
      container.remove();
      resolve(url);
    }

    render(
      <URLInputForm 
        onOk={done}
        onCancel={() => done()} />, container);
  });

}

const identifySource = url => {
  if (url.includes('request=GetPassage'))
    return 'CTS';
  else if (url.endsWith('.xml'))
    return 'TEI_XML';
  else if (url.includes('textgridlab.org'))
    return 'TEI_XML'; // Textgrid doesn't end links with .xml...
  else // to be extended later
    return 'IIIF';
}

const importContent = (files, remoteSource) => {
  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onComplete = () => {
      container.remove();
      resolve();
    }

    const onClose = result => {
      container.remove();
    }

    render(<Importer 
      files={files}
      remoteSource={remoteSource}
      onComplete={onComplete}
      onClose={onClose} />, container);
  });
}

/** Import a list of files **/
export const uploadFiles = files => {
  return importContent(files);
}

/** 
 * Import content from a remote source
 * 
 * Note that one argument (either type or URL) may be undefined. 
 * 
 * -) When a URL is imported via drag-and-drop, only the URL will be
 * provided (and we can use the 'identifySource' function to attempt
 * type identification)
 * 
 * -) When a source is imported via the sidebar menu option, only
 * the type will be provided & this class will provide (or delegate) the
 * import UI components.
 */
export const importSource = (typ, url) => {
  const sourceType = typ || identifySource(url);
  if (typ === 'SHINE') {
    return importFromShine().then(files => { 
      if (files)
        return uploadFiles(files);
    });
  } else if (url) {
    return importContent([], { url: url, sourceType: sourceType });
  } else {
    return promptForUrl().then(url => {
      if (url)
        return importContent([], { url: url, sourceType: sourceType });
    });
  }
}