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

    // @todo determine mapid approach - this is currently used by stAnnotationsStore
    // longer term, this could be controlled using a route, for now it's Jenny
    module.constant('mapid', 8675309);

    module.controller('exampleController', function($scope, mapFactory, stTimeControlsFactory, styleUpdater, stAnnotationsStore, stStoryPins) {
        $scope.map = mapFactory.create();
        $scope.overlay = new ol.FeatureOverlay({
            map: $scope.map.map
        });
        // @todo - provisional default story pins style
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
        pinsLayer.set('timeAttribute', 'start_time');
        $scope.pinsLayer = pinsLayer;
        $scope.map.map.addLayer(pinsLayer);

        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        function maybeInitTimeControls() {
            if ($scope.timeControls == null) {
                // need some layer with time to start with
                var hasTime = false;
                $scope.map.map.getLayers().forEach(function(l) {
                    hasTime |= angular.isDefined(l.get('times'));
                });
                if (hasTime) {
                    $scope.timeControls = stTimeControlsFactory.create({
                        mode: $scope.map.mode,
                        map: $scope.map.map,
                        annotations: $scope.storyPins
                    });
                }
            }
        }

        // we currently need to lazily create the timeControls, should probably extract this
        // @todo! we don't want to create the timeControls here if there is a saved configuration
        $scope.map.map.getLayers().on('change:length', maybeInitTimeControls);
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };

        $scope.storyPins = stAnnotationsStore.loadAnnotations();
        if ($scope.storyPins) {
            // @todo this should be extracted to somewhere reusable
            var features = [];
            var start = null;
            var end = null;
            $scope.storyPins.forEach(function(s) {
                if (s && s.$feature) {
                    features.push(s.$feature);
                }
                // @todo deal w/ end time
                if (s.start_time) {
                    start = (start === null) ? s.start_time : Math.min(start, s.start_time);
                    end = (end === null) ? s.start_time : Math.max(end, s.start_time);
                }
            });
            if (start != null && end != null) {
                $scope.pinsLayer.set('times', [start, end]);
            }
            $scope.pinsLayer.getSource().addFeatures(features);
        }

        $scope.pinsEditorListener = {
            pinsChanged: function(pins, action) {
                maybeInitTimeControls();
                if ($scope.timeControls) {
                    // @todo timeControls does not compute total range on update
                    $scope.timeControls.update({
                        annotations: $scope.storyPins
                    });
                }
                stAnnotationsStore.saveAnnotations($scope.storyPins);
            }
        };

        maybeInitTimeControls();
    });
})();
