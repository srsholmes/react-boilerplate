'use strict';

var gulp         = require('gulp'),
    prefix       = require('gulp-autoprefixer'),
    gulpif       = require('gulp-if'),
    source       = require('vinyl-source-stream'),
    sass         = require('gulp-sass'),
    streamify    = require('gulp-streamify'),
    runSequence  = require('run-sequence'),
    sourcemaps   = require('gulp-sourcemaps'),
    watchify     = require('watchify'),
    browserify   = require('browserify'),
    babelify     = require('babelify'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    lrload       = require('livereactload'),
    buffer       = require('vinyl-buffer'),
    uglifyify    = require('uglifyify'),
    //Server
    server       = require('./gulp/server'),
    //Utils
    config       = require('./gulp/config'),
    handleErrors = require('./gulp/handleErrors');

var isProd = process.env.NODE_ENV === "production"

var bundler = browserify({
  entries:      [config.sourceDir + 'js/app.js'],
  transform:    babelify.configure({stage: 0}),
  plugin:       isProd ? [] : [ lrload ],
  debug:        !isProd,
  cache:        {},
  packageCache: {},
  fullPaths: false
});

gulp.task('bundle:js', function() {
  bundler.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.scripts.dest))
});


//browserSync for sass reload
gulp.task('browserSync', function() {
  browserSync({
    proxy: 'localhost:' + config.serverport
  });
});

//Styles
gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: isProd ? 'compressed' : 'nested'
    }))
    .pipe(prefix("last 2 versions", "> 1%", "ie 8"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.styles.src, ['styles']);
  // start JS file watching and rebundling with watchify
  var watcher = watchify(bundler)
  rebundle()
  return watcher
    .on('error', handleErrors)
    .on('update', rebundle)

  function rebundle() {
    console.log('JS bundle')
    watcher
      .bundle()
      .on('error', handleErrors)
      .pipe(source('main.js'))
      .pipe(gulpif(isProd, streamify(uglify())))
      .pipe(gulpif(!isProd, sourcemaps.write('./')))
      .pipe(buffer())
      .pipe(gulp.dest(config.scripts.dest))
      // .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
  }
});

gulp.task('default', ['styles', 'watch', 'bundle:js'], function() {
//Start server.
  server();
});

//For production, just bundle the scss and js.
gulp.task('prod', function() {
  runSequence(['styles','bundle:js']);
});
