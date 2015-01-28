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

        $scope.overlay = new ol.FeatureOverlay({
            map: $scope.map.map
        });

        var vector = new ol.layer.Vector({source: new ol.source.Vector()});
        $scope.map.map.addLayer(vector);

        $scope.newStoryPin = {};
        $scope.storyPins =  [];
        $scope.newPinFormInvalid = true;
        $scope.newStoryPinChanged = function(valid) {
            $scope.newPinFormInvalid = !valid;
        };
        $scope.addStoryPin = function() {
            var feature = new ol.Feature({title: $scope.newStoryPin.title});
            if ($scope.newStoryPin.longitude && $scope.newStoryPin.latitude) {
                feature.setGeometry(new ol.geom.Point([
                    parseFloat($scope.newStoryPin.longitude),
                    parseFloat($scope.newStoryPin.latitude)
                ]).transform('EPSG:4326', $scope.map.map.getView().getProjection()));
            } else if ($scope.overlay.getFeatures().getLength() > 0) {
                feature.setGeometry($scope.overlay.getFeatures().item(0).getGeometry());
            }
            if (feature.getGeometry()) {
                vector.getSource().addFeature(feature);
            }
            $scope.storyPins.push(angular.copy($scope.newStoryPin));
            $scope.overlay.getFeatures().clear();
            $scope.newStoryPin = {};
        };
    });
})();
