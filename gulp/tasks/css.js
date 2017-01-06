const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const paths = require('../paths')
const del = require('del')
const config = require('../../gallery/config')

gulp.task('css', (done) => {
  const outputCss = `${paths.projectDir}/dist/css/`
  const sassSrc = `${paths.projectDir}/dist/sass`
  del(outputCss)

  gulp.src(`${paths.projectDir}/src/sass/ukti-template.scss`)
    .pipe(sass({
      includePaths: sassSrc,
      outputStyle: (config.env === 'production') ? 'compressed' : 'nested'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(outputCss))

  gulp.src(`${sassSrc}/trade-elements.scss`)
    .pipe(sass({
      outputStyle: (config.env === 'production') ? 'compressed' : 'nested'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(outputCss)
  )

  gulp.src(`${paths.projectDir}/gallery/styles/*.scss`)
    .pipe(sass({
      includePaths: sassSrc
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(gulp.dest(`${paths.projectDir}/gallery/styles/`))

  done()
})
