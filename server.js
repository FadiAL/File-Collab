var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var server = http.createServer(app);
server.listen(8080);
