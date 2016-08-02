const webpack = require('webpack');
const paths = require('./gulp/paths');

module.exports = [
  {
    devtool: 'cheap-module-source-map',
    entry: {
      app: `${paths.sourceJS}/govstrap.js`
    },
    output: {
      path: paths.outputJS,
      filename: 'govstrap.js',
      libraryTarget: 'var',
      library: 'UKTI'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }]
    },
    resolve: {
      extensions: ['', '.js'],
      modules: [
        paths.sourceJS,
        paths.libJS,
        'node_modules'
      ]
    },

    plugins: [new webpack.optimize.DedupePlugin()]
  },
  {
    entry: {
      app: `${paths.sourceJS}/govstrap.js`
    },
    output: {
      path: paths.outputJS,
      filename: 'govstrap.min.js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }]
    },
    resolve: {
      extensions: ['', '.js'],
      modules: [
        paths.sourceJS,
        paths.libJS,
        'node_modules'
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false }),
      new webpack.optimize.DedupePlugin()
    ]
  }];
