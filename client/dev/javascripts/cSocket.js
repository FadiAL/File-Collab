import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './rDialog.jsx';
import MainPanel from './rMainPanel.jsx';

var files;

var socket = io();

//Socket events

socket.on('fileTaken', function(fileName){
  ReactDOM.render(<Dialog error={fileName} createFile={createFile}/>,
                  document.getElementById("create-dialog"));
});
socket.on('currentFileCreated', function(fileName){
  hideDialog();
  socket.emit('fileReq', fileName);
});

//Other

ReactDOM.render(<MainPanel socket={socket} fileAdd={fileAdd} fileDelete={fileDelete}/>,
                document.getElementById('root'));

function fileAdd() {
  document.getElementById('root').classList.add('blur');
  ReactDOM.render(<Dialog createFile={createFile}/>,
                  document.getElementById('create-dialog'));
};
function fileDelete(fileName) {
  socket.emit('delete', fileName);
}
function hideDialog(){
  ReactDOM.render(null, document.getElementById('create-dialog'));
  document.getElementById('root').classList.remove('blur');
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

//content.style.display = "none";
