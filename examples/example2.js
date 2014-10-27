'use strict';

(function () {

    var module = angular.module('timeControls', []);
    var map;
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
        if (window.location.search.indexOf('_test') >= 0) {
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
        }
    });

    module.factory('timeControlsService', function ($http) {
        var _timeControls = null;

        function loadCapabilities(layer) {
            var parser = new ol.format.WMSCapabilities();
            var url = layer.getSource().getUrls()[0];
            return $http.get(url + '?request=getcapabilities').success(function (response) {
                var caps = parser.read(response);
                var times = caps.Capability.Layer.Layer[0].Dimension[0].values.split(',');
                times = times.map(function (t) {
                    return Date.parse(t);
                });
                layer._times = times;
//            updateControls(times);
            });
        }

        function addLayer(name) {
            var url = '/geoserver/geonode/' + name + '/wms';
            var layer = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: url,
                    params: {'LAYERS': name, 'VERSION': '1.1.0', 'TILED': true},
                    serverType: 'geoserver'
                })
            });
            map.addLayer(layer);
            return loadCapabilities(layer);
        }

        function createControls(data) {
            _timeControls = timeControls.create({
                annotations: [],
                map: null,
                data: data || map.getLayers().item(1)._times,
                playback: playbackOptions
            });
            _timeControls.on("rangeChange", updateLayers);
            return _timeControls;
        }

        function updateLayers(range) {
            map.getLayers().item(1).getSource().updateParams({TIME: isoDate(range.start) + "/" + isoDate(range.end)});
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
        $scope.timeControls = null;
        $scope.addLayer = function () {
            $scope.loading = true;
            timeControlsService.addLayer($scope.layerName).then(function () {
                $scope.loading = false;
                if ($scope.timeControls === null) {
                    $scope.timeControls = timeControlsService.createControls();
                }
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