const path = require('path');

module.exports = {
  entry: './client/dev/javascripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dev/javascripts')
  },
  module: {
    loaders:[
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
