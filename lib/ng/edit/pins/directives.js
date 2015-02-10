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
                ctrl.storyPinLayerManager = scope.$eval(atts.pinsLayerManager);
                ctrl.overlay = scope.$eval(atts.pinsOverlay);
            }
        };
    });

    module.directive('pinChooser', function() {
        return {
            require: '^pinsEditor',
            restrict: 'E',
            templateUrl: 'pins/pin-chooser.html',
            link: function(scope, el, atts, ctrl) {
                // just wrap the ctrl call to allow the callback
                scope.editPin = function(pin) {
                    ctrl.editStoryPin(pin);
                    scope.$eval(atts.pinSelected, scope.$parent);
                };
            }
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

    module.directive('pinEditorForm', function() {
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
                    return scope.pinsCtrl.activeDrawTool === 'Point';
                };
                scope.$watch('point', coordinatesChanged, true);
            }
        };
    });
})();
