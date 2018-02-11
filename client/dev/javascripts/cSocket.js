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

//React

class File extends React.Component {
  constructor(props){
    super(props);
    this.state = {active: false};
  }
  render() {
    return <li className={"pure-menu-item" + (this.state.active ? "pure-menu-selected" : "")}>
    <a className="pure-menu-link" onClick={fileSelected}>{this.props.name}</a>
    </li>
  }
}
function fileSelected() {
  //TODO:Add function
}
class FileList extends React.Component {
  render() {
    const files = this.props.files;
    const list = files.map(file => <File name={file} />);
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
