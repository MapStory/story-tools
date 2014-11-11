var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var refresh = require('gulp-livereload');
var connect = require('gulp-connect');
var karma = require('karma').server;
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');

var watch = false;

function notify(msg) {
    if (watch) {
        notifier.notify({
            'title': 'story-tools notification',
            'message': msg
        });
    }
}

function bundle(browserify, bundleName, whenDone) {
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
            if (whenDone) {
                whenDone();
            }
        });
        return bundleStream;
    }
    browserify.on('update', doBundle);
    return doBundle();
}

function scripts() {
    return bundle(browserify({
        entries: ['./lib/time/controls.js'],
        standalone: 'timeControls'
    }), 'time-controls.js');
}

function tests(done) {
    return bundle(browserify('./test/tests.js'), 'tests.js', done);
}

function runTests(done) {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
}

gulp.task('scripts', scripts);

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

gulp.task('tdd', function(done) {
    watch = true;
    function cb() {
        runTests(function(failed) {
            notify(failed > 0 ? failed + ' failures' : 'passing!');
        });
    }
    scripts(cb);
    tests(cb);
});

gulp.task('test', function() {
    tests();
    runTests();
});

gulp.task('watch', function() {
    watch = true;
    scripts();
    gulp.watch('examples/*', function() {
        gulp.src('examples/*').pipe(connect.reload());
    });
});

gulp.task('develop', ['connect', 'tdd', 'watch']);

gulp.task('default', ['test'], function() {
    scripts();
    gulp.src('dist/time-controls.js').pipe(uglify()).pipe(rename({ extname: '.min.js' })).pipe(gulp.dest('dist'));
});