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

    // @todo determine mapid approach
    // longer term, this could be controlled using a route, for now it's Jenny
    module.constant('mapid', 8675309);

    module.controller('exampleController', function($scope, mapFactory, stTimeControlsFactory, styleUpdater, stMapConfigStore) {
        $scope.map = mapFactory.create();
        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        $scope.saveMap = function(mapid) {
            var config = new storytools.mapstory.MapConfig.MapConfig().write($scope.map, mapid);
            stMapConfigStore.saveConfig(config);
        };
        // we currently need to lazily create the timeControls, should probably extract this
        // @todo! we don't want to create the timeControls here if there is a saved configuration
        $scope.map.map.getLayers().on('change:length', function() {
            if ($scope.timeControls == null) {
                // need some layer with time to start with
                var hasTime = false;
                $scope.map.map.getLayers().forEach(function(l) {
                    hasTime |= angular.isDefined(l.get('times'));
                });
                if (hasTime) {
                    $scope.timeControls = stTimeControlsFactory.create({mode: $scope.map.mode, map: $scope.map.map});
                    if ($scope.map.mode) {
                        $scope.playbackOptions.mode = $scope.map.mode;
                    }
                }
            }
        });
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };

        $scope.overlay = new ol.FeatureOverlay({
            map: $scope.map.map
        });

        var defaultStyle = [new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                stroke: new ol.style.Stroke({color: 'red', width: 1}),
                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                    stroke: new ol.style.Stroke({color: 'red', width: 1})
                })
            })];
        var pinsLayer = new ol.layer.Vector({source: new ol.source.Vector(), style: defaultStyle});
        $scope.pinsLayer = pinsLayer;
        $scope.map.map.addLayer(pinsLayer);

    });
})();
