import React, { Component } from 'react';
import ShineBrowser from "react-shine-api";

class SHINEModal extends Component {

  SHINEFileUpload = files => {
    let convertedFiles = [];

    // convert strings to file
    files.forEach(file => {
      var newFile = new File([file.content], `${file.name || 'rise_file'}.txt`, {
        type: "text/plain",
      });
      convertedFiles.push(newFile);
    });

    this.props.onUploadFiles(convertedFiles);
  }

  handleSHINEModalClick = (e) => {
    if(e.target.id !== 'shinemodal') return;
    this.props.onClose();
  }

  render() {
    return(
      <div 
        style={styles.shineModal} 
        id="shinemodal" 
        onClick={this.handleSHINEModalClick}>

        <div style={styles.shineBrowserContainer}>
          <ShineBrowser
            styles={{
              primary: "#4483C4",
              borderRadius: 2,
              fontFamily: 'Assistant',
              text: '#3f3f3f'
            }}
            close={this.props.onClose}
            handleFileUpload={this.SHINEFileUpload}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  shineModal: {
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shineBrowserContainer: {
    maxHeight: 800,
    maxWidth: 1200,
    margin: 20,
    width: '100%',
    height: '100%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.35)'
  }
}

export default SHINEModal;