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

module.exports = MapManager;
