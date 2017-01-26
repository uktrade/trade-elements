const gulp = require('gulp');
const paths = require('../paths');
const replace = require('gulp-batch-replace');
const fs = require('fs');
const isImage = /^images\//;

gulp.task('rev-replace', () => {

  const manifest = JSON.parse(fs.readFileSync(`${paths.dist}/rev-manifest.json`));
  const replacePaths = [];

  Object.keys(manifest).forEach((file) => {

    const revFile = manifest[ file ];
    const imageFile = isImage.test(file);
    let fileWithoutPath;
    let revFileWithoutPath;

    let fileWithQuery = (file + '(?:\\?[0-9]+?(\\.[0-9]+){2}?)?');

    replacePaths.push([ new RegExp( fileWithQuery, 'g'), revFile ] );

    if(imageFile){

      fileWithoutPath = fileWithQuery.replace(isImage, '');
      revFileWithoutPath = revFile.replace( isImage, '' );
      replacePaths.push([ new RegExp('((?:file-url|image-url)\\(\\s*?(\'|"))' + fileWithoutPath, 'g'), '$1' + revFileWithoutPath ]);
    }
  });

  return gulp.src([`${paths.dist}/**/*.{html,css,scss}`])
    .pipe(replace(replacePaths))
    .pipe(gulp.dest(paths.dist));
});
