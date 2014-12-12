module.exports = function(config) {
  config.set({
    basePath: '.',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'examples/ol.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jsonix/dist/Jsonix-all.js',
        'examples/mappings/XLink_1_0.js',
        'examples/mappings/Filter_1_0_0.js',
        'examples/mappings/GML_2_1_2.js',
        'examples/mappings/SLD_1_0_0.js',
        'examples/mappings/OWS_1_1_0.js',
        'examples/mappings/WPS_1_0_0.js',
        'examples/mappings/GML_3_1_1.js',
        'examples/mappings/SMIL_2_0.js',
        'examples/mappings/SMIL_2_0_Language.js',
        'examples/mappings/OWS_1_0_0.js',
        'examples/mappings/Filter_1_1_0.js',
        'examples/mappings/WFS_1_1_0.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/tests.js',
        /* must be included to have ng-html2js pick them up */
        'lib/style/templates/**/*.html'
    ],
    preprocessors : {
        'lib/style/templates/**/*.html': ['ng-html2js']
    },
    /* this pulls in our templates and modularizes them */
    ngHtml2JsPreprocessor : {
        moduleName: 'mapstory.styleEditor.templates',
        stripPrefix: 'lib/style/templates/'
    }
  });
};
