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
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
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
