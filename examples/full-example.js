'use strict';

(function() {

    var module = angular.module('fullExample', [
        'storytools.examples.common',
        'storytools.core.time',
        'storytools.edit.style',
        'storytools.edit.boxes',
        'storytools.edit.pins',
        'colorpicker.module',
        'ui.bootstrap'
    ]);

    module.controller('exampleController', function($scope, mapFactory, stTimeControlsFactory, styleUpdater) {
        $scope.map = mapFactory.create();
        $scope.timeControls = null;

        // we currently need to lazily create the timeControls, should probably extract this
        // @todo! we don't want to create the timeControls here if there is a saved configuration
        $scope.map.map.getLayers().on('change:length', function() {
            if ($scope.timeControls == null) {
                // need some layer with time to start with
                var hasTime = false;
                $scope.map.map.getLayers().forEach(function(l) {
                    hasTime |= angular.isDefined(l._times);
                });
                if (hasTime) {
                    $scope.timeControls = stTimeControlsFactory.create({mode: $scope.map.mode, map: $scope.map.map});
                }
            }
        });
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };

        $scope.newStoryPin = {};
        $scope.storyPins =  [];
        $scope.newPinFormInvalid = true;
        $scope.newStoryPinChanged = function(valid) {
            $scope.newPinFormInvalid = !valid;
        };
        $scope.addStoryPin = function() {
            $scope.storyPins.push(angular.copy($scope.newStoryPin));
            $scope.newStoryPin = {};
        };
    });
})();
