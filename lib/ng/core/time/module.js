(function() {
    'use strict';

    var module = angular.module('storytools.core.time', [
        'storytools.core.time.directives',
        'storytools.core.time.services',
        'storytools.core.templates'
    ]);

    module.filter('isodate', function() {
        // @todo should support optional precision specifier (as unit?)
        return function(input) {
            return input !== null && angular.isDefined(input)  ?
                angular.isNumber(input) ? new Date(input).toISOString():
                    Date.parse(input).toISOString():
                    '';
        };
    });

})();