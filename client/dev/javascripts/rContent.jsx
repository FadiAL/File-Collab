import React from 'react';

/*
This component handles rendering of the file data
It takes in a socket object, and handles updating of the text
In addition, it empties the file upon deletion, and opens one upon a request
*/

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
    socket.on('keystroke', newText => {
      this.setState({text: newText});
    });
    socket.on('deletedOpen',() => {
      this.setState({active: false});
    });
  }
  handleChange(e) {
    this.setState({text: e.target.value});
    this.props.socket.emit('keystroke', e.target.value);
  }
  render() {
    if(!this.state.active)
      return null;
    else{
      return (
        <textarea id="file-display" value={this.state.text} onChange={e => this.handleChange(e)}>
        </textarea>
      )
    }
  }
}

export default Content;