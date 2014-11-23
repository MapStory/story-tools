module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/tests.js'
    ]
  });
};