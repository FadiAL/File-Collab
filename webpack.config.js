const path = require('path');

module.exports = {
  entry: './client/dev/javascripts/cSocket.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dev/javascripts')
  }
};
