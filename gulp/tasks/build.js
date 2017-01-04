const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')

gulp.task('build', (done) => {
  gulpSequence('nunjucks', 'sass', 'css', 'webpack', 'images', done)
})


// todo - split out the sass for the base page layout. So in the base layout it gets it's stylesheet and it's up to the app to
// make it's sass and include them. The base layout must easily leave a space to inser stuff into the header, the footer to pull sass and js
