const path = require('path');
const projectDir = path.resolve(__dirname, '../');

module.exports = {
  sourceStyles: `${projectDir}/sass`,
  outputStyles: `${projectDir}/dist/stylesheets`,
  sourceJS: `${projectDir}/javascripts`,
  outputJS: `${projectDir}/dist/javascripts`,
  webpackConfig: `${projectDir}/webpack.config.js`,
  node_modules: `${projectDir}/node_modules`,
  imagesSrc: `${projectDir}/images`,
  imagesDest: `${projectDir}/dist/images`
};
