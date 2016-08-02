'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const paths = require('../paths');
const del = require('del');

gulp.task('webpack', done => {
  del(paths.outputJS);
  webpack(require(paths.webpackConfig)).run((err, stats) => {
    if (err) { throw new gutil.PluginError('webpack', err); }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false
    }));
    done();
  });
});
