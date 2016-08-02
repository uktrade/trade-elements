'use strict';

const gulp = require('gulp');
const paths = require('../paths');

// Check SASS source to confirm it has no errors and follows
// UKTI rules for style and syntax
gulp.task('lint-css', () => {
  const sassLint = require('gulp-sass-lint');
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
