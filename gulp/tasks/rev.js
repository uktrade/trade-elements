const gulp = require('gulp')
const paths = require('../paths')
const rev = require('gulp-rev')

gulp.task('rev', () => {
  return gulp.src([`${paths.outputJS}/**/*`, `${paths.imagesDest}/**/*`, `${paths.outputCss}/**/*`], {base: paths.dist})
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist))
})
