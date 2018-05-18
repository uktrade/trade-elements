const paths = require('./gulp/paths')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'trade-elements-components': `${paths.sourceJS}/trade-elements-components.js`,
  },
  output: {
    path: `${paths.projectDir}/dist/javascripts`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
