'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');
const jade = require('gulp-jade');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function(){
  return gulp.src('*.less')
  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  .pipe(less())
  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  .pipe(gulp.dest('project'));
});

gulp.task('jade', function(){
  return gulp.src('*.jade')
  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  .pipe(jade())
  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  .pipe(gulp.dest('project'));
});

gulp.task('clean', function(){
  return del('project');
});

gulp.task('build', gulp.series('clean', 'styles', 'jade'));
