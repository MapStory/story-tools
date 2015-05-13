(function() {
    'use strict';

    var module = angular.module('storytools.edit.ogc', [
    ]);

    function StoryMap(data) {
      ol.Object.call(this, data);
      this.map_ = new ol.Map({target: data.target});
      this.storyLayers_ = new ol.Collection();
      this.animationDuration_ = data.animationDuration || 500;
    }

    StoryMap.prototype = Object.create(ol.Object.prototype);
    StoryMap.prototype.constructor = StoryMap;

    StoryMap.prototype.getState = function() {
      var config = {};
      config.map = {
        center: this.map_.getView().getCenter(),
        projection: this.map_.getView().getProjection().getCode(),
        zoom: this.map_.getView().getZoom(),
        layers: []
      };
      var mapId = this.get('id');
      if (mapId >= 0) {
        config.id = mapId;
      }
      var baseLayer = this.get('baselayer');
      if (baseLayer) {
        var baseLayerState = this.get('baselayer').get('state');
        baseLayerState.group = 'background';
        baseLayerState.visibility = true;
        config.map.layers.push(baseLayerState);
      }
      this.storyLayers_.forEach(function(storyLayer) {
        config.map.layers.push(storyLayer.getState());
      });
      return config;
    };

    StoryMap.prototype.setBaseLayer = function(baseLayer) {
      this.set('baselayer', baseLayer);
      this.map_.getLayers().forEach(function(lyr) {
        if (lyr.get('group') === 'background') {
          this.map_.removeLayer(lyr);
        }
      }, this);
      this.map_.getLayers().insertAt(0, this.get('baselayer'));
    };

    StoryMap.prototype.addStoryLayer = function(storyLayer) {
      this.storyLayers_.push(storyLayer);
      this.map_.addLayer(storyLayer.getLayer());
    };

    StoryMap.prototype.removeStoryLayer = function(storyLayer) {
      this.storyLayers_.remove(storyLayer);
      this.map_.removeLayer(storyLayer.getLayer());
    };

    StoryMap.prototype.getStoryLayers = function() {
      return this.storyLayers_;
    };

    StoryMap.prototype.getMap = function() {
      return this.map_;
    };

    StoryMap.prototype.clear = function() {
      this.map_.getLayers().clear();
      this.storyLayers_.clear();
    };

    StoryMap.prototype.animateCenterAndZoom = function(center, zoom) {
      var view = this.map_.getView();
      this.map_.beforeRender(ol.animation.pan({
        duration: this.animationDuration_,
        source: view.getCenter()
      }));
      view.setCenter(center);
      this.map_.beforeRender(ol.animation.zoom({
        resolution: view.getResolution(),
        duration: this.animationDuration_
      }));
      view.setZoom(zoom);
    };

    StoryMap.prototype.setAllowPan = function(allowPan) {
      this.map_.getInteractions().forEach(function(i) {
        if (i instanceof ol.interaction.KeyboardPan ||
          i instanceof ol.interaction.DragPan) {
            i.setActive(allowPan);
        }
      });
    };

    StoryMap.prototype.setAllowZoom = function(allowZoom) {
      var zoomCtrl;
      this.map_.getControls().forEach(function(c) {
        if (c instanceof ol.control.Zoom) {
          zoomCtrl = c;
        }
      });
      if (!allowZoom) {
        this.map_.removeControl(zoomCtrl);
      } else {
        this.map_.addControl(new ol.control.Zoom());
      }
      this.map_.getInteractions().forEach(function(i) {
        if (i instanceof ol.interaction.DoubleClickZoom ||
          i instanceof ol.interaction.PinchZoom ||
          i instanceof ol.interaction.DragZoom ||
          i instanceof ol.interaction.MouseWheelZoom) {
            i.setActive(allowZoom);
        }
      });
    };

    module.constant('StoryMap', StoryMap);

    function StoryLayer(data) {
      if (data.times && storytools.core.time.utils.isRangeLike(data.times)) {
        data.times = new storytools.core.time.utils.Interval(data.times);
      }
      ol.Object.call(this, data);
      var layer;
      if (this.get('type') === 'VECTOR') {
        layer = new ol.layer.Vector();
      } else if (this.get('type') === 'WMS') {
        var config = {
          useOldAsInterimTiles: true
        };
        if (this.get('singleTile') === true) {
          layer = new ol.layer.Image(config);
        } else {
          layer = new ol.layer.Tile(config);
        }
      }
      this.layer_ = layer;
    }

    StoryLayer.prototype = Object.create(ol.Object.prototype);
    StoryLayer.prototype.constructor = StoryLayer;

    StoryLayer.prototype.getState = function() {
      return this.getProperties();
    };

    StoryLayer.prototype.getLayer = function() {
      return this.layer_;
    };

    StoryLayer.prototype.setLayer = function(layer) {
      this.layer_ = layer;
    };

    function EditableStoryLayer(data) {
      StoryLayer.call(this, data);
    }

    EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
    EditableStoryLayer.prototype.constructor = EditableStoryLayer;

    module.constant('StoryLayer', StoryLayer);
    module.constant('EditableStoryLayer', EditableStoryLayer);

    module.service('stAnnotateLayer', function($http, $q) {
      return {
        setWMSSource: function(EditableStoryLayer) {
          var layer = EditableStoryLayer.getLayer();
          var name = EditableStoryLayer.get('name');
          var times = EditableStoryLayer.get('times');
          var singleTile = EditableStoryLayer.get('singleTile');
          var params = {
            'LAYERS': name,
            'VERSION': '1.1.0',
            'TILED': true
          };
          if (times) {
            params.TIME = new Date(times.start || times[0]).toISOString();
          }
          if (singleTile) {
            layer.setSource(new ol.source.ImageWMS({
              params: params,
              url: EditableStoryLayer.get('url'),
              serverType: 'geoserver'
            }));
          } else {
            var tileGrid, resolutions = EditableStoryLayer.get('resolutions'),
                bbox = EditableStoryLayer.get('bbox');
            if (resolutions && bbox) {
              tileGrid = new ol.tilegrid.TileGrid({
                extent: bbox,
                resolutions: resolutions
              });
            }
            // @todo use urls for subdomain loading
            layer.setSource(new ol.source.TileWMS({
              url: EditableStoryLayer.get('url'),
              params: params,
              tileGrid: tileGrid,
              serverType: 'geoserver'
            }));
          }
        },
        loadCapabilities: function(EditableStoryLayer, map) {
          var request = 'GetCapabilities', service = 'WMS';
          var me = this;
          return $http({
            method: 'GET',
            url: EditableStoryLayer.get('url'),
            params: {
              'REQUEST': request,
              'SERVICE': service,
              'VERSION': '1.3.0'
            }
          }).success(function(data) {
            var caps = new ol.format.WMSCapabilities().read(data);
            EditableStoryLayer.set('latlonBBOX',
                caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox);
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
            var name = EditableStoryLayer.get('name');
            if (name in found) {
              EditableStoryLayer.set('times', found[name]);
            }
            me.setWMSSource(EditableStoryLayer);
          });
        },
        describeFeatureType: function(EditableStoryLayer) {
          var me = this;
          var request = 'DescribeFeatureType', service = 'WFS';
          var id = EditableStoryLayer.get('id');
          return $http({
            method: 'GET',
            url: EditableStoryLayer.get('url'),
            params: {
              'SERVICE': service,
              'VERSION': '1.0.0',
              'REQUEST': request,
              'TYPENAME': id
            }
          }).success(function(data) {
            var parser = new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType();
            var layerInfo = parser.parseResult(data);
            if (layerInfo.timeAttribute) {
              EditableStoryLayer.set('timeAttribute', layerInfo.timeAttribute);
            } else if (EditableStoryLayer.get('timeEndpoint')) {
              me.getTimeAttribute(EditableStoryLayer);
            }
            var parts = id.split(':');
            EditableStoryLayer.set('typeName', id);
            EditableStoryLayer.set('featurePrefix', parts[0]);
            EditableStoryLayer.set('featureNS', layerInfo.featureNS);
            EditableStoryLayer.set('geomType', layerInfo.geomType);
            EditableStoryLayer.set('attributes', layerInfo.attributes); 
          });
        },
        getTimeAttribute: function(EditableStoryLayer) {
          var me = this;
          return $http({
            method: 'GET',
            url: EditableStoryLayer.get('timeEndpoint')
          }).success(function(data) {
            EditableStoryLayer.set('timeAttribute', data.attribute);
            if (data.endAttribute) {
              EditableStoryLayer.set('endTimeAttribute', data.endAttribute);
            }
          });
        },
        getStyleName: function(EditableStoryLayer) {
          if (EditableStoryLayer.get('canStyleWMS')) {
            var me = this;
            return $http({
              method: 'GET',
              url: EditableStoryLayer.get('path') + 'rest/layers/' + EditableStoryLayer.get('id') + '.json'
            }).success(function(response) {
              EditableStoryLayer.set('styleName', response.layer.defaultStyle.name);
            });
          } else {
            return $q.when('');
          }
        },
        getFeatures: function(EditableStoryLayer, map) {
            var me = this;
            var name = EditableStoryLayer.get('id');
            var wfsUrl = EditableStoryLayer.get('url') + '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                name + '&outputFormat=application/json' +
                '&srsName=' + map.getView().getProjection().getCode();
            return $http({
              method: 'GET',
              url: wfsUrl
            }).success(function(response) {
              var layer = EditableStoryLayer.getLayer();
              var features = new ol.format.GeoJSON().readFeatures(response);
              layer.setSource(new ol.source.Vector());
              var times = EditableStoryLayer.get('times');
              if (times) {
                var start = times.start || times[0];
                EditableStoryLayer.set('features', features);
                storytools.core.time.maps.filterVectorLayer(EditableStoryLayer, {start: start, end: start});
              } else {
                layer.getSource().addFeatures(features);
              }
            });
        }
      };
    });

    module.service('stBaseLayerBuilder', function() {
      return {
        buildLayer: function(data) {
          if (data.type === 'MapQuest') {
            return new ol.layer.Tile({
              state: data,
              title: data.title,
              group: 'background',
              source: new ol.source.MapQuest({layer: data.layer})
            });
          } else if (data.type === 'HOT') {
            return new ol.layer.Tile({
              state: data,
              title: data.title,
              group: 'background',
              source: new ol.source.OSM({
                attributions: [
                  new ol.Attribution({
                    html: 'Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                  }),
                  ol.source.OSM.ATTRIBUTION
                ],
                crossOrigin: null,
                url: 'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
              })
            });
          } else if (data.type === 'OSM') {
            return new ol.layer.Tile({
              state: data,
              title: data.title,
              group: 'background',
              source: new ol.source.OSM()
            });
          } else if (data.type === 'MapBox') {
            var layer = new ol.layer.Tile({state: data, title: data.title, group: 'background'});
            var name = data.name;
            var urls = [
              'http://a.tiles.mapbox.com/v1/mapbox.',
              'http://b.tiles.mapbox.com/v1/mapbox.',
              'http://c.tiles.mapbox.com/v1/mapbox.',
              'http://d.tiles.mapbox.com/v1/mapbox.'
            ];
            var tileUrlFunction = function(tileCoord, pixelRatio, projection) {
              var zxy = tileCoord;
              if (zxy[1] < 0 || zxy[2] < 0) {
                return "";
              }
              return urls[Math.round(Math.random()*3)] + name + '/' +
                  zxy[0].toString()+'/'+ zxy[1].toString() +'/'+
                  zxy[2].toString() +'.png';
            };
            layer.setSource(new ol.source.TileImage({
              crossOrigin: null,
              attributions: [
                new ol.Attribution({
                  html: /^world/.test(name) ?
                      "<a href='http://mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='http://mapbox.com/tos'>Terms of Service</a>" :
                      "<a href='http://mapbox.com'>MapBox</a> | <a href='http://mapbox.com/tos'>Terms of Service</a>"
                })
              ],
              tileGrid: new ol.tilegrid.TileGrid({
                origin: [-128 * 156543.03390625, -128 * 156543.03390625],
                resolutions: [
                    156543.03390625, 78271.516953125, 39135.7584765625,
                    19567.87923828125, 9783.939619140625, 4891.9698095703125,
                    2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                    305.74811309814453, 152.87405654907226, 76.43702827453613,
                    38.218514137268066, 19.109257068634033, 9.554628534317017,
                    4.777314267158508, 2.388657133579254, 1.194328566789627,
                    0.5971642833948135
                ]
              }),
              tileUrlFunction: tileUrlFunction
            }));
            return layer;
          }
        }
      };
    }); 

    module.service('stLayerBuilder', function($q, stAnnotateLayer, stBaseLayerBuilder) {
      return {
        buildEditableLayer: function(data, map) {
          var layer = new EditableStoryLayer(data);
          var deferred = $q.defer();
          var promises = [];
          var needsCaps = !(data.latlonBBOX && data.times && data.bbox && data.resolutions);
          if (needsCaps) {
            promises.push(stAnnotateLayer.loadCapabilities(layer, map));
          } else {
            stAnnotateLayer.setWMSSource(layer);
          }
          var needsDFT = !data.attributes;
          if (needsDFT) {
            promises.push(stAnnotateLayer.describeFeatureType(layer));
          }
          if (data.type === 'VECTOR' && !data.features) {
            promises.push(stAnnotateLayer.getFeatures(layer, map));
          } else {
            promises.push(stAnnotateLayer.getStyleName(layer));
          }
          $q.all(
            promises
          ).then(function() {
            deferred.resolve(layer);
          });
          return deferred.promise;
        }
      };
    });

    module.service('stStoryMapBuilder', function(stLayerBuilder, stBaseLayerBuilder) {
      return {
        modifyStoryMap: function(storymap, data) {
          storymap.clear();
          var mapConfig = data.tools ? storytools.mapstory.MapConfigTransformer.MapConfigTransformer(data): data;
          if (mapConfig.id >= 0) {
            storymap.set('id', mapConfig.id);
          }
          for (var i = 0, ii = mapConfig.map.layers.length; i < ii; ++i) {
            var layerConfig = mapConfig.map.layers[i];
            if (layerConfig.group === 'background' && layerConfig.visibility === true) {
              this.setBaseLayer(storymap, layerConfig);
            } else {
              /*jshint loopfunc: true */
              stLayerBuilder.buildEditableLayer(layerConfig, storymap.getMap()).then(function(sl) {
                // TODO insert at the correct index
                storymap.addStoryLayer(sl);
              });
            }
          }
          storymap.getMap().setView(new ol.View({
            center: mapConfig.map.center,
            zoom: mapConfig.map.zoom,
            projection: mapConfig.map.projection
          }));
        },
        defaultMap: function(storymap) {
          storymap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
          this.setBaseLayer(storymap, {
            title: 'Satellite Imagery',
            type: 'MapQuest',
            layer: 'sat'
          });
        },
        setBaseLayer: function(storymap, data) {
          var baseLayer = stBaseLayerBuilder.buildLayer(data);
          storymap.setBaseLayer(baseLayer);
        }
      };
    });

})();
