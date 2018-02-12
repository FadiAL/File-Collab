import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

var files;

var socket = io();
var content = document.getElementById("file-display");

//Socket events

socket.emit('files', '');
socket.on('files', function(fileList){
  files = fileList;
  ReactDOM.render(<FileList files={files} />, document.getElementById("file-list"));
});
socket.on('fileReq', fileLoad);
socket.on('keystroke', fileLoad);

function fileLoad(f){
  observer.disconnect();
  content.innerText = f;
  observer.observe(content, watchConfig);
}

var watchConfig = {attributes: true, characterData: true, childList: true, subtree: true};
var observer = new MutationObserver(textChange);
observer.observe(content, watchConfig);

function textChange(){
  socket.emit('keystroke', content.innerText);
}

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

//Other
document.getElementById('add-file').addEventListener('click', function(){
  document.getElementById('create-dialog').style.display = 'block';
});
function hideDialog(){
  document.getElementById('create-dialog').style.display = 'none';
};
document.querySelector('html').addEventListener('click', function(e){
  //Below is to verify that the clicked area is outside the dialog
  if(!document.getElementById('create-dialog').contains(e.target) && e.target.id != 'add-file')
    hideDialog();
})
