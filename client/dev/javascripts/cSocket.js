import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import FileList from './rFile.jsx';
import Dialog from './rDialog.jsx';

var files;

var socket = io();
var content = document.getElementById("file-display");

//Socket events

socket.emit('files', '');
socket.on('files', function(fileList){
  files = fileList;
  ReactDOM.render(<FileList files={files} socket={socket}/>, document.getElementById("file-list"));
  ReactDOM.render(<Dialog visible={false} createFile={createFile}/>, document.getElementById("create-dialog"));
});
socket.on('fileCreate', function(fileName){
  files.push(fileName);
  hideDialog();
  ReactDOM.render(<FileList files = {files} socket = {socket}/>
                  , document.getElementById("file-list"));
});
socket.on('fileTaken', function(fileName){
  ReactDOM.render(<Dialog visible={true} error={fileName} createFile={createFile}/>, document.getElementById("create-dialog"));
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

//Other
document.getElementById('add-file').addEventListener('click', function(){
  ReactDOM.render(<Dialog visible={true} createFile={createFile}/>, document.getElementById('create-dialog'));
  document.getElementById('menu').classList.add('blur');
  document.querySelector('.content').classList.add('blur');
});
function hideDialog(){
  ReactDOM.render(<Dialog visible={false} createFile={createFile}/>, document.getElementById('create-dialog'));
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
