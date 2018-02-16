import React from 'react';
import Content from './rContent.jsx';
import Toolbar from './rToolbar.jsx';
import FileList from './rFile.jsx';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {curFile: null};
    this.setupSocket(this.props.socket);
  }
  setupSocket(socket) {
    socket.on('fileReq', file => {
      this.setState({curFile: file});
    });
  }
  onFileSelected(fileName) {
    this.setState({curFileName: fileName});
  }
  handleDelete() {
    this.props.fileDelete(this.state.curFileName);
  }
  render() {
    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu" id="file-list">
            <FileList socket={this.props.socket} onFileChange={() => {this.onFileSelected}}/>
          </div>
        </div>
        <div className="content">
          <Toolbar fileAdd={this.props.fileAdd}
                    fileDelete={(this.state.curFile || this.state.curFile === "") ? this.handleDelete : undefined}/>
          <br/>
          {this.state.curFile &&
            <Content text={this.state.curFile}/>
          }
        </div>
      </div>
    )
  }
}

export default MainPanel;
