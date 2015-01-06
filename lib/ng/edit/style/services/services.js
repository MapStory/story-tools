(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.services', [
        'storytools.core.style',
        'storytools.edit.style.styleRuleBuilder',
        'storytools.edit.style.styleChoices',
        'storytools.edit.style.styleTypes',
    ]);

    // pull in these core edit services
    module.factory('WPSClassify', [storytools.edit.WPSClassify]);
    module.factory('SLDStyleConverter', [storytools.edit.SLDStyleConverter]);

})();
