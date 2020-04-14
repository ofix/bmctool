const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: './dist',
    publicPath: '/dev-dist',
    filename: 'index.js'
  },
  target:"electron-renderer",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ],
    rules:[
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  devtool: 'eval-source-map'
}