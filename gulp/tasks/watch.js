const gulp = require('gulp')
const paths = require('../paths')
const gulpSequence = require('gulp-sequence')

gulp.task('watch', (done) => {
  gulpSequence('build', 'serve', 'browserSync', () => {
    gulp.watch([`${paths.projectDir}/src/components/**/*.js`, `${paths.projectDir}/src/javascripts/**/*.js`], ['webpack'])
    gulp.watch(`${paths.projectDir}/src/**/*.scss`, ['sass', 'css'])
    gulp.watch(`${paths.imagesSource}/**/*`, ['images'])
    done()
  })
})
