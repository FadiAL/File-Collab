import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import FileList from './rFile.jsx';

var files;

var socket = io();
var content = document.getElementById("file-display");

//Socket events

socket.emit('files', '');
socket.on('files', function(fileList){
  files = fileList;
  ReactDOM.render(<FileList files={files} socket={socket}/>, document.getElementById("file-list"));
  ReactDOM.render(<Dialog visible={false} />, document.getElementById("create-dialog"));
});
socket.on('fileCreate', function(fileName){
  files.push(fileName);
  hideDialog();
  ReactDOM.render(<FileList files = {files} socket = {socket}/>
                  , document.getElementById("file-list"));
});
socket.on('fileTaken', function(fileName){
  ReactDOM.render(<Dialog visible={true} error={fileName} />, document.getElementById("create-dialog"));
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

class Dialog extends React.Component {
  render() {
    return(
    <form className={"pure-form pure-form-stacked " + (this.props.visible ? "visible" : "invisible")} onSubmit={createFile}>
    <h2>Create File</h2>
    {
      this.props.error &&
        <h5>Error, file name {this.props.error} taken</h5>
    }
    <input type="text" placeholder="File Name"/>
    <button type="submit" className="pure-button pure-button-primary">Create</button>
    </form>
    )
  }
}

//Other
document.getElementById('add-file').addEventListener('click', function(){
  ReactDOM.render(<Dialog visible={true} />, document.getElementById('create-dialog'));
  document.getElementById('menu').classList.add('blur');
  document.querySelector('.content').classList.add('blur');
});
function hideDialog(){
  ReactDOM.render(<Dialog visible={false} />, document.getElementById('create-dialog'));
  document.getElementById('menu').classList.remove('blur');
  document.querySelector('.content').classList.remove('blur');
};
document.querySelector('html').addEventListener('click', function(e){
  //Below is to verify that the clicked area is outside the dialog
  if(!document.getElementById('create-dialog').contains(e.target) && e.target.id != 'add-file')
    hideDialog();
});
function createFile(e){
  e.preventDefault();
  socket.emit('fileCreate', document.querySelector('input').value);
  return false;
}
