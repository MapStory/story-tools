(function() {
    'use strict';
    var module = angular.module('storytools.edit.pins.directives', [
        'storytools.core.pins'
    ]);

    module.directive('pinsEditor', function() {
        return {
            restrict: 'A',
            controller: 'pinsEditorController',
            controllerAs: 'pinsCtrl',
            link: function(scope, el, atts) {
                var ctrl = scope.pinsCtrl;
                // @todo eval from scope using attrs - otherwise names are fixed
                // or limited to those in parent scope. using an isolate scope
                // with `controllerAs` doesn't work so well - ctrl not
                // available in parent context
                ctrl.storyPins = scope.storyPins || [];
                ctrl.overlay = scope.overlay;
                ctrl.targetLayer = scope.pinsLayer;
                if (atts.pinsEditorListener) {
                    ctrl.pinsEditorListener = scope.$eval(atts.pinsEditorListener);
                }
            }
        };
    });

    module.directive('pinChooser', function() {
        return {
            require: '^pinsEditor',
            restrict: 'E',
            templateUrl: 'pins/pin-chooser.html'
        };
    });

    module.directive('pinEditor', function() {
        return {
            require: '^pinsEditor',
            controller: 'pinEditorController',
            controllerAs: 'pinCtrl',
            restrict: 'A'
        };
    });

    module.directive('pinEditorForm', function(stStoryPins) {
        return {
            require: '^pinEditor',
            restrict: 'E',
            templateUrl: 'pins/pin-editor-form.html',
            link: function(scope, el, atts, ctrl) {
                scope.point = {};
                function coordinatesChanged() {
                    if (scope.point.latitude && scope.point.longitude) {
                        var geom = new ol.geom.Point([
                            parseFloat(scope.point.longitude),
                            parseFloat(scope.point.latitude)
                        ]).transform('EPSG:4326', scope.map.map.getView().getProjection());
                        // @todo finish this - the geometry is not updated here
                    }
                }
                scope.showPointCoordinates = function() {
                    return true;
                };
                scope.$watch('point', coordinatesChanged, true);
            }
        };
    });
})();
