import React from 'react';
import Content from './rContent.jsx';
import Toolbar from './rToolbar.jsx';
import FileList from './rFile.jsx';

/*
Main object used to render the view
It takes a socket obj, and two methods to be called upon either file creation or deletion
This handles the rendering of all components needed to display data
In addition, it keeps track of the currently opened file in order to handle deletions
*/

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {curFileName: null};
    this.props.socket.on('currentFileCreated', fileName => {
      this.setState({curFileName: fileName});
    });
  }
  onFileSelected(fileName) {
    this.setState({curFileName: fileName});
  }
  handleDelete() {
    this.setState({curFileName: null});
    this.props.fileDelete(this.state.curFileName);
  }
  handleBack() {
    socket.emit('fileLeave');
    this.setState({curFileName: null});
  }
  render() {
    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu" id="file-list">
            <FileList socket={this.props.socket} onFileChange={(n) => {this.onFileSelected(n)}}/>
          </div>
        </div>
        <div className="content">
          <br/>
          <Content socket={this.props.socket}/>
          <Toolbar socket={this.props.socket} fileAdd={() => this.props.fileAdd()} fileDelete={() => this.handleDelete()} back={() => this.handleBack()}/>
        </div>
      </div>
    )
  }
}

export default MainPanel;
