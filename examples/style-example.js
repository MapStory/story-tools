'use strict';

(function() {

    var module = angular.module('styleExample', [
        'storytools.edit.style',
        'storytools.examples.common',
        'colorpicker.module']);
    var mapManager;

    function makeLayers() {
        function makeLayer(name, type, data, atts) {
            var f = data.map(function(d) {
                for (var i=0, ii=atts.length; i<ii; ++i) {
                    d[atts[i]] = parseInt(Math.random()*10);
                }
                // add a dummy rotation field
                d['rotation'] = Math.PI / parseInt(Math.max(1, Math.random()*4));
                d['rotation_degrees'] = 360 / parseInt(Math.max(1, Math.random()*12));
                return new ol.Feature(d);
            });
            atts.push('rotation', 'rotation_degrees');
            mapManager.addMemoryLayer({
                id: name,
                geomType: type,
                features: f,
                attributes: atts
            });
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

    module.run(function(mapFactory) {
        mapManager = mapFactory.create();
        makeLayers();
    });

    // inject some high-contrast defaults
    module.provider('stStyleDefaults', function() {
        // default values
        var values = {
            fillColor: '#ff0000',
            strokeColor: '#ffff00',
            strokeWidth: 3,
            size: 24
        };
        return {
            $get: function() {
                return values;
            }
        };
    });

    module.controller('exampleController', function($scope, styleUpdater) {
        $scope.styleFormInvalid = false;

        $scope.loaddata = function(url) {
            mapManager.addMemoryLayer({
                url: url
            });
        };
        $scope.loadwms = function(wmslayer) {
            mapManager.addLayer(wmslayer, false, 'local');
        };
        $scope.styleChanged = function(layer) {
            $scope.styleJSON = angular.toJson(layer.style, true);
            styleUpdater.updateStyle(layer);
        };
        $scope.formChanged = function(form) {
            $scope.styleFormInvalid = form.$invalid;
        };
    });

    module.controller('layerController', function($scope) {
        $scope.layers = [];
        function update() {
            $scope.layers = mapManager.getNamedLayers();
        }
        mapManager.map.getLayers().on('add', function() {
           update();
        });
        update();
    });

    module.directive("layerSelector", function() {
            return {
                restrict: "E",
                templateUrl: "layer-selector-template",
                link: function(scope, elem) {
                    scope.selectedLayer = null;
                    scope.setLayer = function(layer) {
                        if (!layer) return;
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
