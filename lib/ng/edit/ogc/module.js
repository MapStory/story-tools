(function() {
    'use strict';

    var module = angular.module('storytools.edit.ogc', [
    ]);

    function StoryMap(data) {
      ol.Object.call(this, data);
      this.storyLayers_ = new ol.Collection();
    }

    StoryMap.prototype = Object.create(ol.Object.prototype);
    StoryMap.prototype.constructor = StoryMap;

    StoryMap.prototype.addStoryLayer = function(storyLayer) {
      this.storyLayers_.push(storyLayer);
    };

    StoryMap.prototype.getStoryLayers = function() {
      return this.storyLayers_;
    };

    module.constant('StoryMap', StoryMap);

    function StoryLayer(data) {
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
            'TILED': true,
            'TIME': times.start || times[0]
          };
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
              source: new ol.source.MapQuest({layer: data.layer})
            });
          } else if (data.type === 'MapBox') {
            var layer = new ol.layer.Tile();
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
          if (data.type === 'WMS' || data.type === 'VECTOR') {
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
            if (data.type === 'VECTOR') {
              promises.push(stAnnotateLayer.getFeatures(layer, map));
            } else {
              promises.push(stAnnotateLayer.getStyleName(layer));
            }
            $q.all(
              promises
            ).then(function() {
              deferred.resolve(layer);
            });
          } else {
            layer.set('group', 'background');
            layer.setLayer(stBaseLayerBuilder.buildLayer(data));
            deferred.resolve(layer);
          }
          return deferred.promise;
        }
      };
    });

})();
