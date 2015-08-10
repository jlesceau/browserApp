var gulp = require('gulp'),
    rimraf = require('rimraf'),
    less = require('gulp-less'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    minifyCss = require('gulp-minify-css'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer');


/**
 * DEV BUILD
 */
gulp.task('dev-clean', function() {
  rimraf.sync('./dev');
});
gulp.task('dev-build-assets', function() {
  return gulp.src([ './assets/*', './assets/**/*' ])
    .pipe(gulp.dest('./dev/assets'));
});
gulp.task('dev-build-style', function() {
  return gulp.src('./style/app.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions' ],
      cascade: false
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./dev'));
});
gulp.task('dev-build-src', function() {
  return browserify({
      entries: './src/app.jsx',
      standalone: 'app',
      debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dev'));
});
gulp.task('dev-build-html', function() {
  return gulp.src('./app.html')
    .pipe(gulp.dest('./dev'));
});
gulp.task('dev-build', function() {
  runSequence(
    'dev-clean',
    'dev-build-assets',
    'dev-build-style',
    'dev-build-src',
    'dev-build-html'
  );
});


/**
 * PROD BUILD
 */
gulp.task('prod-clean', function() {
  rimraf.sync('./prod');
});
gulp.task('prod-build-assets', function() {
  return gulp.src([ './assets/*', './assets/**/*' ])
    .pipe(gulp.dest('./prod/assets'));
});
gulp.task('prod-build-style', function() {
  return gulp.src('./style/app.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions' ],
      cascade: false
    }))
    .pipe(rename('app.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./prod'));
});
gulp.task('prod-build-src', function() {
  return browserify({
      entries: './src/app.jsx',
      standalone: 'app',
      debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./prod'));
});
gulp.task('prod-build-html', function() {
  return gulp.src('./app.html')
    .pipe(gulp.dest('./prod'));
});
gulp.task('prod-build', function() {
  runSequence(
    'prod-clean',
    'prod-build-assets',
    'prod-build-style',
    'prod-build-src',
    'prod-build-html'
  );
});


gulp.task('default', [ 'dev-build' ]);
