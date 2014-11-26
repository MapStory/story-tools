module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'examples/ol-debug.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/tests.js'
    ]
  });
};