var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var browserify = require('browserify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var refresh = require('gulp-livereload');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var karma = require('karma').server;
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

var watch = false;
var styleSources = 'lib/style/**/*.js';
var styleBundleDest = 'mapstory-style-editor.js';
var styleTemplates = 'lib/style/templates/*.html';
var styleTemplatesBundle = 'mapstory-style-editor-tpls.js';
var styleCSS = 'mapstory-style-editor.css';
var sources = ['lib/time/*.js', styleSources];

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

function timeBundle(test) {
    return bundle(browserify({
        entries: ['./lib/time/controls.js'],
        standalone: 'timeControls'
    }), 'time-controls.js', test);
}

function styleBundle() {
    var stream = gulp.src(styleSources)
        .pipe(concat(styleBundleDest))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    stream.on('end', function() {
        util.log("bundled", util.colors.cyan(styleBundleDest));
    });
}

function styleLess() {
    gulp.src('lib/style/style.less')
        .pipe(less({
            paths: ['bower_components/bootstrap/less']
        }))
        .pipe(rename(styleCSS))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
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

function runAndWatch(sources, func) {
    func();
    gulp.watch(sources, func);
}

function tdd() {
    watch = true;
    runAndWatch(sources, lint);
    runAndWatch(styleSources, styleBundle);
    runAndWatch(styleTemplates, templates);
    runAndWatch('lib/style/style.less', styleLess);
    timeBundle(false);
    tests();
}

function templates() {
    return gulp.src(styleTemplates)
        .pipe(templateCache(styleTemplatesBundle, {
            standalone: true,
            module: 'mapstory.styleEditor.templates'
        })).pipe(gulp.dest('dist')).pipe(connect.reload());
}

function minify() {
    function doMinify(src) {
        gulp.src(src).pipe(uglify()).pipe(rename({extname: '.min.js'})).pipe(gulp.dest('dist'));
    }
    doMinify('dist/time-controls.js');
    // @todo test+verify w/ minified
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
            var fixedProxyMaps = (function() {
                var options = url.parse('http://mapstory.org/maps');
                options.route = '/maps';
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
            return [fixedProxy, fixedProxyMaps, dynamicProxy];
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

gulp.task('minify', ['scripts'], minify);

gulp.task('lint', lint);

gulp.task('timeBundle', timeBundle);

gulp.task('templates', templates);

gulp.task('styleBundle', styleBundle);

gulp.task('timeBundle', timeBundle);

gulp.task('styleLess', styleLess);

gulp.task('scripts', ['tests', 'timeBundle', 'styleBundle', 'styleLess']);

gulp.task('tests', tests);

gulp.task('test', ['clean', 'tests'], runTests);

gulp.task('default', ['clean', 'lint', 'test', 'scripts'], minify);

gulp.task('develop', ['connect', 'tdd', 'watch-examples']);

gulp.task('tdd', tdd);
