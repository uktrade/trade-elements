const webpack = require('webpack')
const paths = require('./gulp/paths')
const prod = process.env.NODE_ENV === 'production'

module.exports = [
  {
    devtool: prod ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
    entry: {
      'trade-elements-components': `${paths.sourceJS}/trade-elements-components.js`
    },
    output: {
      path: `${paths.projectDir}/dist/javascripts`,
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: './babel_cache',
            babelrc: false,
            presets: ['es2015'],
            plugins: ['transform-class-properties']
          }
        }
      ]
    },
    plugins: prod ? [
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
        sourceMap: false,
        dead_code: true
      }),
      new webpack.optimize.DedupePlugin()
    ] : [
      new webpack.optimize.DedupePlugin()
    ]
  }]
