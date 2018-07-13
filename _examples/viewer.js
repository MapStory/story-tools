'use strict';

(function() {

    var module = angular.module('viewer', [
        'storytools.core.time',
        'storytools.core.mapstory',
        'storytools.core.pins',
        'storytools.core.boxes',
        'storytools.core.ogc',
        'storytools.core.legend',
        'ui.bootstrap'
    ]);

    var rootScope_;

    module.constant('iconCommonsHost', 'http://mapstory.dev.boundlessgeo.com');

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

    var rootscope_;
    function MapManager($http, $q, $log, $rootScope, $location,
      StoryMap, stStoryMapBuilder, stStoryMapBaseBuilder, StoryPinLayerManager, StoryBoxLayerManager) {
        rootScope_ = $rootScope;
        this.storyMap = new StoryMap({target: 'map', returnToExtent: false});
        var self = this;
        rootscope_ = $rootScope;
        StoryPinLayerManager.map = self.storyMap;
        StoryBoxLayerManager.map = self.storyMap;
        console.log('----> CONFIG', config);
        this.loadConfig = function(config, chapter){
            if(config.chapters){
                self.chapterCount = config.chapters.length;
                if(chapter > 0 && chapter <= config.chapters.length) {
                    self.storyChapter = chapter;
                    $log.info("Loading Chapter " + chapter + " of " + config.chapters.length);
                    self.loadMap(config.chapters[chapter - 1]);
                }else{
                    $log.warn("Chapter " + chapter + " is INVALID so defaulting to Chapter 1. ");
                    self.loadMap(config.chapters[0]);
                }
            }else{
                $log.info("Story config has no chapters so just loading the defaults.");
                self.loadMap(config);
            }

            self.title = config.about.title;
            self.username = config.about.username;
            self.owner = config.about.owner;
        };
        this.loadMap = function(options) {
            options = options || {};
            if (options.id) {

                var annotationsURL = "/maps/" + options.id + "/annotations";
                if (annotationsURL.slice(-1) === '/') {
                    annotationsURL = annotationsURL.slice(0, -1);
                }

                var boxesURL = "/maps/" + options.id + "/boxes";
                if (boxesURL.slice(-1) === '/') {
                    boxesURL = boxesURL.slice(0, -1);
                }

                // var annotationsLoad = $http.get(annotationsURL);
                // var boxesLoad = $http.get(boxesURL);
                // $q.all([]).then(function(values) {
                //     var pins_geojson = values[0].data;
                //     StoryPinLayerManager.loadFromGeoJSON(pins_geojson, self.storyMap.getMap().getView().getProjection(), true);
                //     var boxes_geojson = values[1].data;
                //     StoryBoxLayerManager.loadFromGeoJSON(boxes_geojson, self.storyMap.getMap().getView().getProjection(), true);
                // });
            } else if (options.url) {
                var mapLoad = $http.get(options.url).success(function(data) {
                    stStoryMapBuilder.modifyStoryMap(self.storyMap, data);
                }).error(function(data, status) {
                    if (status === 401) {
                        window.console.warn('Not authorized to see map ' + mapId);
                        stStoryMapBaseBuilder.defaultMap(self.storyMap);
                    }
                });

                var annotationsURL = options.url.replace('/data','/annotations');
                if (annotationsURL.slice(-1) === '/') {
                    annotationsURL = annotationsURL.slice(0, -1);
                }

                var boxesURL = options.url.replace('/data','/boxes');
                if (boxesURL.slice(-1) === '/') {
                    boxesURL = boxesURL.slice(0, -1);
                }

                // var annotationsLoad = $http.get(annotationsURL);
                // var boxesLoad = $http.get(boxesURL);
                $q.all([mapLoad]).then(function(values) {
                    var pins_geojson = values[1].data;
                    StoryPinLayerManager.loadFromGeoJSON(pins_geojson, self.storyMap.getMap().getView().getProjection());
                    var boxes_geojson = values[2].data;
                    StoryBoxLayerManager.loadFromGeoJSON(boxes_geojson, self.storyMap.getMap().getView().getProjection());
                });

            } else {
                stStoryMapBaseBuilder.defaultMap(this.storyMap);
            }
            this.currentMapOptions = options;
            // @todo how to make on top?
        };
        $rootScope.$on('$locationChangeSuccess', function() {
          var path = $location.path(), chapter = 1, matches;
          if (path.indexOf('/chapter') === 0){
              if ((matches = /\d+/.exec(path)) !== null) {
                  chapter = matches[0]
              }
          }
          self.loadConfig(config, chapter);
      });
    }

    module.service('MapManager', function ($injector) {
        return $injector.instantiate(MapManager);
    });

    module.controller('tileProgressController', function ($scope) {
        $scope.tilesToLoad = 0;
        $scope.tilesLoadedProgress = 0;
        $scope.$on('tilesLoaded', function (evt, remaining) {
            $scope.$apply(function () {
                if (remaining <= 0) {
                    $scope.tilesToLoad = 0;
                    $scope.tilesLoaded = 0;
                    $scope.tilesLoadedProgress = 0;
                } else {
                    if (remaining < $scope.tilesToLoad) {
                        $scope.tilesLoaded = $scope.tilesToLoad - remaining;
                        $scope.tilesLoadedProgress = Math.floor(100 * ($scope.tilesLoaded / ($scope.tilesToLoad - 1)));
                    } else {
                        $scope.tilesToLoad = remaining;
                    }
                }
            });
        });
    });

    module.controller('viewerController', function($scope, $injector, MapManager, TimeControlsManager) {
        $scope.timeControlsManager = $injector.instantiate(TimeControlsManager);
        $scope.mapManager = MapManager;
        $scope.toggleVisibleLayer = function(lyr) {
            MapManager.storyMap.toggleStoryLayer(lyr);

        };

        rootScope_.$on('layer-status', function(event, args){
            $log.debug("Layer Status: ", args.name, args.phase, args.status);
            if(args.phase === 'features') {
                if(args.status === 'loading'){
                     $scope.loading[args.name] = true;
                }else{
                    $timeout(function(){
                         $scope.loading[args.name] = false;
                    }, 2000);

                    //Materialize.toast('Feature Updated on ' + args.name, 4000)
                }
            }
        });

        $scope.zoomToExtent = function(feature) {
            var lon = feature.get('GPS_LON') || feature.get('LON');
            var lat = feature.get('GPS_LAT') || feature.get('LAT');

            if(lat && lon) {
                var location = new ol.geom.Point(ol.proj.transform([lon, lat],
                    'EPSG:4326', 'EPSG:3857'));

                var extent = location.getExtent();

                var center = ol.extent.getCenter(extent);

                MapManager.storyMap.animateCenterAndZoom(center, 10);

                $timeout( function() {
                    var pixel = MapManager.storyMap.getMap().getPixelFromCoordinate(location.getCoordinates());
                    MapManager.displayFeatureInfo(pixel, false);
                }, 1000);
            }
        };

        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };
    });
})();
