const express = require('express');
const morgan = require('morgan');

module.exports = function(app) {
  app.use(morgan(tiny));
  app.use(express.static(root));
}
