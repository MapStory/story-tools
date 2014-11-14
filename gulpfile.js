var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var refresh = require('gulp-livereload');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');

var watch = false;
var sources = ['lib/time/*.js'];

function notify(msg) {
    if (watch) {
        notifier.notify({
            'title': 'story-tools notification',
            'message': msg
        });
    }
}

function lint() {
    var lintStream = gulp.src(sources)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
    lintStream.on('error', function() {
        notify('linting failed');
    });
    return lintStream;
}

function bundle(browserify, bundleName, test) {
    if (watch) {
        browserify = watchify(browserify);
    }
    function doBundle() {
        var bundle = browserify.bundle();
        bundle.on('error', function(err) {
            util.log(util.colors.red('Error:'), err.message);
            notify('browserify error ' + err.toString());
            this.end();
        });
        var bundleStream = bundle
                .pipe(source(bundleName))
                .pipe(gulp.dest('dist'))
                .pipe(connect.reload());
        bundleStream.on('end', function() {
            util.log("bundled", util.colors.cyan(bundleName));
            if (watch && test) {
                runTests(function(failed) {
                    notify(failed > 0 ? failed + ' failures' : 'passing!');
                });
            }
        });
        return bundleStream;
    }
    browserify.on('update', doBundle);
    return doBundle();
}

function scripts() {
    timeBundle();
}

function timeBundle(test) {
    return bundle(browserify({
        entries: ['./lib/time/controls.js'],
        standalone: 'timeControls'
    }), 'time-controls.js', test);
}

function tests() {
    return bundle(browserify('./test/tests.js'), 'tests.js', true);
}

function runTests(done) {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
}

function tdd() {
    watch = true;
    lint();
    gulp.watch(sources, lint);
    timeBundle(false);
    tests();
}

gulp.task('connect', function() {
    var url = require('url');
    var proxy = require('proxy-middleware');
    connect.server({
        root: '.',
        port: 8001,
        livereload: true,
        middleware: function(connect, o) {
            var fixedProxy = (function() {
                var options = url.parse('http://mapstory.org/geoserver');
                options.route = '/geoserver';
                return proxy(options);
            })();
            var dynamicProxy = function(req, res, next) {
                var parts = url.parse(req.url);
                if (parts.pathname === '/proxy') {
                    var target = parts.search.replace('?url=', '');
                    var options = url.parse(target);
                    req.url = options.path;
                    return proxy(options)(req, res, next);
                }
                return next();
            };
            return [fixedProxy, dynamicProxy];
        }
    });
});

gulp.task('watch-examples', function() {
    gulp.watch('examples/*', function() {
        gulp.src('examples/*').pipe(connect.reload());
    });
});

gulp.task('clean', function() {
    gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('minify', ['scripts'], function() {
    gulp.src('dist/time-controls.js').pipe(uglify()).pipe(rename({ extname: '.min.js' })).pipe(gulp.dest('dist'));
});

gulp.task('lint', lint);

gulp.task('timeBundle', timeBundle);

gulp.task('scripts', ['timeBundle']);

gulp.task('tests', tests);

gulp.task('test', ['clean', 'tests'], runTests);

gulp.task('default', ['clean', 'lint', 'test', 'minify']);

gulp.task('develop', ['connect', 'tdd', 'watch-examples']);

gulp.task('tdd', tdd);
