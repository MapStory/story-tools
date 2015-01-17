(function() {

    var module = angular.module('storytools.examples.common', []);

    module.run(function() {
        // install a watchers debug loop
        (function() {
            var root = angular.element(document.getElementsByTagName('body'));
            var last;
            var watchers = 0;

            var f = function(element) {
                if (element.data().hasOwnProperty('$scope')) {
                    watchers += (element.data().$scope.$$watchers || []).length;
                }

                angular.forEach(element.children(), function(childElement) {
                    f(angular.element(childElement));
                });
            };

            window.setInterval(function() {
                watchers = 0;
                f(root);
                if (watchers != last) {
                    console.log(watchers);
                }
                last = watchers;
            }, 1000);

        })();
    });

    function isoDate(v) {
        return new Date(v).toISOString();
    }

    var servers = [
        {
            name: 'mapstory',
            path: '/geoserver/',
            canStyleWMS: false,
            timeEndpoint: function(layer) {
                return '/maps/time_info.json?layer=' + layer.get('name');
            }
        },
        {
            name: 'local',
            path: '/gslocal/',
            canStyleWMS: true
        }
    ];

    var defaultStyle = [new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
            stroke: new ol.style.Stroke({color: 'red', width: 1}),
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                stroke: new ol.style.Stroke({color: 'red', width: 1})
            })
        })];

    function Map($http, $q, $log) {
        var self = this;
        this.map = new ol.Map({
            layers: [new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'sat'})
                })],
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 3
            })
        });
        this.getNamedLayers = function() {
            return this.map.getLayers().getArray().filter(function(lyr) {
                return angular.isString(lyr.get('name'));
            });
        };
        this.addLayer = function(name, asVector, server) {
            var workspace = 'geonode';
            var parts = name.split(':');
            if (parts.length > 1) {
                workspace = parts[0];
                name = parts[1];
            }
            var url = server.path + workspace + '/' + name + '/wms';
            var id = workspace + ":" + name;
            var layer;
            var options = {
                id: id,
                name: name,
                server: server,
                url: url,
                layerInfo: {}
            };
            if (asVector === true) {
                options.style = defaultStyle;
                layer = new ol.layer.Vector(options);
            } else {
                layer = new ol.layer.Tile(options);
            }
            return load(layer).then(function() {
                self.map.addLayer(layer);
                self.map.getView().fitExtent(layer.getExtent(), self.map.getSize());
            });
        };
        function describeFeatureType(layer) {
            var id = layer.get('id');
            return $http({
                method: 'GET',
                url: layer.get('server').path + 'wfs',
                params: {
                    'SERVICE': 'WFS',
                    'VERSION': '1.0.0',
                    'REQUEST': 'DescribeFeatureType',
                    'TYPENAME': id
                }
            }).success(function(data) {
                var wfs = new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType();
                var layerInfo = wfs.parseResult(data);
                var parts = id.split(':');
                layerInfo.typeName = id;
                layerInfo.featurePrefix = parts[0];
                layer.get('layerInfo', angular.extend(layer.get('layerInfo'), layerInfo));
            });
        }
        function getStyleName(layer) {
            var promise;
            if (layer.get('server').canStyleWMS) {
                // get the style name if editable
                promise = $http({
                    method: 'GET',
                    url: layer.get('server').path + 'rest/layers/' + layer.get('id') + '.json'
                }).success(function(response) {
                    layer.get('layerInfo').styleName = response.layer.defaultStyle.name;
                });
            } else {
                promise = $q.when('');
            }
            return promise;
        }
        function parseCapabilities(layer, response) {
            var parser = new ol.format.WMSCapabilities();
            var caps = parser.read(response);
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
            var name = layer.get('name');
            var url = layer.get('url');
            var start;
            var extent = ol.proj.transformExtent(
                caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox,
                'EPSG:4326',
                self.map.getView().getProjection()
                );
            layer.setExtent(extent);
            if (name in found) {
                layer._times = found[name];
                start = layer._times.start || layer._times[0];
            }
            if (layer instanceof ol.layer.Tile) {
                var params = {
                    'LAYERS': name,
                    'VERSION': '1.1.0',
                    'TILED': true
                };
                if (start) {
                    params.TIME = isoDate(start);
                }
                // @todo use urls for subdomain loading
                layer.setSource(new ol.source.TileWMS({
                    url: url,
                    params: params,
                    serverType: 'geoserver'
                }));
            } else if (layer instanceof ol.layer.Vector) {
                layer.setSource(new ol.source.ServerVector({
                    format: new ol.format.GeoJSON(),
                    loader: function(bbox, resolution, projection) {
                        if (layer._features) {
                            return;
                        }
                        var wfsUrl = url;
                        wfsUrl += '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                            name + '&outputFormat=application/json' +
                            '&srsName=' + projection.getCode();
                        $http.get(wfsUrl).success(function(response) {
                            var features = layer.getSource().readFeatures(response);
                            if (start) {
                                layer._features = features;
                                storytools.core.time.maps.filterVectorLayer(layer, {start: start, end: start});
                            } else {
                                layer.getSource().addFeatures(features);
                            }
                        });
                    },
                    strategy: ol.loadingstrategy.all,
                    projection: self.map.getView().getProjection()
                }));
            }
        }
        function loadCapabilities(layer) {
            var getcaps = layer.get('url') + '?request=GetCapabilities';
            return $http.get(getcaps).success(function(response) {
                parseCapabilities(layer, response);
            });
        }
        function getTimeAttribute(layer) {
            var promise;
            if (layer.get('server').timeEndpoint) {
                var url = layer.get('server').timeEndpoint(layer);
                $http.get(url).success(function(data) {
                    layer._timeAttribute = data.attribute;
                });
            } else {
                // @todo make sure we have time attribute _somehow_
                $log.warn('layer does not have timeEndpoint - time playback not enabled!');
                promise = $q.when('');
            }
            return promise;
        }
        function load(layer) {
            return $q.all(loadCapabilities(layer), describeFeatureType(layer), getStyleName(layer), getTimeAttribute(layer));
        }
    }

    module.service('mapFactory', function($http, $q, $log) {
        return {
            create: function() {
                return new Map($http, $q, $log);
            }
        };
    });

    module.directive('addLayers', function() {
        return {
            restrict: 'E',
            scope: {
                map: "="
            },
            templateUrl: 'templates/add-layers.html',
            link: function(scope, el, atts) {
                scope.server = {
                    active: servers[0]
                };
                scope.servers = servers;
                scope.addLayer = function() {
                    scope.loading = true;
                    scope.map.addLayer(this.layerName, this.asVector, scope.server.active).then(function() {
                        // pass
                    }, function(problem) {
                        alert(problem.data);
                    }).finally(function() {
                        scope.loading = false;
                    });
                    scope.layerName = null;
                };
            }
        };
    });

    module.directive('layerList', function() {
        return {
            restrict: 'E',
            scope: {
                map: "="
            },
            templateUrl: 'templates/layer-list.html',
            link: function(scope, el, atts) {
                scope.map.map.getLayers().on('change:length', function() {
                    scope.layers = scope.map.getNamedLayers();
                });
            }
        };
    });

})();
