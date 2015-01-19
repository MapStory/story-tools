(function() {
    'use strict';
    var module = angular.module('storytools.edit.boxes.directives', []);

    module.directive('boxChooser', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/box-chooser.html'
        };
    });

    module.directive('boxesEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/boxes-editor.html'
        };
    });

    module.directive('boxEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/box-editor.html'
        };
    });
})();