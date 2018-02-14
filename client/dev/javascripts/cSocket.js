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
  updateList();
  hideDialog();
});
socket.on('fileCreate', function(fileName){
  files.push(fileName);
  hideDialog();
  updateList();
});
socket.on('fileTaken', function(fileName){
  ReactDOM.render(<Dialog error={fileName} createFile={createFile}/>,
                  document.getElementById("create-dialog"));
});
socket.on('delete', function(file){
  files = files.filter(name => name != file);
  updateList();
  content.style.display = "none";
});
socket.on('fileReq', fileLoad);
socket.on('keystroke', fileLoad);

function fileLoad(f){
  observer.disconnect();
  content.style.display = "block";
  content.innerText = f;
  observer.observe(content, watchConfig);
}

var watchConfig = {attributes: true, characterData: true, childList: true, subtree: true};
var observer = new MutationObserver(textChange);

function textChange(){
  socket.emit('keystroke', content.innerText);
}

//Other
document.getElementById('add-file').addEventListener('click', function(){
  ReactDOM.render(<Dialog createFile={createFile}/>,
                  document.getElementById('create-dialog'));
  document.getElementById('menu').classList.add('blur');
  document.querySelector('.content').classList.add('blur');
});
document.getElementById('remove-file').addEventListener('click', function(){
  socket.emit('delete', /[a-zA-Z0-9]+/.exec(document.querySelector('.pure-menu-selected').innerText)[0]);
});
function hideDialog(){
  ReactDOM.render(null, document.getElementById('create-dialog'));
  document.getElementById('menu').classList.remove('blur');
  document.querySelector('.content').classList.remove('blur');
};
function updateList(){
  ReactDOM.render(<FileList files = {files} socket = {socket}/>,
                  document.getElementById("file-list"));
}
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

content.style.display = "none";
