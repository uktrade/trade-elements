const gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', (cb) => {
  var started = false;

	return nodemon({
    exec: 'node --debug',
		script: './app.js',
    ignore: './javascripts',
	}).on('start', function() {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
  });

});
