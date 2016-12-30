'use strict';

const gulp = require('gulp');

gulp.task('' +
  'lint-js', () => {
  const standard = require('gulp-standard')

  return gulp.src(['./javascripts/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
});
