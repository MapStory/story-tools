(function() {
    'use strict';
    var module = angular.module('storytools.edit.pins.directives', []);

    module.directive('pinChooser', function() {
        return {
            scope: {
                storyPins: '='
            },
            restrict: 'E',
            templateUrl: 'pins/pin-chooser.html'
        };
    });

    module.directive('pinEditor', function() {
        return {
            scope: {
                storyPin: '=?',
                onValidChange: '=?',
                overlay: '='
            },
            controller: 'pinEditorController',
            restrict: 'E',
            templateUrl: 'pins/pin-editor.html'
        };
    });
})();
