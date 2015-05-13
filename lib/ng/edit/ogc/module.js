(function() {
    'use strict';

    var module = angular.module('storytools.edit.ogc', [
      'storytools.core.ogc'
    ]);

    function EditableStoryMap(data) {
      StoryMap.call(this, data);
    }

    EditableStoryMap.prototype = Object.create(StoryMap.prototype);
    EditableStoryMap.prototype.constructor = EditableStoryMap;

    module.constant('EditableStoryMap', EditableStoryMap);

    EditableStoryMap.prototype.getState = function() {
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

    EditableStoryMap.prototype.removeStoryLayer = function(storyLayer) {
      this.storyLayers_.remove(storyLayer);
      this.map_.removeLayer(storyLayer.getLayer());
    };

    function EditableStoryLayer(data) {
      StoryLayer.call(this, data);
    }

    EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
    EditableStoryLayer.prototype.constructor = EditableStoryLayer;

    module.constant('EditableStoryLayer', EditableStoryLayer);

    module.service('stAnnotateLayer', function($http, $q) {
      return {
        loadCapabilities: function(storyLayer, map) {
          var request = 'GetCapabilities', service = 'WMS';
          var me = this;
          return $http({
            method: 'GET',
            url: storyLayer.get('url'),
            params: {
              'REQUEST': request,
              'SERVICE': service,
              'VERSION': '1.3.0'
            }
          }).success(function(data) {
            var caps = new ol.format.WMSCapabilities().read(data);
            storyLayer.set('latlonBBOX',
                caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox);
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
            var name = storyLayer.get('name');
            if (name in found) {
              storyLayer.set('times', found[name]);
            }
            storyLayer.setWMSSource();
          });
        },
        describeFeatureType: function(storyLayer) {
          var me = this;
          var request = 'DescribeFeatureType', service = 'WFS';
          var id = storyLayer.get('id');
          return $http({
            method: 'GET',
            url: storyLayer.get('url'),
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
              storyLayer.set('timeAttribute', layerInfo.timeAttribute);
            } else if (storyLayer.get('timeEndpoint')) {
              me.getTimeAttribute(storyLayer);
            }
            var parts = id.split(':');
            storyLayer.set('typeName', id);
            storyLayer.set('featurePrefix', parts[0]);
            storyLayer.set('featureNS', layerInfo.featureNS);
            storyLayer.set('geomType', layerInfo.geomType);
            storyLayer.set('attributes', layerInfo.attributes); 
          });
        },
        getTimeAttribute: function(storyLayer) {
          var me = this;
          return $http({
            method: 'GET',
            url: storyLayer.get('timeEndpoint')
          }).success(function(data) {
            storyLayer.set('timeAttribute', data.attribute);
            if (data.endAttribute) {
              storyLayer.set('endTimeAttribute', data.endAttribute);
            }
          });
        },
        getStyleName: function(storyLayer) {
          if (storyLayer.get('canStyleWMS')) {
            var me = this;
            return $http({
              method: 'GET',
              url: storyLayer.get('path') + 'rest/layers/' + storyLayer.get('id') + '.json'
            }).success(function(response) {
              storyLayer.set('styleName', response.layer.defaultStyle.name);
            });
          } else {
            return $q.when('');
          }
        },
        getFeatures: function(storyLayer, map) {
            var me = this;
            var name = storyLayer.get('id');
            var wfsUrl = storyLayer.get('url') + '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                name + '&outputFormat=application/json' +
                '&srsName=' + map.getView().getProjection().getCode();
            return $http({
              method: 'GET',
              url: wfsUrl
            }).success(function(response) {
              var layer = storyLayer.getLayer();
              var features = new ol.format.GeoJSON().readFeatures(response);
              layer.setSource(new ol.source.Vector());
              var times = storyLayer.get('times');
              if (times) {
                var start = times.start || times[0];
                storyLayer.set('features', features);
                storytools.core.time.maps.filterVectorLayer(storyLayer, {start: start, end: start});
              } else {
                layer.getSource().addFeatures(features);
              }
            });
        }
      };
    });

    module.service('stEditableLayerBuilder', function($q, stAnnotateLayer, stBaseLayerBuilder) {
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

    module.service('stEditableStoryMapBuilder', function(stStoryMapBaseBuilder, stEditableLayerBuilder) {
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
              stStoryMapBaseBuilder.setBaseLayer(storymap, layerConfig);
            } else {
              /*jshint loopfunc: true */
              stEditableLayerBuilder.buildEditableLayer(layerConfig, storymap.getMap()).then(function(sl) {
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
        }
      };
    });

})();
