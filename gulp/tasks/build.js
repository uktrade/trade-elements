const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')

gulp.task('build', (done) => {
  gulpSequence('clean', 'nunjucks', 'sass', 'css', 'webpack', 'images', done)
})
