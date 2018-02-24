var express = require('express');
var http = require('http');
var path = require('path');
var log = require('morgan');
var redis = require('redis');
var socket = require('socket.io');

var app = express();
var client = require('./config/redis.js');

const PORT = process.env.PORT || 8080;

var server = http.createServer(app);
var io = socket(server);

require('./config/express.js')(app);
require('./config/socket.js')(server, client);

server.listen(PORT);

//Other Functions

client.on('error', function (err) {
  console.log('Error ' + err)
});
