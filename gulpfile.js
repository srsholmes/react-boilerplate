'use strict';

var gulp         = require('gulp'),
    prefix       = require('gulp-autoprefixer'),
    gulpif       = require('gulp-if'),
    source       = require('vinyl-source-stream'),
    sass         = require('gulp-sass'),
    streamify    = require('gulp-streamify'),
    runSequence  = require('run-sequence'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    watchify     = require('watchify'),
    browserify   = require('browserify'),
    babelify     = require('babelify'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),

    //Server
    server       = require('./gulp/server'),
    //Utils
    config       = require('./gulp/config'),
    handleErrors = require('./gulp/handleErrors');

global.isProd = false;

// Build script based on https://github.com/jakemmarsh/react-rocket-boilerplate
// and 
// http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {
  var bundler = browserify({
    entries: [config.sourceDir + 'js/' + file],
    debug: !global.isProd,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  if ( watch ) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }
  bundler.transform(babelify);
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source(file))
    .pipe(gulpif(global.isProd, streamify(uglify())))
    .pipe(streamify(rename({
      basename: 'main'
    })))
    .pipe(gulpif(!global.isProd, sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
  }
  return rebundle();
}

gulp.task('browserify', function() {
  // Only run watchify if NOT production
  return buildScript('app.js', !global.isProd);
});

//browserSync
gulp.task('browserSync', function() {
  browserSync({
    proxy: 'localhost:' + config.serverport
  });
});

//Styles
gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(prefix("last 2 versions", "> 1%", "ie 8"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
});

//Get app ready for production
gulp.task('prod', function() {
  global.isProd = true;
  runSequence(['styles','browserify']);
});

//Watch the sass files.
gulp.task('watch', ['browserSync'], function() {
  // Scripts are watched by Watchify inside Browserify task
  gulp.watch(config.styles.src, ['sass']);
  //Start server.
  server();
});

gulp.task('default', ['styles', 'browserify', 'watch']);