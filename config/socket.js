const socket = require('socket.io');

var rooms = {};

module.exports = function(server, client) {
  const redisLib = require('../modules/redisLib')(client);

  var io = socket(server);

  io.on('connection', function(socket){
    sendInitData(socket);
    socket.on('files', function(){
      redisLib.getAll(function(val){
        socket.emit('files', val);
      });
    });
    socket.on('fileReq', function(msg){
      redisLib.getFile(msg, function(val){
        socket.join(msg);
        rooms[socket.id] = msg;
        socket.emit('fileReq', {fileName: msg, fileContents: val});
      });
    });
    socket.on('fileLeave', function(){
      socket.leave(rooms[socket.id]);
      delete rooms[socket.id];
    });
    socket.on('keystroke', function(msg){
      socket.broadcast.to(rooms[socket.id]).emit('keystroke', msg);
      redisLib.update(rooms[socket.id], msg);
    });
    socket.on('fileCreate', function(fileName){
      redisLib.create(fileName, function(){
        socket.emit('fileTaken', fileName);//Function if name is taken
      }, function(){
        io.sockets.emit('fileCreate', fileName);//Function if create works
        socket.emit('currentFileCreated', fileName);//Function to send to user that created the file
      });
    });
    socket.on('delete', function(key){
      redisLib.delete(key, function(){
        io.sockets.emit('delete', key);
        io.to(rooms[socket.id]).emit('deletedOpen');
      });
    });
  });

  function sendInitData(socket) {
    redisLib.getRecent(function(recents){
      socket.emit('recentFiles', recents);
    });
    redisLib.getAll(function(files){
      socket.emit('files', files);
    });
  }
}
