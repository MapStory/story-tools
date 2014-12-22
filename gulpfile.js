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

// internal
var watch = false;

// outputs
var coreLibsBundle = 'story-tools-core.js';
var editLibsBundle = 'story-tools-edit.js';
var editCoreBundle = 'story-tools-core-ng.js';
var editNgBundle = 'story-tools-edit-ng.js';
var coreNgBundle = 'story-tools-core-ng.js';
var editTemplatesBundle = 'story-tools-edit-tpls.js';
var editLess = 'lib/ng/edit/style.less';

// inputs
var coreNg = 'lib/ng/core/**/*.js';
var editNg = 'lib/ng/edit/**/*.js';
var editTemplates = 'lib/ng/templates/**/*.html';

var sources = ['lib/**/*.js'];

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
    doMinify('dist/' + coreLibsBundle);
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

gulp.task('bundleEditTemplates', function() {
    return gulp.src(editTemplates)
        .pipe(templateCache(editTemplatesBundle, {
            standalone: true,
            module: 'mapstory.styleEditor.templates'
        })).pipe(gulp.dest('dist'));
});

/** 
 * bundle all core libraries exposing core exports on the global object
 * storytools.core
 */
gulp.task('bundleCoreLibs', function() {
    return bundle(browserify({
        entries: ['./lib/core/index.js'],
        standalone: 'storytools.core'
    }), coreLibsBundle, ['lint', 'karma']);
});

/** 
 * bundle all edit libraries exposing edit exports on the global object
 * storytools.edit
 */
gulp.task('bundleEditLibs', function() {
    return bundle(browserify({
        entries: ['./lib/edit/index.js'],
        standalone: 'storytools.edit'
    }), editLibsBundle, ['lint', 'karma']);
});

/**
 * concat edit angular
 */
gulp.task('bundleEditNg', function() {
    var stream = gulp.src(editNg)
        .pipe(concat(editNgBundle))
        .pipe(gulp.dest('dist'));
    stream.on('end', function() {
        util.log("bundled", util.colors.cyan(editNgBundle));
    });
});

/**
 * concat core angular
 */
gulp.task('bundleCoreNg', function() {
    var stream = gulp.src(coreNg)
        .pipe(concat(coreNgBundle))
        .pipe(gulp.dest('dist'));
    stream.on('end', function() {
        util.log("bundled", util.colors.cyan(coreNgBundle));
    });
});

/**
 * combined bundle of all core
 */
gulp.task('bundleCore', ['bundleCoreLibs', 'bundleCoreNg'], function() {
    // @todo concat both bundles
});

/**
 * combined bundle of all edit
 */
gulp.task('bundleEdit', ['bundleEditLibs', 'bundleEditNg'], function() {
    // @todo concat both bundles
});

gulp.task('lessEdit', function() {
    gulp.src(editLess)
        .pipe(less({
            paths: ['bower_components/bootstrap/less']
        }))
        .pipe(rename('story-tools-edit.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['bundleEdit', 'bundleCore', 'lessEdit', 'bundleEditTemplates']);

gulp.task('testsBundle', function() {
    return doBundle(browserify({entries:'./test/tests.js', debug:true, paths: ['../lib/']}), 'tests.js', ['karma']);
});

gulp.task('karma', ['testsBundle'], function() {
    var server = util.env['server'] ? true : false;
    var conf = {
        configFile: __dirname + '/karma.conf.js',
        singleRun: !server
    };
    return karma.start(conf, function(failed) {
        notify(failed > 0 ? failed + ' failures' : 'passing!');
    });
});

gulp.task('tdd', ['test'], function() {
    watch = true;
    gulp.watch('test/*', ['karma']);
});

gulp.task('test', ['clean', 'karma']);

gulp.task('default', ['clean', 'lint', 'test', 'minify']);

gulp.task('develop', ['connect', 'watch']);

gulp.task('watch', ['lint', 'bundleEditNg', 'lessEdit', 'bundleEditTemplates'], function() {
    // enable watch mode and start watchify tasks
    watch = true;
    gulp.start('bundleCore');
    gulp.start('bundleEdit');
    gulp.start('testsBundle');
    // and ng related tasks
    gulp.watch(editNg, ['lint', 'karma', 'bundleEditNg']);
    gulp.watch(editTemplates, ['bundleEditTemplates']);
    gulp.watch(editLess, ['lessEdit']);
    // reload on changes to bundles but ignore tests bundle
    gulp.watch(['dist/*', 'examples/*']).on('change', function(f) {
        gulp.src([f.path,'!**/tests.js']).pipe(connect.reload());
    });
});
