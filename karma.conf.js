module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'test/custom_matcher.js',
        'examples/ol-debug.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'dist/ows.js',
        'dist/tests.js',
        /* must be included to have ng-html2js pick them up */
        'lib/templates/**/*.html'
    ],
    preprocessors : {
        'lib/templates/**/*.html': ['ng-html2js'],
        'dist/tests.js': ['sourcemap']
    },
    /* this pulls in all templates and modularizes them */
    ngHtml2JsPreprocessor : {
        moduleName: 'storytools.allTemplates',
        /* template paths are stripped of core/edit */
        stripPrefix: 'lib/templates/[^/]+/'
    }
  });
};
