const gulp = require('gulp')
const paths = require('../paths')
const gulpSequence = require('gulp-sequence')

gulp.task('watch', (done) => {
  gulpSequence('build', 'serve', 'browserSync', () => {
    gulp.watch(`${paths.sourceJS}/**/*.js`, ['webpack'])
    gulp.watch(`${paths.sourceStyles}/**/*.scss`, ['css'])
    gulp.watch(`${paths.imagesSource}/**/*`, ['images'])
    done()
  })
})
