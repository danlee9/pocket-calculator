var gulp = require('gulp');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
	gulp.src('./build', {read:false})
	.pipe(gulp.clean());
});

gulp.task('copy', function() {
	gulp.src(['./app/**/*.jpg'])
	.pipe(gulp.dest('./build'));
});

gulp.task('usemin', ['copy'], function() {
	gulp.src('./app/index.html')
	.pipe(usemin({
		css: [minifyCSS()],
		js: [uglify()]
	}))
	.pipe(gulp.dest('./build'));
});

// 'gulp usemin' to build