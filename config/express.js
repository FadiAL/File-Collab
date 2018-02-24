const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

var rootPath = process.env.NODE_ENV == 'production' ? 'client/build' : 'client/dev';

module.exports = function(app) {
  app.use(morgan('tiny'));
  app.use(compression());
  app.use(express.static(rootPath));
}
