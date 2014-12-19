(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.services', [
        'mapstory.styleEditor.core',
        'mapstory.styleEditor.ol3StyleConverter',
        'mapstory.styleEditor.styleRuleBuilder',
        'mapstory.styleEditor.styleChoices',
        'mapstory.styleEditor.styleTypes',
        'mapstory.styleEditor.svgIcon',
    ]);

    // pull in these core edit services
    module.factory('WPSClassify', [storytools.edit.WPSClassify]);
    module.factory('SLDStyleConverter', [storytools.edit.SLDStyleConverter]);

})();