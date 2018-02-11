import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

var files;

var socket = io();
socket.emit('files', '');
socket.on('files', function(fileList){
  files = fileList;
  ReactDOM.render(<FileList files={files} />, document.getElementById("file-list"));
});
socket.on('fileReq', function(f){
  document.getElementById("file-display").innerText = f;
});

//React

class File extends React.Component {
  constructor(props){
    super(props);
  }
  fileSelected(e) {
    if(!this.props.active)
      this.props.onFileSelected(this.props.name);
  }
  render() {
    return <li className={"pure-menu-item " + (this.props.active ? "pure-menu-selected" : "")}>
    <a className="pure-menu-link" onClick={(e) => this.fileSelected(e)}>{this.props.name}</a>
    </li>
  }
}

class FileList extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeFile: ''}
  }
  handleFileChange(e) {
    this.setState({activeFile: e});
    socket.emit('fileReq', e);
  }
  render() {
    const files = this.props.files;
    const list = files.map(
      file => <File
       name={file} onFileSelected={(e) => this.handleFileChange(e)}
       active={file == this.state.activeFile}
      />);
    return (
      <div className="pure-menu">
        <a className="pure-menu-heading">Files</a>
        <ul className="pure-menu-list">
          {list}
        </ul>
      </div>
    )
  }
}
