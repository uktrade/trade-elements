const gulp = require('gulp')
const paths = require('../paths')

gulp.task('nunjucks', () => {
  const es = require('event-stream')
  const concat = require('gulp-concat')

  return es.merge(
    gulp.src([`${paths.projectDir}/src/components/**/*.html`, `${paths.projectDir}/src/nunjucks/macros/utils.html`])
      .pipe(concat('trade.html'))
      .pipe(gulp.dest(`${paths.projectDir}/dist/nunjucks/macros/`)),
    gulp.src(`${paths.projectDir}/src/nunjucks/layouts/*.html`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/nunjucks/layouts/`)),
    gulp.src(`${paths.projectDir}/src/nunjucks/filters/*.js`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/nunjucks/filters/`))
  )
})
