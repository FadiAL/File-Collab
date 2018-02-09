import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();
socket.emit('files', '');
socket.on('files', function(fileList){
  console.log(fileList);
});
