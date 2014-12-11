module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'examples/ol.js',
        'bower_components/jsonix/dist/Jsonix-all.js',
        'examples/mappings/XLink_1_0.js',
        'examples/mappings/Filter_1_0_0.js',
        'examples/mappings/GML_2_1_2.js',
        'examples/mappings/SLD_1_0_0.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/tests.js'
    ]
  });
};
