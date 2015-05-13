'use strict';

(function() {

    var module = angular.module('viewer', [
        'storytools.examples.common'
    ]);

    module.controller('exampleController', function($scope, MapManager, TimeControlsManager) {
        var map = MapManager;

        var timeControlsManager = new TimeControlsManager({
            mode: map.mode,
            storyMap: map.storyMap,
            pinsLayerManager: map.storyPinLayerManager
        });
        $scope.map = map;
        $scope.timeControlsManager = timeControlsManager;

        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

    });
})();
