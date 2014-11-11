module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: ['dist/tests.js']
  });
};