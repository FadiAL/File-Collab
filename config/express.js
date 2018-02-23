const express = require('express');
const morgan = require('morgan');

var rootPath = process.env.NODE_ENV == 'production' ? 'client/build' : 'client/dev';

module.exports = function(app) {
  app.use(morgan('tiny'));
  app.use(express.static(rootPath));
}
