var express = require('express');
var http = require('http');
var path = require('path');
var log = require('morgan');
var redis = require('redis');
var socket = require('socket.io');

var app = express();
var client = redis.createClient();
var redisLib = require('./modules/redisLib.js')(client);

const PORT = process.env.PORT || 8080;

app.use(log('tiny'));
if(process.env.NODE_ENV == 'development')
  app.use(express.static(path.join(__dirname, 'client/dev')));
else if(process.env.NODE_ENV == 'production')
  app.use(express.static(path.join(__dirname, 'client/build')));

var server = http.createServer(app);
var io = socket(server);
server.listen(PORT);

//Socket Config

io.on('connection', function(socket){
  socket.on('files', function(){
    redisLib.getAll(function(val){console.log(val)});//TODO:Add socket emit
  });
  socket.on('fileReq', function(id, msg){
    console.log('Socket requested ' + msg);
  });
  socket.on('keystroke', function(id, msg){
    console.log('Socket typed ' + msg);
  });
  socket.on('fileClose', function(id, msg){
    console.log('Socket closed file');
  });
});

//Other Functions

client.on('error', function (err) {
  console.log('Error ' + err)
});

populateTest = () => {
  client.set('file1', 'kmfldamfeawfea');
  client.set('file2', 'jfknfjknefawfe');
  client.set('file3', 'iokopkpwdopqko');
  client.set('file4', 'fadzfvdvfdvxvd');
};

populateTest();
