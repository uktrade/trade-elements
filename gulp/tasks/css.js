const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const paths = require('../paths')
const del = require('del')
const config = require('../../config')


gulp.task('css', (done) => {
  del(paths.outputStyles)
  const sassOptions = {}

  if (config.env !== 'production') {
    sassOptions.outputStyle = 'compressed'
  }

  gulp.src(`${paths.projectDir}/dist/trade-elements.scss`)
    .pipe(sass(sassOptions)
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(paths.outputStyles))

  gulp.src(`${paths.projectDir}/gallery/styles/*.scss`)
    .pipe(sass({
      includePaths: `${paths.projectDir}/dist/sass`
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(`${paths.projectDir}/gallery/styles/`))

  done()
})
