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
  render() {
    return <li className="pure-menu-item">
    <a href="#" className="pure-menu-link">{this.props.name}</a>
    </li>
  }
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
