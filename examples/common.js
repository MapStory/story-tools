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
            name: 'memory',
            canStyleWMS: false
        },
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
    var memoryServer = servers[0];
    var userServerChoices = angular.copy(servers).splice(1);
    function getServer(name) {
        var server = null;
        for (var i = 0; i < servers.length; i++) {
            if (servers[i].name === name) {
                server = servers[i];
                break;
            }
        }
        if (server === null) {
            throw new Error('no server named : ' + name);
        }
        return server;
    }

    var defaultStyle = [new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
        stroke: new ol.style.Stroke({color: 'red', width: 1}),
        image: new ol.style.Circle({
        radius: 10,
            fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        })
    })];

    function MapManager($http, $q, $log) {
        var self = this;
        this.map = new ol.Map({target: 'map'});
        this.defaultMap = function() {
            this.map.setView(new ol.View({center: [0,0], zoom: 3}));
            this.map.addLayer(new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: 'sat'})
            }));
        };
        var mapId = null;
        if (window.location.hash !== "") {
            mapId = window.location.hash.replace('#', '');
        }
        if (mapId !== null) {
            $http.get('/maps/' + mapId + '/data/').success(function(data) {
                new storytools.mapstory.MapConfig.MapConfig().read(data, self);
            }).error(function(data, status) {
                if (status === 401) {
                    window.console.warn('Not authorized to see map ' + mapId);
                    self.defaultMap();
                }
            });
        } else {
            this.defaultMap();
        }
        this.getNamedLayers = function() {
            return this.map.getLayers().getArray().filter(function(lyr) {
                return angular.isString(lyr.get('name'));
            });
        };
        this.addMemoryLayer = function(options) {
            // url to geojson
            if (options.url) {
                $http.get(options.url).success(function(data) {
                    var layer = new ol.layer.Vector({
                        id: options.url,
                        name: options.url,
                        server: memoryServer,
                        source: new ol.source.GeoJSON({
                            object: data,
                            projection: 'EPSG:3857'
                        }),
                        layerInfo: {
                            geomType: data.features[0].geometry.type.toLowerCase(),
                            attributes: Object.keys(data.features[0].properties)
                        }
                    });
                    self.map.addLayer(layer);
                    self.map.getView().fitExtent(layer.getSource().getExtent(), self.map.getSize());
                });
            } else {
                // generated vector layer
                var layer = new ol.layer.Vector({
                    id: options.id,
                    name: options.id,
                    server: memoryServer,
                    source: new ol.source.Vector({
                        features: options.features
                    }),
                    layerInfo: {
                        geomType: options.geomType,
                        attributes: options.attributes
                    }
                });
                this.map.addLayer(layer);
            }
        };
        this.addLayer = function(name, asVector, server, fitExtent, styleName, title) {
            if (fitExtent === undefined) {
                fitExtent = true;
            }
            if (angular.isString(server)) {
                server = getServer(server);
            }
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
                title: title || name,
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
            return load(layer, styleName).then(function() {
                self.map.addLayer(layer);
                if (fitExtent === true) {
                    self.map.getView().fitExtent(layer.getExtent(), self.map.getSize());
                }
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
                angular.extend(layer.get('layerInfo'), layerInfo);
            });
        }
        function getStyleName(layer, styleName) {
            var promise;
            if (layer.get('server').canStyleWMS && styleName === undefined) {
                // get the style name if editable and not already known
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
        function parseCapabilities(layer, response, styleName) {
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
                layer.set('times', found[name]);
                start = found[name].start || found[name][0];
            }
            if (layer instanceof ol.layer.Tile) {
                var params = {
                    'LAYERS': name,
                    'STYLES': styleName,
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
                var wfsUrl = url;
                wfsUrl += '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                    name + '&outputFormat=application/json' +
                    '&srsName=' + self.map.getView().getProjection().getCode();
                $http.get(wfsUrl).success(function(response) {
                    var features = new ol.format.GeoJSON().readFeatures(response);
                    layer.setSource(new ol.source.Vector());
                    if (start) {
                        layer.set('features', features);
                        storytools.core.time.maps.filterVectorLayer(layer, {start: start, end: start});
                    } else {
                        layer.getSource().addFeatures(features);
                    }
                });
            }
        }
        function loadCapabilities(layer, styleName) {
            var getcaps = layer.get('url') + '?request=GetCapabilities';
            return $http.get(getcaps).success(function(response) {
                parseCapabilities(layer, response, styleName);
            });
        }
        function getTimeAttribute(layer) {
            var promise;
            if (layer.get('server').timeEndpoint) {
                var url = layer.get('server').timeEndpoint(layer);
                $http.get(url).success(function(data) {
                    layer.set('timeAttribute', data.attribute);
                });
            } else {
                // @todo make sure we have time attribute _somehow_
                $log.warn('layer does not have timeEndpoint - time playback not enabled!');
                promise = $q.when('');
            }
            return promise;
        }
        function load(layer, styleName) {
            return $q.all(loadCapabilities(layer, styleName), describeFeatureType(layer), getStyleName(layer, styleName), getTimeAttribute(layer));
        }
    }

    module.service('styleUpdater', function($http, ol3StyleConverter) {
        return {
            updateStyle: function(layer) {
                var isComplete = new storytools.edit.StyleComplete.StyleComplete().isComplete(layer.style);
                if (isComplete && layer instanceof ol.layer.Vector) {
                    layer.setStyle(function(feature, resolution) {
                        return ol3StyleConverter.generateStyle(layer.style, feature, resolution);
                    });
                } else {
                    var layerInfo = layer.get('layerInfo');
                    // this case will happen if canStyleWMS is false for the server
                    if (layerInfo.styleName) {
                        if (isComplete) {
                            var sld = new storytools.edit.SLDStyleConverter.SLDStyleConverter();
                            var xml = sld.generateStyle(layer.style, layer.getSource().getParams().LAYERS, true);
                            $http({
                                url: '/gslocal/rest/styles/' + layerInfo.styleName + '.xml',
                                method: "PUT",
                                data: xml,
                                headers: {'Content-Type': 'application/vnd.ogc.sld+xml; charset=UTF-8'}
                            }).then(function(result) {
                                layer.getSource().updateParams({"_olSalt": Math.random()});
                            });
                        }
                    }
                }
            }
        };
    });

    module.service('mapFactory', function($http, $q, $log) {
        return {
            create: function() {
                return new MapManager($http, $q, $log);
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
                    active: userServerChoices[0]
                };
                scope.servers = userServerChoices;
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
