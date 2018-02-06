var express = require('express');
var http = require('http');
var path = require('path');
var log = require('morgan');
var redis = require('redis');

var app = express();

app.get('*', function(req, res, next){
  res.sendFile(path.join(__dirname, 'client/dev/index.html'));
});

var server = http.createServer(app);
server.listen(8080);
