var express = require('express');
var http = require('http');
var path = require('path');
var log = require('morgan');
var redis = require('redis');
var socket = require('socket.io');

var app = express();
var client = redis.createClient();
var redisLib = require('./modules/redisLib.js')(client);

var rooms = {};

const PORT = process.env.PORT || 8080;

app.use(log('tiny'));

if(process.env.NODE_ENV == 'production')
  app.use(express.static(path.join(__dirname, 'client/build')));
else
  app.use(express.static(path.join(__dirname, 'client/dev')));
var server = http.createServer(app);
var io = socket(server);
server.listen(PORT);

//Socket Config

io.on('connection', function(socket){
  socket.on('files', function(){
    redisLib.getAll(function(val){
      socket.emit('files', val);
    });
  });
  socket.on('fileReq', function(msg){
    redisLib.getFile(msg, function(val){
      socket.join(msg);
      rooms[socket.id] = msg;
      socket.emit('fileReq', val);
    });
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
    });
  });
  socket.on('fileClose', function(id, msg){
    console.log('Socket closed file');
  });
  socket.on('delete', function(key){
    redisLib.delete(key, function(){
      io.sockets.emit('delete', key);
      io.to(rooms[socket.id]).emit('deletedOpen');
    });
  });
});

//Other Functions

client.on('error', function (err) {
  console.log('Error ' + err)
});
