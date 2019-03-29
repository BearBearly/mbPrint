var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var cleancss = require('gulp-cleancss');
const changed = require('gulp-changed');
var debug = require('gulp-debug')
var plumberNotifier = require('gulp-plumber-notifier');

gulp.task('imgCopy', function(){
  return new Promise(function(resolve, reject) {
    gulp.src('./app/img/*')
    .pipe(gulp.dest('./dist/img/'))
    resolve();
    });
  })

gulp.task('webserver', function() {
  gulp.src('./dist/')
  .pipe(server({
    livereload: true,
    directoryListing: false,
    open: false,
    host: '0.0.0.0'
    }));
  });

gulp.task('jsBuild', function(){
  return new Promise(function(resolve, reject) {
    gulp.src('./app/js/*.js')
    .pipe(browserify())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js/'))
    resolve();
    });
  })

gulp.task('htmlBuild', function(){
  return new Promise(function(resolve, reject) {
    gulp.src('./app/*.pug')
    .pipe(plumberNotifier())
    .pipe(pug({
      pretty: true
      }))
    .pipe(gulp.dest('./dist/'))
    resolve();
    });
  })

gulp.task('cssBuild', async function(){
  gulp.src('./app/scss/*.sass')
  .pipe(plumberNotifier())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 20 versions'],
    cascade: false
    }))
  .pipe(cleancss({keepBreaks: true}))
  .pipe(gulp.dest('./dist/css/'))
  })

gulp.task('watcher', function(){
  gulp.watch('./app/js/*.js', gulp.series('jsBuild'))
  gulp.watch('./app/scss/*.sass', gulp.series('cssBuild'))
  gulp.watch('./app/*.pug', gulp.series('htmlBuild'))
  gulp.watch('./app/includes/*.pug', gulp.series('htmlBuild'))
  gulp.watch('./app/img/*', gulp.series('imgCopy'))
  })

gulp.task('default',gulp.parallel('webserver', 'watcher'), function(){
  return new Promise(function(resolve, reject) {
    console.log("Привіт");
    resolve();
    });
  });