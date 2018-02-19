import React from 'react';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fileOpen: false};
    this.setupSocket(this.props.socket);
  }
  setupSocket(socket) {
    socket.on('fileReq', () => {
      this.setState({fileOpen: true});
    });
    socket.on('currentFileCreated', () => {
      this.setState({fileOpen: true});
    });
    socket.on('deletedOpen', () => {
      this.setState({fileOpen: false});
    });
  }
  render() {
    return (
      <div id="toolbar">
        <img id="add-file" src="icons/plus.png" onClick={() => this.props.fileAdd()}/>
        {this.state.fileOpen &&
          <img id="remove-file" src="icons/delete.png" onClick={() => this.props.fileDelete()}/>
        }
      </div>
    )
  }
}

export default Toolbar;
