var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var assign = Object.assign || require('object.assign');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src(['dist-client/', 'dist-server'])
    .pipe(vinylPaths(del));
});

gulp.task('build-server-js', function () {
  var compilerOptions = {
    modules: 'common',
    moduleIds: false,
    comments: false,
    compact: false,
    stage:2,
    optional: ["es7.decorators", "es7.classProperties"]
  };
  return gulp.src('src-server/**/*.js')
    .pipe(plumber())
    .pipe(changed('dist-server/', {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(babel(assign({}, compilerOptions, {modules:'common'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src-server/' }))
    .pipe(gulp.dest('dist-server/'));
});

gulp.task('build-client-js', function () {
  var compilerOptions = {
    modules: 'system',
    moduleIds: false,
    comments: false,
    compact: false,
    stage:2,
    optional: ["es7.decorators", "es7.classProperties"]
  };
  return gulp.src('src-client/**/*.js')
    .pipe(plumber())
    .pipe(changed('dist-client/', {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src-client/' }))
    .pipe(gulp.dest('dist-client/'));
});

gulp.task('build-client-html', function () {
  return gulp.src('src-client/**/*.html')
    .pipe(changed('dist-client/', {extension: '.html'}))
    .pipe(gulp.dest('dist-client/'));
});

gulp.task('build', function(callback) {
  return runSequence('clean', ['build-server-js', 'build-client-js', 'build-client-html'], callback);
});

gulp.task('nodemon', ['build'], function () {
  nodemon({
    watch: ['./src-client', './src-server'],
    ext: 'js',
    script: './dist-server/server.js',
    tasks: ['build']
  });
});

gulp.task('default', ['nodemon']);
