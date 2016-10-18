(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.services', [
        'storytools.core.style',
        'storytools.edit.style.styleRuleBuilder',
        'storytools.edit.style.styleChoices',
        'storytools.edit.style.styleTypes',
        'storytools.edit.style.layerClassificationService',
        'storytools.edit.style.iconCommons',
        'storytools.edit.style.styleStorageService'
    ]);

    // pull in these core edit services
    module.factory('WPSClassify', [storytools.edit.WPSClassify]);
    module.factory('SLDStyleConverter', [storytools.edit.SLDStyleConverter]);
    module.factory('WFSDescribeFeatureType', [storytools.edit.WFSDescribeFeatureType]);
    module.factory('StyleComplete', [storytools.edit.StyleComplete]);

})();
