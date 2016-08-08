'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const paths = require('../paths');
const del = require('del');
const config = require('../../config');

const SASS_PATHS = [
  paths.sassLib,
  `${paths.node_modules}/govuk-elements-sass/public/sass`,
  `${paths.node_modules}/govuk_frontend_toolkit/stylesheets`
];

gulp.task('css', (done) => {
  del(paths.outputStyles);
  var sassOptions = {
    includePaths: SASS_PATHS
  };

  if (config.env !== 'production') {
    sassOptions.outputStyle = 'compressed';
  }

  gulp.src(`${paths.sourceStyles}/*.scss`)
    .pipe(sass(sassOptions)
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(paths.outputStyles));

  done();
});
