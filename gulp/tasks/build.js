'use strict';

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('build', (done) => {
  gulpSequence('css', 'webpack', 'images', done);
});
