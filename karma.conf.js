module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: ['dist/tests.js']
  });
};