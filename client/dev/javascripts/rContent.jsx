import React from 'react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.setupSocket(this.props.socket);
    this.state = {active: false, text: ""};
  }
  setupSocket(socket) {
    socket.on('fileReq', fileContent => {
      this.setState({text: fileContent, active: true});
    });
  }
  render() {
    if(!this.state.active)
      return null;
    else{
      return (
        <p id="file-display" contentEditable="true">
          {this.state.text}
        </p>
      )
    }
  }
}

export default Content;
