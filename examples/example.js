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

        function loadCapabilities(layer) {
            var url = layer.getSource().getUrls()[0];
            return $http.get(url + '?request=getcapabilities').success(function (response) {
                var parser = new ol.format.WMSCapabilities();
                var caps = parser.read(response);
                var found = timeControls.maps.readCapabilitiesTimeDimensions(caps);
                var name = layer.get('name');
                if (name in found) {
                    var extent = caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox;
                    layer.setExtent(ol.proj.transformExtent(extent, 'EPSG:4326', map.getView().getProjection()));
                    layer._times = found[name];
                }
            });
        }

        function addLayer(name) {
            var workspace = 'geonode';
            var parts = name.split(':');
            if (parts.length > 1) {
                workspace = parts[0];
                name = parts[1];
            }
            var url = '/geoserver/' + workspace + '/' + name + '/wms';
            // @todo use urls for subdomain loading
            var source = new ol.source.TileWMS({
                url: url,
                params: {'LAYERS': name, 'VERSION': '1.1.0', 'TILED': true},
                serverType: 'geoserver'
            });
            var layer = new ol.layer.Tile({source: source, name: name});
            return loadCapabilities(layer).then(function() {
                map.addLayer(layer);
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
            timeControlsService.addLayer($scope.layerName).then(function () {
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
