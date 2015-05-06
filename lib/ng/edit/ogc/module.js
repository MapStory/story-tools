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

    StoryLayer.prototype.getLayer = function() {
      return this.layer_;
    };

    function EditableStoryLayer(data) {
      StoryLayer.call(this, data);
    }

    EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
    EditableStoryLayer.prototype.constructor = EditableStoryLayer;

    module.constant('StoryLayer', StoryLayer);
    module.constant('EditableStoryLayer', EditableStoryLayer);

    module.service('stAnnotateLayer', function($http) {
      return {
        loadCapabilities: function(EditableStoryLayer, map) {
          var request = 'GetCapabilities', service = 'WMS';
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
            var extent = ol.proj.transformExtent(
              caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox,
              'EPSG:4326',
              map.getView().getProjection()
            );
            EditableStoryLayer.set('extent', extent);
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
            var name = EditableStoryLayer.get('name'), start;
            if (name in found) {
              EditableStoryLayer.set('times', found[name]);
              start = found[name].start || found[name][0];
            }
            var layer = EditableStoryLayer.getLayer();
            if (layer instanceof ol.layer.Tile) {
              var params = {
                'LAYERS': name,
                'VERSION': '1.1.0',
                'TILED': true
              };
              if (start) {
                params.TIME = new Date(start).toISOString();
              }
              // @todo use urls for subdomain loading
              layer.setSource(new ol.source.TileWMS({
                url: EditableStoryLayer.get('url'),
                params: params,
                serverType: 'geoserver'
              }));
            } else if (layer instanceof ol.layer.Image) {
            }
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
            if (layerInfo.timeAttribute && EditableStoryLayer.get('timeEndpoint')) {
              me.getTimeAttribute(EditableStoryLayer);
            }
            var parts = id.split(':');
            EditableStoryLayer.set('typeName', id);
            EditableStoryLayer.set('featurePrefix', parts[0]);
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
          var me = this;
          return $http({
            method: 'GET',
            url: EditableStoryLayer.get('path') + 'rest/layers/' + EditableStoryLayer.get('id') + '.json'
          }).success(function(response) {
            EditableStoryLayer.set('styleName', response.layer.defaultStyle.name);
          });
        }
      };
    });

    module.service('stLayerBuilder', function($q, stAnnotateLayer) {
      return {
        buildEditableLayer: function(data, map) {
          var layer = new EditableStoryLayer(data);
          var deferred = $q.defer();
          $q.all(
            stAnnotateLayer.loadCapabilities(layer, map),
            stAnnotateLayer.describeFeatureType(layer),
            stAnnotateLayer.getStyleName(layer)
          ).then(function() {
            deferred.resolve(layer);
          });
          return deferred.promise;
        }
      };
    });

})();
