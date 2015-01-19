'use strict';

(function() {

    var module = angular.module('styleExample', [
        'storytools.edit.style',
        'colorpicker.module']);
    var map;

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

    module.controller('exampleController', function($scope, $http, ol3StyleConverter) {
        var sld = new storytools.edit.SLDStyleConverter.SLDStyleConverter();
        $scope.styleFormInvalid = false;
        $scope.styleChanged = function(layer) {
            $scope.styleJSON = angular.toJson(layer.style, true);
            if (layer._layer instanceof ol.layer.Vector) {
                layer._layer.setStyle(function(feature, resolution) {
                    return ol3StyleConverter.generateStyle(layer.style, feature, resolution);
                });
            } else {
                var xml = sld.generateStyle(layer.style, layer._layer.getSource().getParams().LAYERS, true);
                if (xml !== null) {
                    $http({
                        url: '/gslocal/rest/styles/' + layer._layer._layerInfo.styleName + '.xml',
                        method: "PUT",
                        data: xml,
                        headers: {'Content-Type': 'application/vnd.ogc.sld+xml; charset=UTF-8'}
                    }).then(function(result) {
                        layer._layer.getSource().updateParams({"_olSalt": Math.random()});
                    });
                }
            }
            $scope.loadwms = function(wmslayer) {
                var layer = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: '/gslocal/wms',
                        params: {
                            'LAYERS': wmslayer,
                            'VERSION': '1.1.0',
                            'TILED': true
                        },
                        serverType: 'geoserver'
                    })
                });
                $http({
                    method: 'GET',
                    url: '/gslocal/wfs',
                    params: {
                        'SERVICE': 'WFS',
                        'VERSION': '1.0.0',
                        'REQUEST': 'DescribeFeatureType',
                        'TYPENAME': wmslayer
                    }
                }).then(function(result) {
                    var wfs = new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType();
                    layer._layerInfo = wfs.parseResult(result.data);
                    var parts = wmslayer.split(':');
                    layer._layerInfo.typeName = wmslayer;
                    layer._layerInfo.featurePrefix = parts[0];
                    // get the style name
                    $http({
                        method: 'GET',
                        url: '/gslocal/rest/layers/' + wmslayer + '.json'
                    }).then(function(result) {
                        layer._layerInfo.styleName = result.data.layer.defaultStyle.name;
                        layer.set('id', wmslayer);
                        map.addLayer(layer);
                    });
                });
            };
            $scope.loaddata = function(geojson) {
                $http.get(geojson).success(function(data) {
                    var layer = new ol.layer.Vector({
                        source: new ol.source.GeoJSON({
                            object: data,
                            projection: 'EPSG:3857'
                        })
                    });
                    layer._layerInfo = {
                        geomType: data.features[0].geometry.type.toLowerCase(),
                        attributes: Object.keys(data.features[0].properties)
                    };
                    layer.set('id', geojson);
                    map.addLayer(layer);
                    map.getView().fitExtent(layer.getSource().getExtent(), map.getSize());
                });
            };
        };
        $scope.formChanged = function(form) {
            $scope.styleFormInvalid = form.$invalid;
        };
    });

    module.controller('layerController', function($scope) {
        $scope.layers = [];
        function update() {
            $scope.layers = map.getLayers().getArray().slice(1).map(function(l) {
                return {
                    _layer: l,
                    info: l._layerInfo
                };
            });
        }
        map.getLayers().on('add', function() {
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
