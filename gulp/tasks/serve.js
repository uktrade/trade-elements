const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('serve', (cb) => {
  let started = false

  return nodemon({
    exec: 'node --inspect',
    script: './gallery/index.js',
    ignore: './src/javascripts',
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb()
      started = true
    }
  })
})
