(function() {

    var module = angular.module('storytools.examples.common', [
        'storytools.core.time',
        'storytools.core.mapstory',
        'storytools.edit.style',
        'storytools.edit.boxes',
        'storytools.edit.pins',
        'colorpicker.module',
        'ui.bootstrap'
    ]);

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
            absolutePath: 'http://mapstory.org/geoserver/',
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

    function MapManager($http, $q, $log, $rootScope, $location,
        StoryPinLayerManager, stMapConfigStore, stAnnotationsStore) {
        var self = this;
        var projCfg = {
            units: 'm',
            extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
            global: true,
            worldExtent: [-180, -85, 180, 85]
        };
        projCfg.code = 'EPSG:3857';
        ol.proj.addProjection(new ol.proj.Projection(projCfg));
        projCfg.code = 'EPSG:900913';
        ol.proj.addProjection(new ol.proj.Projection(projCfg));
        this.map = new ol.Map({target: 'map'});
        this.overlay = new ol.FeatureOverlay({
            map: this.map
        });
        this.storyPinLayerManager = new StoryPinLayerManager();
        this.defaultMap = function() {
            this.map.setView(new ol.View({center: [0,0], zoom: 3}));
            this.setBaseLayer({
                title: 'Satellite Imagery',
                type: 'MapQuest',
                layer: 'sat'
            });
        };
        this.animateCenterAndZoom = function(center, zoom) {
            var view = this.map.getView();
            this.map.beforeRender(ol.animation.pan({
                duration: 500,
                source: view.getCenter()
            }));
            view.setCenter(center);
            this.map.beforeRender(ol.animation.zoom({
                resolution: view.getResolution(),
                duration: 500
            }));
            view.setZoom(zoom);
        };
        this.setAllowPan = function(allowPan) {
            this.map.getInteractions().forEach(function(i) {
                if (i instanceof ol.interaction.KeyboardPan ||
                  i instanceof ol.interaction.DragPan) {
                    i.setActive(allowPan);
                }
            });
        };
        this.setAllowZoom = function(allowZoom) {
            var zoomCtrl;
            this.map.getControls().forEach(function(c) {
                if (c instanceof ol.control.Zoom) {
                    zoomCtrl = c;
                }
            });
            if (!allowZoom) {
                this.map.removeControl(zoomCtrl);
            } else {
                this.map.addControl(new ol.control.Zoom());
            }
            this.map.getInteractions().forEach(function(i) {
                if (i instanceof ol.interaction.DoubleClickZoom ||
                  i instanceof ol.interaction.PinchZoom ||
                  i instanceof ol.interaction.DragZoom ||
                  i instanceof ol.interaction.MouseWheelZoom) {
                    i.setActive(allowZoom);
                }
            });
        };
        this.setBaseLayer = function(cfg, baseLayer) {
            this.baseLayer = cfg;
            this.map.getLayers().forEach(function(lyr) {
                if (lyr.get('group') === 'background') {
                    this.map.removeLayer(lyr);
                }
            }, this);
            if (baseLayer === undefined) {
                baseLayer = new storytools.mapstory.MapConfig.MapConfig().createBaseLayer(cfg);
            }
            if (baseLayer !== undefined) {
                baseLayer.set('group', 'background');
                this.map.getLayers().insertAt(0, baseLayer);
            }
        };
        this.loadMap = function(options) {
            options = options || {};
            this.map.getLayers().clear();
            if (options.id) {
                var config = stMapConfigStore.loadConfig(options.id);
                new storytools.mapstory.MapConfig.MapConfig().read(config, self);
                var annotations = stAnnotationsStore.loadAnnotations(options.id);
                this.storyPinLayerManager.pinsChanged(annotations, 'add', true);
            } else if (options.url) {
                var mapLoad = $http.get(options.url).success(function(data) {
                    new storytools.mapstory.MapConfig.MapConfig().read(data, self);
                }).error(function(data, status) {
                    if (status === 401) {
                        window.console.warn('Not authorized to see map ' + mapId);
                        self.defaultMap();
                    }
                });
                var annotationsURL = options.url.replace('/data','/annotations');
                if (annotationsURL.slice(-1) === '/') {
                    annotationsURL = annotationsURL.slice(0, -1);
                }
                var annotationsLoad = $http.get(annotationsURL);
                $q.all([mapLoad, annotationsLoad]).then(function(values) {
                    var geojson = values[1].data;
                    self.storyPinLayerManager.loadFromGeoJSON(geojson, self.map.getView().getProjection());
                });
            } else {
                this.defaultMap();
            }
            this.currentMapOptions = options;
            // @todo how to make on top?
            this.map.addLayer(this.storyPinLayerManager.storyPinsLayer);
        };
        this.saveMap = function() {
            var config = new storytools.mapstory.MapConfig.MapConfig().write(this);
            stMapConfigStore.saveConfig(config);
            stAnnotationsStore.saveAnnotations(this.mapid, this.storyPinLayerManager.storyPins);
        };
        $rootScope.$on('$locationChangeSuccess', function() {
            var path = $location.path();
            if (path === '/new') {
                self.loadMap();
            } else if (path.indexOf('/local') === 0) {
                self.loadMap({id: /\d+/.exec(path)});
            } else {
                self.loadMap({url: path});
            }
        });
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
            return load.call(self, layer, styleName).then(function() {
                self.map.addLayer(layer);
                if (fitExtent === true) {
                    self.map.getView().fitExtent(layer.getExtent(), self.map.getSize());
                }
            });
        };
        this.getFeatures = function(layer, wfsUrl, start) {
            var name = layer.get('layerInfo').typeName, self = this;
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
        };
        this.describeFeatureType = function(layer, url) {
            if (url) {
                for (var i=0, ii=servers.length; i<ii; ++i) {
                    if (servers[i].absolutePath) {
                        if (url.indexOf(servers[i].absolutePath) !== -1) {
                            url = url.replace(servers[i].absolutePath, servers[i].path);
                        }
                    }
                }
            }
            var id = layer.get('id');
            var self = this;
            return $http({
                method: 'GET',
                url: url ? url : layer.get('server').path + 'wfs',
                params: {
                    'SERVICE': 'WFS',
                    'VERSION': '1.0.0',
                    'REQUEST': 'DescribeFeatureType',
                    'TYPENAME': id
                }
            }).success(function(data) {
                var wfs = new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType();
                var layerInfo = wfs.parseResult(data);
                if (layerInfo.timeAttribute === null) {
                    getTimeAttribute(layer);
                }
                var parts = id.split(':');
                layerInfo.typeName = id;
                layerInfo.featurePrefix = parts[0];
                layer.set('layerInfo', angular.extend(layer.get('layerInfo') || {}, layerInfo));
            });
        };
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
                angular.extend(layer.get('layerInfo') || {}, {times: found[name]});
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
                angular.extend(layer.get('layerInfo') || {}, {wfsUrl: url});
                self.getFeatures.call(self, layer, url, start);
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
            if (layer.get('layerInfo').timeAttribute) {
                promise = $q.when('');
            }
            else if (layer.get('server') && layer.get('server').timeEndpoint) {
                var url = layer.get('server').timeEndpoint(layer);
                $http.get(url).success(function(data) {
                    angular.extend(layer.get('layerInfo') || {}, {timeAttribute: data.attribute});
                    if (data.endAttribute) {
                        // @todo verify this with sample from mapstory that has endAttribute
                        angular.extend(layer.get('layerInfo') || {}, {endTimeAttribute: data.endAttribute});
                    }
                });
            } else {
                // @todo make sure we have time attribute _somehow_
                $log.warn('layer does not have timeEndpoint - time playback not enabled!');
                promise = $q.when('');
            }
            return promise;
        }
        function load(layer, styleName) {
            return $q.all(loadCapabilities(layer, styleName), this.describeFeatureType(layer), getStyleName(layer, styleName));
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

    module.service('MapManager', function($injector) {
        return $injector.instantiate(MapManager);
    });

    module.directive('addLayers', function($modal, $log) {
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
                        var msg = 'Something went wrong:';
                        if (problem.status == 404) {
                            msg = 'Cannot find the specified layer:';
                        }
                        msg += problem.data;
                        $modal.open({
                            template: msg
                        });
                        $log.warn(msg);
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
                scope.baseLayers = [{
                    title: 'World Light',
                    type: 'MapBox',
                    name: 'world-light'
                }, {
                    title: 'Geography Class',
                    type: 'MapBox',
                    name: 'geography-class'
                }, {
                    title: 'Natural Earth 2',
                    type: 'MapBox',
                    name: 'natural-earth-2'
                }, {
                    title: 'Natural Earth',
                    type: 'MapBox',
                    name: 'natural-earth-1'
                }, {
                    title: 'Satellite Imagery',
                    type: 'MapQuest',
                    layer: 'sat'
                }, {
                    title: 'Humanitarian OpenStreetMap',
                    type: 'HOT'
                }, {
                    title: 'OpenStreetMap',
                    type: 'OSM'
                }, {
                    title: 'No background',
                    type: 'None'
                }];
                scope.map.map.getLayers().on('change:length', function() {
                    scope.layers = scope.map.getNamedLayers();
                });
                scope.removeLayer = function(lyr) {
                    scope.map.map.removeLayer(lyr);
                };
                scope.onChange = function(baseLayer) {
                    scope.map.setBaseLayer(baseLayer);
                };
            }
        };
    });

    module.service('loadMapDialog', function($modal, $rootScope, stMapConfigStore) {
        function show() {
            var scope = $rootScope.$new(true);
            scope.maps = stMapConfigStore.listMaps();
            scope.choice = {};
            return $modal.open({
                templateUrl: 'templates/load-map-dialog.html',
                scope: scope
            }).result.then(function() {
                return scope.choice;
            });
        }
        return {
            show: show
        };
    });

    module.controller('tileProgressController', function($scope) {
        $scope.tilesToLoad = 0;
        $scope.tilesLoadedProgress = 0;
        $scope.$on('tilesLoaded', function(evt, remaining) {
            $scope.$apply(function () {
                if (remaining <= 0) {
                    $scope.tilesToLoad = 0;
                    $scope.tilesLoaded = 0;
                    $scope.tilesLoadedProgress = 0;
                } else {
                    if (remaining < $scope.tilesToLoad) {
                        $scope.tilesLoaded = $scope.tilesToLoad - remaining;
                        $scope.tilesLoadedProgress = Math.floor(100 * ($scope.tilesLoaded/($scope.tilesToLoad - 1)));
                    } else {
                        $scope.tilesToLoad = remaining;
                    }
                }
            });
        });
    });

})();
