var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var refresh = require('gulp-livereload');
var connect = require('gulp-connect');
var karma = require('karma').server;
var notifier = require('node-notifier');

var watch = false;

function notify(msg) {
    notifier.notify({
        'title': 'story-tools notification',
        'message': msg
    });
}

function bundle(browserify, bundleName) {
    if (watch) {
        browserify = watchify(browserify);
    }
    function doBundle() {
        var bundle = browserify.bundle();
        bundle.on('error', function(err) {
            util.log(util.colors.red('Error:'), err.message);
            if (watch) {
                notify('browserify error ' + err.toString());
            }
            this.end();
        });
        var done = bundle
                .pipe(source(bundleName))
                .pipe(gulp.dest('dist'))
                .pipe(connect.reload());
        util.log("bundled", util.colors.cyan('bundleName'));
        return done;
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

gulp.task('scripts', scripts);

gulp.task('connect', function() {
    var url = require('url');
    var proxy = require('proxy-middleware');
    connect.server({
        root: '.',
        livereload: true,
        middleware: function(connect, o) {
            var fixedProxy = (function() {
                var options = url.parse('http://mapstory.org/geoserver');
                options.route = '/geoserver';
                return proxy(options);
            })();
            // this almost works - need to unpack passed url and rewrite stuff
            var dynamicProxy = function(req, res, next) {
                var parts = url.parse(req.url);
                if (parts.pathname === '/proxy') {
                    var options = url.parse(parts.search.replace('?proxy=', ''));
                    var x = proxy(options)(req, res, next);
                }
                return next();
            };
            return [fixedProxy, dynamicProxy];
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
    watch = true;
    scripts();
});

gulp.task('default', ['connect', 'watch']);