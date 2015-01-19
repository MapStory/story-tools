(function() {
    'use strict';
    var module = angular.module('storytools.edit.pins.directives', []);

    module.directive('pinChooser', function() {
        return {
            restrict: 'E',
            templateUrl: 'pins/pin-chooser.html'
        };
    });

    module.directive('pinsEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'pins/pins-editor.html'
        };
    });

    module.directive('pinEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'pins/pin-editor.html'
        };
    });
})();