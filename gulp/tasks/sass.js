const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const del = require('del')

function walk (dir, done) {
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) return done(err)
    let pending = list.length
    if (!pending) return done(null, results)
    list.forEach(function (file) {
      file = path.resolve(dir, file)
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res)
            if (!--pending) done(null, results)
          })
        } else {
          results.push(file)
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

function getComponentStyles (componentPath) {
  return new Promise((resolve, reject) => {
    walk(componentPath, (err, list) => {
      if (err) {
        reject(err)
      }

      resolve(
        list
          .filter(path => path.toLowerCase().endsWith('.scss'))
          .map(path => {
            const pos = path.lastIndexOf('/')
            return pos ? path.substr(pos + 1) : path
          })
      )
    })
  })
}

function importComponentStyles (componentPath) {
  function transform (file, cb) {
    getComponentStyles(componentPath)
      .then((files) => {
        let toAdd = ''
        files.forEach((file) => {
          if (file.charAt(0) === '_') {
            file = file.substr(1)
          }

          if (file.indexOf('.')) {
            file = file.substr(0, file.indexOf('.'))
          }

          toAdd += `\n@import 'trade/components/${file}';`
        })
        file.contents = new Buffer(String(file.contents) + toAdd)
        cb(null, file)
      })
      .catch((error) => {
        cb(error)
      })
  }

  return require('event-stream').map(transform)
}

gulp.task('sass', () => {
  const es = require('event-stream')
  const flatten = require('gulp-flatten')

  // copy sass files from this projects common sass sass, components (flattened), elements and gov uk toolkit
  // into one folder and sub folders partially namespaced to avoid clashes with names like colour.scss
  return es.merge(
    gulp.src(`${paths.projectDir}/src/sass//trade-elements.scss`)
      .pipe(importComponentStyles(`${paths.projectDir}/src/components`))
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`)),
    gulp.src(`${paths.projectDir}/src/sass/trade/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/trade`)),
    gulp.src(`${paths.projectDir}/src/components/**/*.scss`)
      .pipe(flatten())
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/trade/components/`)),
    gulp.src(`${paths.projectDir}/node_modules/govuk-elements-sass/public/sass/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`)),
    gulp.src(`${paths.projectDir}/node_modules/govuk_frontend_toolkit/stylesheets/**/*.scss`)
      .pipe(gulp.dest(`${paths.projectDir}/dist/sass/`))
  )
})
