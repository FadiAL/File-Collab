var express = require('express');
var http = require('http');
var path = require('path');
var log = require('morgan');
var redis = require('redis');

var app = express();
var client = redis.createClient();

const PORT = process.env.PORT || 8080;

app.use(log('tiny'));
if(process.env.NODE_ENV == 'development')
  app.use(express.static(path.join(__dirname, 'client/dev')));
else if(process.env.NODE_ENV == 'production')
  app.use(express.static(path.join(__dirname, 'client/build')));

var server = http.createServer(app);
server.listen(PORT);

//Other Functions

client.on('error', function (err) {
  console.log('Error ' + err)
})
