'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var bower = require('main-bower-files');
var sass = require('gulp-ruby-sass');
var series = require('stream-series');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

gulp.task('index', function() {
	var sources = gulp.src(bower(), {read: false});
	var ng = gulp.src('client/**/*.js', {read: false});
	var jQuery = gulp.src(__dirname + '/bower_components/jquery/dist/jquery.js', {read: false});

	gulp.src(__dirname + '/index.html')
		.pipe(inject(jQuery, {name: 'jQuery'}))
		.pipe(inject(series(sources, ng)), {relative: true})
		.pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
	var styles = 'client/styles';

	sass(styles)
		.on('error', function(err) {
			console.log('Error!', err.message);
		})
		.pipe(gulp.dest(styles));
});

gulp.task('karma', shell.task([
	'karma start'
]));

gulp.task('lint', function() {
	return gulp.src('client/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

gulp.task('watch', function() {
	gulp.watch('client/styles/*.scss', ['styles']);
	gulp.watch('client/app/**/*.js', ['index']);
})