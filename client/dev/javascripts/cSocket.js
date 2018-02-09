var socket = io();
socket.emit('files', '');
socket.on('files', function(fileList){
  console.log(fileList);
});
