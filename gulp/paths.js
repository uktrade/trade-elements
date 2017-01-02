const path = require('path')
const projectDir = path.resolve(__dirname, '../')

module.exports = {
  projectDir: projectDir,
  sourceStyles: `${projectDir}/src/styles`,
  outputStyles: `${projectDir}/dist/styles`,
  sourceJS: `${projectDir}/src/javascripts`,
  outputJS: `${projectDir}/dist/javascripts`,
  webpackConfig: `${projectDir}/webpack.config.js`,
  node_modules: `${projectDir}/node_modules`,
  imagesSrc: `${projectDir}/src/images`,
  imagesDest: `${projectDir}/dist/images`
}
