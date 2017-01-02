const gulp = require('gulp')
const paths = require('../paths')

gulp.task('images', () => {
  const es = require('event-stream')
  const flatten = require('gulp-flatten')

  return es.merge(
    gulp.src([`${paths.imagesSrc}/**/*`])
      .pipe(gulp.dest(paths.imagesDest)),
    gulp.src([`${paths.projectDir}/node_modules/govuk_frontend_toolkit/images/**/*`])
      .pipe(gulp.dest(paths.imagesDest)),
    gulp.src(`${paths.projectDir}/src/components/**/*.png`)
      .pipe(flatten())
      .pipe(gulp.dest(paths.imagesDest))
  )
})
