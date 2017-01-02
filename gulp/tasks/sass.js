const gulp = require('gulp')
const paths = require('../paths')

gulp.task('sass', () => {
  const es = require('event-stream')
  const flatten = require('gulp-flatten')

  // copy sass files from this projects common sass styles, components (flattened), elements and gov uk toolkit
  // into one folder and sub folders partially namespaced to avoid clashes with names like colour.scss
  return es.merge(
    gulp.src(`${paths.projectDir}/src/styles/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`)),
    gulp.src(`${paths.projectDir}/src/components/**/*.scss`)
      .pipe(flatten())
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/trade/components/`)),
    gulp.src(`${paths.projectDir}/node_modules/govuk-elements-sass/public/sass/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`)),
    gulp.src(`${paths.projectDir}/node_modules/govuk_frontend_toolkit/stylesheets/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`))
  )
})
