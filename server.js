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

var server = http.createServer(app);

require('./config/express.js')(app);
require('./config/socket.js')(server, socket);

server.listen(PORT);

//Other Functions

client.on('error', function (err) {
  console.log('Error ' + err)
});
