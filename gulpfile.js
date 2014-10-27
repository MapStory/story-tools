var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var connect = require('gulp-connect');
var karma = require('karma').server;

gulp.task('scripts', function() {
    var opts = {
        entries: ['./lib/time/controls.js'],
        standalone: 'timeControls'
    };
    return browserify(opts).bundle()
            .pipe(source('time-controls.js'))
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true,
        middleware: function(connect, o) {
            return [(function() {
                    var url = require('url');
                    var proxy = require('proxy-middleware');
                    var options = url.parse('http://mapstory.org/geoserver');
                    options.route = '/geoserver';
                    return proxy(options);
                })()];
        }
    });
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('tests', function() {
    return browserify('./test/tests.js').bundle()
            .pipe(source('tests.js'))
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(['lib/**'], ['scripts']);
});

gulp.task('default', ['scripts', 'connect', 'watch']);