'use strict';

(function() {

    var module = angular.module('styleExample', ['mapstory.styleEditor',
    'colorpicker.module']);
    var map;

    function makeLayers() {
        function makeLayer(name, type, data, atts) {
            var f = data.map(function(d) {
                return new ol.Feature(d);
            });
            var vector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: f
                })
            });
            vector._styles = null;
            vector._layerInfo = {
                geomType: type,
                attributes: atts
            };
            vector.set('id', name);
            map.addLayer(vector);
        }
        makeLayer('point1', 'point', [
            {'geometry': new ol.geom.Point([-500000, -500000])},
            {'geometry': new ol.geom.Point([-500000, -400000])},
            {'geometry': new ol.geom.Point([-500000, -300000])},
            {'geometry': new ol.geom.Point([-500000, -200000])},
            {'geometry': new ol.geom.Point([-500000, -100000])}
        ], ['p1a1','p1a2','p1a3']);
        makeLayer('point2', 'point', [
            {'geometry': new ol.geom.Point([-750000, -500000])},
            {'geometry': new ol.geom.Point([-750000, -400000])},
            {'geometry': new ol.geom.Point([-750000, -300000])},
            {'geometry': new ol.geom.Point([-750000, -200000])},
            {'geometry': new ol.geom.Point([-750000, -100000])}
        ], ['p2a1','p2a2','p2a3']);
        makeLayer('line', 'line', [
            {'geometry': new ol.geom.LineString([[0, 0], [-500000, 500000]])}
        ], ['l1','l2','l3']);
    }

    module.run(function() {
        map = new ol.Map({
            layers: [new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'sat'})
                })],
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 3
            })
        });
        window.map = map;

        makeLayers();
    });

    module.provider('styleDefaults', function() {
        // default values
        var values = {
            fillColor: '#ff0000',
            strokeColor: '#ffff00',
            strokeWidth: 3
        };
        return {
            $get: function() {
                return values;
            }
        };
    });

    module.controller('exampleController', function($scope, ol3StyleConverter) {
        $scope.styleChanged = function(layer) {
            $scope.styleJSON = angular.toJson(layer.style, true);
            layer._layer.setStyle(ol3StyleConverter.generateStyle(layer.style));
        };
    });

    module.controller('layerController', function($scope) {
        $scope.layers = map.getLayers().getArray().slice(1).map(function(l) {
            return {
                _layer: l,
                info : l._layerInfo
            };
        });
    });

    module.directive("layerSelector", function() {
            return {
                restrict: "E",
                templateUrl: "layer-selector-template",
                link: function(scope, elem) {
                    scope.setLayer = function(layer) {
                        var old = scope.selectedLayer;
                        if (old) {
                            old._selected = false;
                        }
                        scope.selectedLayer = layer;
                        scope.selectedLayer._selected = true;
                    };
                    scope.setLayer(scope.layers[0]);
                }
            };
        });
})();
