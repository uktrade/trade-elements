'use strict';

const gulp = require('gulp');

// Check javascript source to confirm it has no obvious errors and follows
// UKTI rules for style and syntax
gulp.task('' +
  'lint-js', () => {
  const eslint = require('gulp-eslint');

  return gulp.src(['./javascripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});
