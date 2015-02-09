'use strict';

(function() {

    var module = angular.module('fullExample', [
        'storytools.examples.common',
        'storytools.core.time',
        'storytools.core.mapstory',
        'storytools.edit.style',
        'storytools.edit.boxes',
        'storytools.edit.pins',
        'colorpicker.module',
        'ui.bootstrap'
    ]);

    // @todo determine mapid approach - this is currently used by stAnnotationsStore
    // longer term, this could be controlled using a route, for now it's Jenny
    module.constant('mapid', 8675309);

    module.controller('exampleController', function($scope, mapFactory, TimeControlsManager,
        styleUpdater, stAnnotationsStore, StoryPinLayerManager, stMapConfigStore) {
        $scope.map = mapFactory.create();
        $scope.pinsOverlay = new ol.FeatureOverlay({
            map: $scope.map.map
        });

        var storyPins = stAnnotationsStore.loadAnnotations();
        var pinsLayerManager = new StoryPinLayerManager(storyPins);
        var timeControlsManager = new TimeControlsManager({
            mode: $scope.map.mode,
            map: $scope.map.map,
            pinsLayerManager: pinsLayerManager
        });
        $scope.pinsLayerManager = pinsLayerManager;
        $scope.timeControlsManager = timeControlsManager;
        $scope.map.map.addLayer(pinsLayerManager.storyPinsLayer);

        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        $scope.saveMap = function(mapid) {
            var config = new storytools.mapstory.MapConfig.MapConfig().write($scope.map, mapid);
            stMapConfigStore.saveConfig(config);
        };
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };

    });
})();
