'use strict';

(function () {

    var module = angular.module('timeControls', []);
    var map;
    var testing = false;

    var playbackOptions = {
        mode: 'instant',
        fixed: false
    };

    function isoDate(v) {
        return new Date(v).toISOString();
    }

    module.run(function (timeControlsService) {
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
        testing = window.location.search.indexOf('_test') >= 0;
        if (testing) {
            var times = [];
            var annotations = [];

            $("#panel").removeClass("hide");
            var date = new Date();
            var amt = 10;
            for (var i = 0; i < amt; i++) {
                date.setDate(date.getDate() + 1);
                times.push(new Date(date).getTime());
            }
            annotations = times.map(function (t, i) {
                return {
                    start_time: t,
                    end_time: t,
                    content: i,
                    title: isoDate(t),
                    in_timeline: true
                };
            });
            timeControlsService.createControls(times);
//            timeControlsService.getTimeControls().on('rangeChange', function() {
//                // have to use jq.deferred to play nice
//                var deferred = $.Deferred();
//                window.setTimeout(function() {
//                    deferred.resolve();
//                }, 5000);
//                timeControlsService.getTimeControls().defer(deferred);
//            });
        }
    });

    module.factory('timeControlsService', function ($http, $rootScope) {
        var _timeControls = null;

        function loadCapabilities(layer, url) {
            return $http.get(url + '?request=GetCapabilities').success(function (response) {
                var parser = new ol.format.WMSCapabilities();
                var caps = parser.read(response);
                var found = timeControls.maps.readCapabilitiesTimeDimensions(caps);
                var name = layer.get('name');
                if (name in found) {
                    layer._times = found[name];
                    var extent = ol.proj.transformExtent(
                        caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox,
                        'EPSG:4326',
                        map.getView().getProjection()
                    );
                    layer.setExtent(extent);
                    // @todo use urls for subdomain loading
                    if (layer instanceof ol.layer.Tile) {
                        layer.setSource(new ol.source.TileWMS({
                            url: url,
                            params: {
                                'TIME': isoDate(layer._times.start || layer._times[0]),
                                'LAYERS': name,
                                'VERSION': '1.1.0',
                                'TILED': true
                            },
                            serverType: 'geoserver'
                        }));
                    } else if (layer instanceof ol.layer.Vector) {
                        layer.setStyle(function(feature, resolution) {
                            var startDate = layer._times.start || layer._times[0];
                            if (Date.parse(feature.get('Built')) === startDate) {
                                var style = new ol.style.Style({
                                    image: new ol.style.Circle({
                                        radius: 10,
                                        fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                                        stroke: new ol.style.Stroke({color: 'red', width: 1})
                                    })
                                });
                                return [style];
                            }
                        });
                        layer.setSource(new ol.source.ServerVector({
                            format: new ol.format.GeoJSON(),
                            loader: function(bbox, resolution, projection) {
                                // TODO https://github.com/openlayers/ol3/issues/2972
                                if (ol.extent.intersects(extent, bbox)) {
                                    var wfsUrl = url;
                                    wfsUrl += '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                                        name + '&outputFormat=application/json&' +
                                        '&srsName=' + projection.getCode() + '&bbox=' + bbox.join(',') + ',' + projection.getCode();
                                    $.ajax({
                                        url: wfsUrl
                                    }).done(function(response) {
                                        layer.getSource().addFeatures(layer.getSource().readFeatures(response));
                                    });
                                }
                            },
                            strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
                                maxZoom: 19
                            })),
                            projection: map.getView().getProjection()
                        }));
                    }
                }
            });
        }

        function addLayer(name, asVector) {
            var workspace = 'geonode';
            var parts = name.split(':');
            if (parts.length > 1) {
                workspace = parts[0];
                name = parts[1];
            }
            var url = '/geoserver/' + workspace + '/' + name + '/wms';
            var layer;
            if (asVector === true) {
                layer = new ol.layer.Vector({name: name});
            } else {
                layer = new ol.layer.Tile({name: name});
            }
            return loadCapabilities(layer, url).then(function() {
                map.addLayer(layer);
                map.getView().fitExtent(layer.getExtent(), map.getSize());
            });
        }

        function createControls(data) {
            _timeControls = timeControls.create({
                annotations: [],
                map: map,
                data: data || map.getLayers().item(1)._times,
                playback: playbackOptions,
                tileStatusCallback: function(remaining) {
                    $rootScope.$broadcast('tilesLoaded', remaining);
                }
            });
            return _timeControls;
        }

        var service = {
            addLayer: addLayer,
            createControls: createControls,
            getTimeControls: function () {
                return _timeControls;
            }
        };
        return service;
    });

    module.controller('timeControlsController', function ($scope, timeControlsService) {
        $scope.timeControlsService = timeControlsService;
        $scope.layerName = '';
        $scope.timeControls = timeControlsService.getTimeControls();
        $scope.$on('tilesLoaded', function(evt, remaining) {
            $scope.$apply(function () {
                $scope.tilesRemaining = remaining;
            });
        });
        $scope.addLayer = function () {
            $scope.loading = true;
            timeControlsService.addLayer($scope.layerName, $scope.asVector).then(function () {
                if ($scope.timeControls === null) {
                    $scope.timeControls = timeControlsService.createControls();
                }
            }, function(problem) {
                alert(problem.data);
            }).finally(function() {
                $scope.loading = false;
            });
            $scope.layerName = null;
        };
    });

    module.directive("playbackSettings", function () {
        return {
            restrict: "A",
            templateUrl: "playback-settings-template",
            link: function (scope, elem) {
                scope.playbackOptions = playbackOptions;
                scope.options = function () {
                    scope.timeControls.update(playbackOptions);
                };
            }
        };
    });

    module.directive("playbackControls", function () {
        return {
            restrict: "A",
            templateUrl: "time-controls-template",
            link: function (scope, elem) {
                scope.playText = "Start";
                scope.loopText = "Enable Loop";
                scope.loop = false;
                scope.next = function () {
                    scope.timeControls.next();
                };
                scope.prev = function () {
                    scope.timeControls.prev();
                };
                scope.$watch('timeControls', function (neu, old) {
                    if (neu !== old) {
                        neu.on('stateChange', function () {
                            var started = scope.timeControls.isStarted();
                            scope.started = started;
                            scope.playText = started ? "Stop" : "Start";
                            scope.$apply();
                        });
                        neu.on('rangeChange', function (range) {
                            scope.currentRange = range;
                            scope.$apply();
                        });
                    }
                });
                scope.play = function () {
                    var tc = scope.timeControls;
                    var started = tc.isStarted();
                    if (started) {
                        tc.stop();
                    } else {
                        tc.start();
                    }
                };
                scope.toggleLoop = function () {
                    var tc = scope.timeControls;
                    scope.loop = tc.loop = !tc.loop;
                    scope.loopText = tc.loop ? 'Disable Loop' : 'Enable Loop';
                };
            }
        };
    });


})();
