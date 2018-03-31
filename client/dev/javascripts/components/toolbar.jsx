import React from 'react';

class Toolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <img id="add-file" src="icons/plus.png" onClick={() => this.props.addFile()}/>
        {this.props.fileOpen &&
          <img id="remove-file" src="icons/delete.png" onClick={() => this.props.deleteFile()}/>
        }
        {this.props.fileOpen &&
          <img id="remove-file" src="icons/back.png" onClick={() => this.props.leaveFile()}/>
        }
      </div>
    )
  }
}
