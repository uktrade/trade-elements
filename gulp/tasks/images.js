'use strict';

const gulp = require('gulp');
const paths = require('../paths');

gulp.task('images', () => {
  return gulp.src([`${paths.imagesSrc}/**/*`])
    .pipe(gulp.dest(paths.imagesDest));
});
