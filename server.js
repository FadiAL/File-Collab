const express = require('express');
const http = require('http');
const redis = require('redis');

var app = express();
var client = redis.createClient();
var server = http.createServer(app);

const PORT = process.env.PORT || 8080;

require('./config/redis.js')(client);//Mainly logging
require('./config/express.js')(app);//Configuring middleware
require('./config/socket.js')(server, client);//Setting up socket events

server.listen(PORT);
module.exports = server;
