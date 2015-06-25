var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var browserSync = require('browser-sync').create();
var webdriver = require('gulp-webdriver');
var sass = require('gulp-sass');
var serve = require('gulp-serve');

function compile(watch) {
    var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'))
            .on('end',  function() {
                if(!watch) {
                    process.exit(0);
                }
            });

    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }
    rebundle();
}

function watch() {
    return compile(true);
};



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('test:local', function() {
    return gulp.src('test/*.js', {
        read: false
    }).pipe(webdriver({
        desiredCapabilities: {
            browserName: 'chrome'
        }
    }));
});

gulp.task('copy', function(){
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('test:ie11', function() {
    return gulp.src('test/*.js', {
        read: false
    }).pipe(webdriver({
        updateSauceJob: true,
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        host: 'ondemand.saucelabs.com',
        port: 80,
        desiredCapabilities: {
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11.0',
        }
    }));
});

gulp.task('compile', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('build', ['copy', 'sass', 'compile']);
gulp.task('serve', serve('.'));

gulp.task('default', ['copy', 'sass:watch', 'watch', 'serve']);