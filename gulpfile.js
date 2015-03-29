var gulp = require('gulp'),
    rimraf = require('rimraf'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream');

var paths = {
  input: {
    src: 'src/app.jsx',
    style: 'style/app.less',
    root: './src/app.jsx',
    index: './*.html',
    assets: 'assets/**/*'
  },
  prod: {
    all: 'prod',
    src: 'prod/src',
    style: 'prod/style',
    assets: 'prod/assets',
    index: 'prod/*.html'
  }
};

gulp.task('clean', function() {
  rimraf.sync(paths.prod.all);
});

gulp.task('assets', function() {
  return gulp.src(paths.input.assets)
      .pipe(gulp.dest(paths.prod.assets));
});

gulp.task('style', function() {
  return gulp.src(paths.input.style)
      .pipe(
        gulpif(
          /[.]less$/,
          less({
            compress: true
          })
        )
      )
      .on('error', util.log)
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(paths.prod.style));
});

gulp.task('src', function() {
  return browserify({
      entries: paths.input.root,
      debug: false
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest(paths.prod.src));
});

gulp.task('html', function() {
  return gulp.src(paths.input.index)
      .pipe(gulp.dest(paths.prod.all));
});

gulp.task('default', function() {
  runSequence('clean', 'assets', 'style', 'src', 'html');
});
