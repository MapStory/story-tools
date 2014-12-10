var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var browserify = require('browserify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var karma = require('karma').server;
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var devServer = require('./dev-server.js');

var watch = false;
var styleSources = 'lib/style/**/*.js';
var styleBundleDest = 'mapstory-style-editor.js';
var styleTemplates = 'lib/style/templates/**/*.html';
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

function doBundle(browserify, bundleName, tasks) {
    var bundle = browserify.bundle();
    bundle.on('error', function(err) {
        util.log(util.colors.red('Error:'), err.message);
        notify('browserify error ' + err.toString());
        this.end();
    });
    var bundleStream = bundle
        .pipe(source(bundleName))
        .pipe(gulp.dest('dist'));
    bundleStream.on('end', function() {
        util.log("bundled", util.colors.cyan(bundleName));
        if (tasks) {
            gulp.start(tasks);
        }
    });
    return bundleStream;
}

function bundle(browserify, bundleName, tasks) {
    if (watch) {
        browserify = watchify(browserify);
    }
    browserify.on('update', function() {
        // if in watch mode, run the follow-up tasks when updated
        doBundle(browserify, bundleName, tasks);
    });
    return doBundle(browserify, bundleName);
}

gulp.task('connect', function() {
    devServer.run();
});

gulp.task('clean', function() {
    gulp.src('dist/*', {read: false})
        .pipe(rimraf());
});

gulp.task('minify', ['scripts'], function() {
    function doMinify(src) {
        gulp.src(src).pipe(uglify()).pipe(rename({extname: '.min.js'})).pipe(gulp.dest('dist'));
    }
    doMinify('dist/time-controls.js');
});

gulp.task('lint', function() {
    var lintStream = gulp.src(sources)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
    lintStream.on('error', function() {
        notify('linting failed');
    });
    return lintStream;
});

gulp.task('templates', function() {
    return gulp.src(styleTemplates)
        .pipe(templateCache(styleTemplatesBundle, {
            standalone: true,
            module: 'mapstory.styleEditor.templates'
        })).pipe(gulp.dest('dist'));
});

gulp.task('styleBundle', function() {
    var stream = gulp.src(styleSources)
        .pipe(concat(styleBundleDest))
        .pipe(gulp.dest('dist'));
    stream.on('end', function() {
        util.log("bundled", util.colors.cyan(styleBundleDest));
    });
});

gulp.task('timeBundle', function() {
    return bundle(browserify({
        entries: ['./lib/time/controls.js'],
        standalone: 'timeControls'
    }), 'time-controls.js', ['lint', 'karma']);
});

gulp.task('styleLess', function() {
    gulp.src('lib/style/style.less')
        .pipe(less({
            paths: ['bower_components/bootstrap/less']
        }))
        .pipe(rename(styleCSS))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['timeBundle', 'styleBundle', 'styleLess', 'templates']);

gulp.task('testsBundle', function() {
    return doBundle(browserify('./test/tests.js'), 'tests.js', ['karma']);
});

gulp.task('karma', ['testsBundle'], function() {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(failed) {
        notify(failed > 0 ? failed + ' failures' : 'passing!');
    });
});

gulp.task('test', ['clean', 'karma']);

gulp.task('default', ['clean', 'lint', 'test', 'minify']);

gulp.task('develop', ['connect', 'watch']);

gulp.task('watch', ['lint', 'styleBundle', 'styleLess', 'templates'], function() {
    // enable watch mode and start watchify tasks
    watch = true;
    gulp.start('timeBundle');
    gulp.start('testsBundle');
    // and style related tasks
    gulp.watch(styleSources, ['lint', 'karma', 'styleBundle']);
    gulp.watch(styleTemplates, ['templates']);
    gulp.watch('lib/style/style.less', ['styleLess']);
    // reload on changes to bundles but ignore tests bundle
    gulp.watch(['dist/*', 'examples/*']).on('change', function(f) {
        gulp.src([f.path,'!**/tests.js']).pipe(connect.reload());
    });
});
