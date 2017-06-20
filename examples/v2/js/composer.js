'use strict';

(function() {

    var module = angular.module('composer', [
        'storytools.core.time',
        'storytools.core.mapstory',
        'storytools.core.loading',
        'storytools.core.legend',
        'storytools.edit.style',
        'storytools.edit.boxes',
        'storytools.edit.pins',
        'storytools.core.ogc',
        'colorpicker.module',
        'ui.bootstrap',
        'angular-sortable-view'
    ]);

    module.constant('iconCommonsHost', 'http://mapstory.dev.boundlessgeo.com');

/*
    angular.module('myApp', ['ui.bootstrap']).run(
  ['$templateCache', function($templateCache){
    $templateCache.put('template/datepicker/datepicker.html', undefined);
  }
]);
*/
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
                    //console.log(watchers);
                }
                last = watchers;
            }, 1000);

        })();
    });

    var servers = [
        {
            name: 'mapstory',
            path: '/geoserver/',
            absolutePath: 'https://demo.mapstory.org/geoserver/',
            host: 'https://demo.mapstory.org/',
            canStyleWMS: false,
            timeEndpoint: function(name) {
                return '/maps/time_info.json?layer=' + name;
            }
        },
        {
            name: 'storyscapes',
            path: '/gsstoryscapes/',
            canStyleWMS: true,
            host: 'http://storyscapes.geointservices.io/'
        },
        {
            name: 'local',
            path: '/gslocal/',
            canStyleWMS: true
        }
    ];

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

    function MapManager($http, $q, $log, $rootScope, $location, $compile,
                        StoryPinLayerManager, stStoryMapBuilder, stLocalStorageSvc, stAnnotationsStore, stEditableLayerBuilder, EditableStoryMap, stStoryMapBaseBuilder, stEditableStoryMapBuilder) {
        this.storyMap = new EditableStoryMap({target: 'map'});
        window.storyMap = this.storyMap;
        StoryPinLayerManager.map = this.storyMap;
        //StoryBoxLayerManager.map = this.storyMap;
        this._config = {};
        this.title = "";
        this.owner = "";
        this.storyChapter = 1;
        this.chapterCount = 1;
        var self = this;
        StoryPinLayerManager.storyPinsLayer = this.storyMap.storyPinsLayer;
        this.loadConfig = function(config, chapter){
            self._config = config;
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
                stStoryMapBuilder.modifyStoryMap(self.storyMap, options);

                var annotationsLoad = $http.get("/maps/" + options.id + "/annotations");
                var boxesLoad = $http.get("/maps/" + options.id + "/boxes");
                $q.all([annotationsLoad, boxesLoad]).then(function(values) {
                    StoryPinLayerManager.loadFromGeoJSON(values[0].data, self.storyMap.getMap().getView().getProjection(), true);
                   // StoryBoxLayerManager.loadFromGeoJSON(values[1].data, self.storyMap.getMap().getView().getProjection(), true);
                });
                //var config = stLocalStorageSvc.loadConfig(options.id);
                //stEditableStoryMapBuilder.modifyStoryMap(self.storyMap, config);
                //var annotations = stAnnotationsStore.loadAnnotations(options.id, this.storyMap.getMap().getView().getProjection());
                //if (annotations) {
                //    StoryPinLayerManager.pinsChanged(annotations, 'add', true);
               // }
            } else if (options.url) {
                var mapLoad = $http.get(options.url).then(function(response) {
                    stEditableStoryMapBuilder.modifyStoryMap(self.storyMap, response.data);
                }).catch(function(data, status) {
                    if (status === 401) {
                        window.console.warn('Not authorized to see map ' + mapId);
                        stStoryMapBaseBuilder.defaultMap(self.storyMap);
                    }
                });
                var annotationsURL = options.url.replace('/data','/annotations');
                if (annotationsURL.slice(-1) === '/') {
                    annotationsURL = annotationsURL.slice(0, -1);
                }
                var annotationsLoad = $http.get(annotationsURL);
                $q.all([mapLoad, annotationsLoad]).then(function(values) {
                    var geojson = values[1].data;
                    StoryPinLayerManager.loadFromGeoJSON(geojson, self.storyMap.getMap().getView().getProjection());
                });
            } else {
                stStoryMapBaseBuilder.defaultMap(this.storyMap);
            }
            this.currentMapOptions = options;
  };

        this.saveMap = function() {
            var config = this.storyMap.getState();
            stLocalStorageSvc.saveConfig(config);
            if (this.storyMap.get('id') === undefined) {
                this.storyMap.set('id', config.id);
            }
            stAnnotationsStore.saveAnnotations(this.storyMap.get('id'), StoryPinLayerManager.storyPins);
        };
        $rootScope.$on('$locationChangeSuccess', function() {
            var path = $location.path(), chapter = 1, matches;
            var mapID = /\/maps\/(\d+)/.exec(path) ? /\/maps\/(\d+)/.exec(path)[1] : null;
            var mapJsonUrl = '/maps/' + mapID + '/data';

            if (path.indexOf('/chapter') === 0){
                if ((matches = /\d+/.exec(path)) !== null) {
                    chapter = matches[0]
                }
            }

            if (mapID) {
              $.ajax({
                dataType: "json",
                url: mapJsonUrl ,
                }).done(function ( data ) {
                  self.loadConfig(data, chapter);
              });
            } else {
              self.loadConfig(config, chapter);
            }

            /* var path = $location.path();
             if (path === '/new') {
             self.loadMap();
             } else if (path.indexOf('/local') === 0) {
             self.loadMap({id: /\d+/.exec(path)});
             } else {
             self.loadMap({url: path});
             }*/
        });

        this.addLayer = function(name, settings, server, fitExtent, styleName, title) {
            self.storyMap.setAllowZoom(settings.allowZoom);
            self.storyMap.setAllowPan(settings.allowPan);
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
            var options = {
                id: id,
                name: name,
                title: title || name,
                url: url,
                path: server.path,
                canStyleWMS: server.canStyleWMS,
                timeEndpoint: server.timeEndpoint ? server.timeEndpoint(name): undefined,
                type: (settings.asVector === true) ? 'VECTOR': 'WMS'
            };
            return stEditableLayerBuilder.buildEditableLayer(options, self.storyMap.getMap()).then(function(a) {
                self.storyMap.addStoryLayer(a);
                if (fitExtent === true) {
                    a.get('latlonBBOX');
                    var extent = ol.proj.transformExtent(
                          a.get('latlonBBOX'),
                          'EPSG:4326',
                          self.storyMap.getMap().getView().getProjection()
                    );
                    // prevent getting off the earth
                    extent[1] = Math.max(-20037508.34, Math.min(extent[1], 20037508.34));
                    extent[3] = Math.max(-20037508.34, Math.min(extent[3], 20037508.34));
                    self.storyMap.getMap().getView().fitExtent(extent, self.storyMap.getMap().getSize());
                }
            });
        };
    }

    module.service('styleUpdater', function($http, ol3StyleConverter, stEditableStoryMapBuilder) {
        return {
            updateStyle: function(storyLayer) {
                var style = storyLayer.get('style'), layer = storyLayer.getLayer();
                var isComplete = new storytools.edit.StyleComplete.StyleComplete().isComplete(style);
                if (style.typeName === 'heatmap') {
                    stEditableStoryMapBuilder.modifyStoryLayer(storyLayer, 'HEATMAP');
                    return;
                } else if (style.typeName !== 'heatmap' && layer instanceof ol.layer.Heatmap) {
                    stEditableStoryMapBuilder.modifyStoryLayer(storyLayer, 'VECTOR');
                }
                if (isComplete && layer instanceof ol.layer.Vector) {
                    layer.setStyle(function(feature, resolution) {
                        return ol3StyleConverter.generateStyle(style, feature, resolution);
                    });
                } else {
                    // this case will happen if canStyleWMS is false for the server
                    if (storyLayer.get('styleName')) {
                        if (isComplete) {
                            var sld = new storytools.edit.SLDStyleConverter.SLDStyleConverter();
                            var xml = sld.generateStyle(style, layer.getSource().getParams().LAYERS, true);
                            $http({
                                url: '/gslocal/rest/styles/' + storyLayer.get('styleName') + '.xml',
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

    module.config(['$qProvider', function($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }]);

    module.service('MapManager', function($injector) {
        return $injector.instantiate(MapManager);
    });


    module.directive('addLayers', function($log, $http, $sce, limitToFilter,  MapManager) {
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
                scope.results = function(layer_name) {
                    var url = scope.server.active.host + "api/base/search/?type__in=layer&q=" + layer_name;
                    return $http.get(url).then(function(response){
                        var names = [];
                        for (var i = 0; i < response.data.objects.length; i++) {
                            if (response.data.objects[i].title) {
                                names.push(response.data.objects[i].typename);
                            }
                        }
                        return limitToFilter(names, 15);
                    });
                };
                scope.addLayer = function() {
                    scope.loading = true;
                    var settings = {'asVector': this.asVector, 'allowZoom': this.allowZoom, 'allowPan': this.allowPan};
                    MapManager.addLayer(this.layerName, settings, scope.server.active).then(function() {
                        // pass
                        scope.$parent.status.open = false;

                    }, function(problems) {
                        var msg = 'Something went wrong:';
                        if (problems[0].status == 404) {
                            msg = 'Cannot find the specified layer: ';
                        }else {
                            msg += problems[0].data;
                        }
                       /* $modal.open({
                            templateUrl: '/lib/templates/core/error-dialog.html',
                            controller: function($scope) {
                                $scope.title = 'Error';
                                $scope.msg = $sce.trustAsHtml(
                                      'An error occurred while communicating with the server. ' +
                                      '<br/>' + msg);
                            }
                        });*/
                        $log.warn('Failed to load %s because of %s',scope.layerName, problems);
                    }).finally(function() {
                        scope.loading = false;
                    });
                    scope.layerName = null;
                };
            }
        };
    });
    module.directive('layerList', function(stStoryMapBaseBuilder, stEditableStoryMapBuilder, MapManager) {
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
                    title: 'Humanitarian OpenStreetMap',
                    type: 'HOT',
                    name: 'hot'
                }, {
                    title: 'OpenStreetMap',
                    type: 'OSM',
                    name: 'osm'
                }, {
                    title: 'World Topo Map',
                    type: 'ESRI',
                    name: 'world-topo-map'
                }, {
                    title: 'No background',
                    type: 'None'
                }];
                var baseLayer = MapManager.storyMap.get('baselayer');
                if (baseLayer) {
                    scope.baseLayer = baseLayer.get('title');
                }
                MapManager.storyMap.on('change:baselayer', function() {
                    scope.baseLayer = MapManager.storyMap.get('baselayer').get('title');
                });
                scope.layers = MapManager.storyMap.getStoryLayers().getArray();
                MapManager.storyMap.getStoryLayers().on('change:length', function() {
                    scope.layers = MapManager.storyMap.getStoryLayers().getArray();
                });
                scope.toggleVisibleLayer = function(lyr) {
                    MapManager.storyMap.toggleStoryLayer(lyr);
                };

                scope.removeLayer = function(lyr) {
                    MapManager.storyMap.removeStoryLayer(lyr);
                };
                scope.modifyLayer = function(lyr) {
                    scope.swapping = true;
                    stEditableStoryMapBuilder.modifyStoryLayer(lyr).then(function() {
                        scope.swapping = false;
                    });
                };
                scope.onChange = function(baseLayer) {
                    stStoryMapBaseBuilder.setBaseLayer(MapManager.storyMap, baseLayer);
                };
                scope.onSort = function(item, partFrom, partTo, indexFrom, indexTo){
                    console.log("Changed layer position of " + item.get('title')
                          + " FROM " + indexFrom
                          + " TO " + indexTo);

                    partFrom.forEach(function(layer) {
                        console.log(layer.get('title'));
                    });

                    partTo.forEach(function(layer) {
                        console.log(layer.get('title'));
                    });
                };

            }
        };
    });

    /*module.service('loadMapDialog', function($modal, $rootScope, stLocalStorageSvc) {
        function show() {
            var scope = $rootScope.$new(true);
            scope.maps = stLocalStorageSvc.listMaps();
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
    });*/
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

    module.controller('composerController', function($scope, $log, $compile, $http, $injector, MapManager, TimeControlsManager,
                                                     styleUpdater, $location) {

        $scope.mapManager = MapManager;
        $scope.timeControlsManager = $injector.instantiate(TimeControlsManager);
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        $scope.saveMap = function() {
            MapManager.saveMap();
        };

        $scope.newMap = function() {
            $location.path('/new');
        };
        $scope.styleChanged = function(layer) {
            layer.on('change:type', function(evt) {
                styleUpdater.updateStyle(evt.target);
            });
            styleUpdater.updateStyle(layer);
        };
        $scope.showLoadMapDialog = function() {
            var promise = loadMapDialog.show();
            promise.then(function(result) {
                if (result.mapstoryMapId) {
                    $location.path('/maps/' + result.mapstoryMapId + "/data/");
                } else if (result.localMapId) {
                    $location.path('/local/' + result.localMapId);
                }
            });
        };

        $scope.togglePreviewMode = function() {
          if ($scope.mode && $scope.mode.preview === true) {
            $scope.mapWidth = '100%'
          } else {
            $scope.mapWidth = '70%'
          }
          setTimeout(function() {
            window.storyMap.getMap().updateSize();
          });
        }

        // strip features from properties to avoid circular dependencies in debug
        $scope.layerProperties = function(lyr) {
            var props = lyr.getProperties();
            var features = delete props.features;
            props.featureCount = (features || []).length;
            return props;
        };


        var values = {annotations: [], boxes: [], data: []};

        $scope.nextChapter = function(){
            var nextChapter = Number(MapManager.storyChapter) + 1;
            if(nextChapter <= MapManager.chapterCount) {
                $log.info("Going to Chapter ", nextChapter);
                $scope.timeControlsManager.timeControls.update(values);
                $location.path('/chapter/' + nextChapter);
            }else{
                $location.path('');
            }
        };

        $scope.previousChapter = function(){
            var previousChapter = Number(MapManager.storyChapter) - 1;
            if(previousChapter > 0) {
                $log.info("Going to the Chapter ", previousChapter);
                $scope.timeControlsManager.timeControls.update(values);
                $location.path('/chapter/' + previousChapter);
            }else{
                $location.path('');
            }
        };

    });
})();
