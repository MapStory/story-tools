(function() {
  'use strict';

  var module = angular.module('storytools.core.ogc', []);

  // @todo - provisional default story pins style
  var defaultStyle = [new ol.style.Style({
    fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
    stroke: new ol.style.Stroke({color: 'red', width: 1}),
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
      stroke: new ol.style.Stroke({color: 'red', width: 1})
    })
  })];

  var enabled_ = true;
  //var containerInstance_ = null;
  //var clickPosition_ = null;


  function StoryMap(data) {
    ol.Object.call(this, data);
    this.map_ = new ol.Map({target: data.target, pixelRatio: 1});
    this.overlay = new ol.layer.Vector({
      map: this.map_,
      style: defaultStyle
    });
    this.map_.addOverlay(new ol.Overlay({
      element: data.overlayElement || document.getElementById('feature-info'),
      stopEvent: true
    }));
    this.title = "Default Mapstory";
    this.abstract = "No Information Supplied.";
    this.owner = "";
    this.mode = "instant";
    this.returnToExtent = data.returnToExtent || false;
    this.center = [0, 0];
    this.zoom = 2;
    this.storyLayers_ = new ol.Collection();
    this.animationDuration_ = data.animationDuration || 500;
    this.storyBoxesLayer = new StoryLayer({
      timeAttribute: 'start_time',
      endTimeAttribute: 'end_time',
      layer: new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: defaultStyle
      })
    });
    this.storyPinsLayer = new StoryLayer({
      timeAttribute: 'start_time',
      endTimeAttribute: 'end_time',
      layer: new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: defaultStyle
      })
    });
    this.addStoryPinsLayer();
    this.addStoryBoxesLayer();
    this.featureInfoPerLayer_ = [];
    // valid values: 'layers', 'layer', 'feature', or ''
    this.state_ = '';
    this.selectedItem_ = null;
    this.selectedItemMedia_ = null;
    this.selectedLayer_ = null;
    this.selectedItemProperties_ = null;
    this.position_ = null;

    function classifyItem(item) {
      var type = '';

      if (goog.isDefAndNotNull(item)) {
        if (item.properties) {
          type = 'feature';
        } else if (item.features) {
          type = 'layer';
        } else if (item.length && item[0].features) {
          type = 'layers';
        }
      }
      console.log(type);
      return type;
    }

    this.show = function(item, position) {

      // if item is not specified, return
      if (!goog.isDefAndNotNull(item)) {
        return false;
      }

      var selectedItemOld = selectedItem_;

      //classify the item parameter as a layer, feature, or layers
      var type = classifyItem(item);


      // when there is nothing in featureInfoPerLayer_, we need to used the passed in item to initialize it
      // this is done when the user clicks on a single feature (on the map) vice selecting a feature from the pop-up
      // (such as clicking on overlapping features)
      if (featureInfoPerLayer_.length === 0) {

        if (type === 'feature') {
          featureInfoPerLayer_.push({features: [item], layer: selectedLayer_});
        } else if (type === 'layer') {
          featureInfoPerLayer_.push(item);
        } else if (type === 'layers') {
          featureInfoPerLayer_ = item;
        } else {
          throw ({
            name: 'featureInfoBox',
            level: 'High',
            message: 'Expected layers, layer, or feature.',
            toString: function() {
              return this.name + ': ' + this.message;
            }
          });
        }
      }


      //set the service's state_ variable (feature, layer, or layers)
      //the state is 'layer' when the user clicks on multiple (aka overlapping) features in a single layer
      //the state is 'layers' when the user clicks on multiple (overlapping) features that exist in separate layers
      //the state is 'feature' when the user finishes creating a feature, they clicked on a single (non-overlapping)
      //feature, or they select a feature from the deconfliction pop-up

      //we are also going to set the selectedItem_ variable
      //the selectedItem will be a single feature, a single layer, or a collection of layers
      //the state is essentially a designation of the selectedItem type
      if (type === 'feature') {
        state_ = 'feature';
        selectedItem_ = item;
      } else if (type === 'layer') {
        if (item.features.length === 1) {
          state_ = 'feature';
          selectedItem_ = item.features[0];
        } else {
          state_ = 'layer';
          selectedItem_ = item;
        }
      } else if (type === 'layers') {
        if (item.length === 1) {
          if (item[0].features.length === 1) {
            state_ = 'feature';
            selectedItem_ = item[0].features[0];
          } else {
            state_ = 'layer';
            selectedItem_ = item[0];
          }
        } else {
          state_ = 'layers';
          selectedItem_ = item;
        }
      } else {
        throw ({
          name: 'featureInfoBox',
          level: 'High',
          message: 'Invalid item passed in. Expected layers, layer, or feature.',
          toString: function() {
            return this.name + ': ' + this.message;
          }
        });
      }
      var forceUpdate = true;

      //---- if selected item changed
      if (selectedItem_ !== selectedItemOld) {

        // -- select the geometry if it is a feature, clear otherwise
        // -- store the selected layer of the feature
        if (classifyItem(selectedItem_) === 'feature') {

          selectedLayer_ = self.getSelectedItemLayer().layer;

          // -- update selectedItemProperties_ to contain the props from the newly selected item
          var tempProps = {};
          var props = [];

          //if the selectedItem_ is a feature go through and collect the properties in tempProps
          //if the property is a media property (like photo or video), we need to parse out
          //the value into an array (since there may be multiple photos or videos)
          goog.object.forEach(selectedItem_.properties, function(v, k) {
            tempProps[k] = [k, v];
          });

          //ensure we only take properties that are defined in the layer schema, the selectedLayer_
          //may be some other layer so
          var propName = null;
          /*  if (goog.isDefAndNotNull(selectedLayer_) && goog.isDefAndNotNull(selectedLayer_.get('metadata').schema)) {
           for (propName in selectedLayer_.get('metadata').schema) {
           if (tempProps.hasOwnProperty(propName)) {
           props.push(tempProps[propName]);
           }
           }
           } else {*/
          for (propName in tempProps) {
            if (tempProps.hasOwnProperty(propName)) {
              props.push(tempProps[propName]);
            }
          }
          // }
          selectedItemProperties_ = props;
          console.log('---- selectedItemProperties_: ', selectedItemProperties_);

          // -- update the selectedItemMedia_
          //selectedItemMedia_ = service_.getSelectedItemMediaByProp(null);
          //console.log('---- selectedItemMedia_: ', selectedItemMedia_);
        }
      }


      if (goog.isDefAndNotNull(position)) {
        position_ = position;

        self.storyMap.getMap().getOverlays().array_[0].setPosition(position);
      }


    };

    this.getSelectedItemLayer = function() {
      for (var i = 0; i < featureInfoPerLayer_.length; i++) {
        for (var j = 0; j < featureInfoPerLayer_[i].features.length; j++) {
          console.log(featureInfoPerLayer_[i].features[j] === selectedItem_);
          console.log(featureInfoPerLayer_[i].features[j]);
          console.log(selectedItem_);
          if (featureInfoPerLayer_[i].features[j].id === selectedItem_.id) {
            return featureInfoPerLayer_[i];
          }
        }
      }
      return null;
    };

    this.showPreviousState = function() {
      //Note: might want to get position and pass it in again
      self.show(self.getPreviousState().item);
    };

    this.getPreviousState = function() {

      var state = null;
      var item = null;

      if (state_ === 'feature') {
        var layer = self.getSelectedItemLayer();
        if (layer) {
          if (layer.features.length > 1) {
            state = 'layer';
            item = layer;
          } else if (layer.features.length === 1 && featureInfoPerLayer_.length > 1) {
            item = featureInfoPerLayer_;
            state = 'layers';
          }
        } else {
          throw ({
            name: 'featureInfoBox',
            level: 'High',
            message: 'Could not find feature!',
            toString: function() {
              return this.name + ': ' + this.message;
            }
          });
        }
      } else if (state_ === 'layer') {
        if (featureInfoPerLayer_.length > 1) {
          state = 'layers';
          item = featureInfoPerLayer_;
        }
      }

      if (item !== null) {
        return {
          state: state,
          item: item
        };
      }

      return '';
    };

      this.getState = function() {
            return state_;
        };

        this.getSelectedItem = function() {
            return selectedItem_;
        };

        this.getMediaUrl = function(mediaItem) {
            var url = mediaItem;
            // if the item doesn't start with 'http' then assume the item can be found in the fileservice and so convert it to
            // a url. This means if the item is, say, at https://mysite.com/mypic.jpg, leave it as is
            if (goog.isString(mediaItem) && mediaItem.indexOf('http') === -1) {
                url = configService_.configuration.fileserviceUrlTemplate.replace('{}', mediaItem);
            }
            return url;
        };

        this.getSelectedItemMedia = function() {
            return selectedItemMedia_;
        };

        // Warning, returns new array objects, not to be 'watched' / bound. use getSelectedItemMedia instead.
        this.getSelectedItemMediaByProp = function(propName) {
            var media = null;

            if (classifyItem(selectedItem_) === 'feature' && goog.isDefAndNotNull(selectedItem_) &&
                  goog.isDefAndNotNull(selectedItemProperties_)) {

                goog.object.forEach(selectedItemProperties_, function(prop, index) {
                    if (service_.isMediaPropertyName(prop[0])) {
                        if (!goog.isDefAndNotNull(propName) || propName === prop[0]) {
                            if (!goog.isDefAndNotNull(media)) {
                                //TODO: media should no longer be objects
                                media = [];
                            }

                            goog.object.forEach(prop[1], function(mediaItem) {
                                media.push(mediaItem);
                            });
                        }
                    }
                });
            }

            return media;
        };

        this.isMediaPropertyName = function(name) {
            var lower = name.toLowerCase();
            return lower.indexOf('fotos') === 0 || lower.indexOf('photos') === 0 ||
                  lower.indexOf('audios') === 0 || lower.indexOf('videos') === 0;
        };

        this.getMediaTypeFromPropertyName = function(name) {
            var lower = name.toLowerCase();
            var type = null;
            if (lower.indexOf('fotos') === 0 || lower.indexOf('photos') === 0) {
                type = 'photos';
            } else if (lower.indexOf('audios') === 0) {
                type = 'audios';
            } else if (lower.indexOf('videos') === 0) {
                type = 'videos';
            }
            return type;
        };

        this.getMediaUrlThumbnail = function(mediaItem) {
            var url = mediaItem;
            if (goog.isDefAndNotNull(mediaItem) && (typeof mediaItem === 'string')) {
                var ext = mediaItem.split('.').pop().split('/')[0]; // handle cases; /file.ext or /file.ext/endpoint
                if (supportedVideoFormats_.indexOf(ext) >= 0) {
                    url = service_.getMediaUrlDefault();
                } else {
                    url = service_.getMediaUrl(mediaItem);
                }
            }
            return url;
        };

        this.getMediaUrlDefault = function() {
            return '/static/maploom/assets/media-default.png';
        };

        this.getMediaUrlError = function() {
            return '/static/maploom/assets/media-error.png';
        };

        this.getSelectedItemProperties = function() {
            return selectedItemProperties_;
        };

        //this method is intended for unit testing only
        this.setSelectedItemProperties = function(props) {
            selectedItemProperties_ = props;
        };

        this.getSelectedLayer = function() {
            return selectedLayer_;
        };

        this.getPosition = function() {
            return position_;
        };

        this.getEnabled = function() {
            return enabled_;
        };

        this.hide = function() {
            selectedItem_ = null;
            selectedItemMedia_ = null;
            selectedItemProperties_ = null;
            state_ = null;
            featureInfoPerLayer_ = [];
            this.map_.getMap().getOverlays().array_[0].setPosition(undefined);
        };
  }

  StoryMap.prototype = Object.create(ol.Object.prototype);
  StoryMap.prototype.constructor = StoryMap;

  StoryMap.prototype.addStoryPinsLayer = function() {
    this.map_.addLayer(this.storyPinsLayer.getLayer());
  };

  StoryMap.prototype.addStoryBoxesLayer = function() {
    this.map_.addLayer(this.storyBoxesLayer.getLayer());
  };

  StoryMap.prototype.setStoryOwner = function(storyOwner) {
    this.owner = storyOwner;
  };

  StoryMap.prototype.getStoryOwner = function() {
    return this.owner;
  };

  StoryMap.prototype.getCenter = function() {
    return this.center;
  };

  StoryMap.prototype.getZoom = function() {
    return this.zoom;
  };

  StoryMap.prototype.setStoryTitle = function(storyTitle) {
    this.title = storyTitle;
  };

  StoryMap.prototype.setCenter = function(center) {
    this.center = center;
  };

  StoryMap.prototype.setZoom = function(zoom) {
    this.zoom = zoom;
  };

  StoryMap.prototype.setMode = function(playbackMode) {
    this.mode = playbackMode;
  };

  StoryMap.prototype.setStoryAbstract = function(storyAbstract) {
    this.abstract = storyAbstract;
  };


  StoryMap.prototype.getStoryTitle = function() {
    return this.title;
  };

  StoryMap.prototype.getStoryAbstract = function() {
    return this.abstract;
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
    storyLayer.storyMap_ = this;
    this.storyLayers_.push(storyLayer);
    // keep pins layer on top
    var idx = this.map_.getLayers().getLength(), me = this;
    this.map_.getLayers().forEach(function(sl) {
      if (sl === me.storyPinsLayer) {
        idx -= 1;
      }
    });
    this.map_.getLayers().insertAt(
          idx,
          storyLayer.getLayer()
    );
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
    this.addStoryPinsLayer();
  };

  StoryMap.prototype.animatePanAndBounce = function(center, zoom) {

    var duration = 2000;
    var start = +new Date();

    var view = this.map_.getView();

    if (view.getCenter() != center) {

      var pan = ol.animation.pan({
        duration: this.animationDuration_,
        source: view.getCenter(),
        start: start
      });


      var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 2 * view.getResolution(),
        start: start
      });

      this.map_.beforeRender(pan, bounce);

      view.setCenter(center);
      view.setZoom(zoom);
    }
  };

  StoryMap.prototype.animateCenterAndZoom = function(center, zoom) {
    var view = this.map_.getView();
    if (view.getCenter() !== center || view.getZoom() !== zoom) {
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
    }
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

  StoryMap.prototype.toggleStoryLayer = function(storyLayer) {
    var layer = storyLayer.getLayer();
    storyLayer.set('visibility', !layer.getVisible());
    layer.setVisible(!layer.getVisible());
  };

  module.constant('StoryMap', StoryMap);

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

  function StoryLayer(data) {
    if (data.times && storytools.core.time.utils.isRangeLike(data.times)) {
      data.times = new storytools.core.time.utils.Interval(data.times);
    }
    ol.Object.call(this, data);
    var layer;
    if (this.get('type') === 'VECTOR') {
      layer = new ol.layer.Vector({source: new ol.source.Vector()});
    } else if (this.get('type') === 'HEATMAP') {
      layer = new ol.layer.Heatmap({
        radius: data.style.radius,
        opacity: data.style.opacity,
        source: new ol.source.Vector()
      });
    } else if (this.get('type') === 'WMS') {
      var config = {
        useOldAsInterimTiles: true
      };
      if (this.get('singleTile') === true) {
        layer = new ol.layer.Image(config);
      } else {
        layer = new ol.layer.Tile(config);
      }
    } else {
      layer = data.layer;
    }
    this.layer_ = layer;
  }

  StoryLayer.prototype = Object.create(ol.Object.prototype);
  StoryLayer.prototype.constructor = StoryLayer;

  StoryLayer.prototype.getStoryMap = function() {
    return this.storyMap_;
  };

  StoryLayer.prototype.setWMSSource = function() {
    var layer = this.getLayer();
    var name = this.get('name');
    var times = this.get('times');
    var singleTile = this.get('singleTile');
    var params = this.get('params') || {
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
        url: this.get('url'),
        serverType: 'geoserver'
      }));
    } else {
      var tileGrid, resolutions = this.get('resolutions'),
            bbox = this.get('bbox');
      if (resolutions && bbox) {
        tileGrid = new ol.tilegrid.TileGrid({
          extent: bbox,
          resolutions: resolutions
        });
      }
      // @todo use urls for subdomain loading
      layer.setSource(new ol.source.TileWMS({
        url: this.get('url'),
        params: params,
        tileGrid: tileGrid,
        serverType: 'geoserver'
      }));
    }
  };

  StoryLayer.prototype.getState = function() {
    var state = this.getProperties();
    delete state.features;
    return state;
  };

  StoryLayer.prototype.getLayer = function() {
    return this.layer_;
  };

  StoryLayer.prototype.setLayer = function(layer) {
    if (this.layer_ && this.storyMap_) {
      var map = this.storyMap_.map_;
      var idx = map.getLayers().getArray().indexOf(this.layer_);
      map.getLayers().setAt(idx, layer);
    }
    this.layer_ = layer;
  };

  module.constant('StoryLayer', StoryLayer);

  function EditableStoryLayer(data) {
    StoryLayer.call(this, data);
  }

  EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
  EditableStoryLayer.prototype.constructor = EditableStoryLayer;

  module.constant('EditableStoryLayer', EditableStoryLayer);

  module.service('stAnnotateLayer', function($http, $q) {
    return {
      loadCapabilities: function(storyLayer) {
        var request = 'GetCapabilities', service = 'WMS';
        // always use the virtual service for GetCapabilities
        var url = storyLayer.get('url');
        if (url === '/geoserver/wms') {
          var name = storyLayer.get('name');
          var parts = name.split(':');
          url = url.replace('/geoserver', '/geoserver/' + parts[0] + '/' + parts[1]);
        }
        url = url.replace('http:', '');

        return $http({
          method: 'GET',
          url: url,
          params: {
            'REQUEST': request,
            'SERVICE': service,
            'VERSION': '1.3.0',
            'TILED': true
          }
        }).success(function(data) {
          var context = new owsjs.Jsonix.Context([
            owsjs.mappings.XLink_1_0,
            owsjs.mappings.WMS_1_3_0
          ]);
          var unmarshaller = context.createUnmarshaller();
          var caps = unmarshaller.unmarshalString(data);
          var layer = caps.value.capability.layer;
          storyLayer.set('latlonBBOX', [
            parseFloat(layer.boundingBox[0].minx),
            parseFloat(layer.boundingBox[0].miny),
            parseFloat(layer.boundingBox[0].maxx),
            parseFloat(layer.boundingBox[0].maxy)
          ]);
          var vendorSpecificCapabilities = caps.value.capability.vendorSpecificCapabilities;
          var tileSets = (vendorSpecificCapabilities) ? vendorSpecificCapabilities.tileSet || [] : [];
          for (var i = 0, ii = tileSets.length; i < ii; ++i) {
            if (tileSets[i].srs === 'EPSG:900913') {
              storyLayer.set('resolutions', tileSets[i].resolutions.split(' '));
              var bbox = tileSets[i].boundingBox;
              storyLayer.set('bbox', [
                parseFloat(bbox.minx),
                parseFloat(bbox.miny),
                parseFloat(bbox.maxx),
                parseFloat(bbox.maxy)
              ]);
              break;
            }
          }
          var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
          var name = storyLayer.get('name');
          if (name in found) {
            storyLayer.set('times', found[name]);
          }
        });
      },
      describeFeatureType: function(storyLayer) {
        var me = this;
        var request = 'DescribeFeatureType', service = 'WFS';
        var id = storyLayer.get('id');
        return $http({
          method: 'GET',
          url: storyLayer.get('url').replace('http:', ''),
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
          storyLayer.set('features', features);
          layer.set('features', features);
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
            name: data.title,
            title: data.title,
            group: 'background',
            source: new ol.source.MapQuest({layer: data.layer})
          });
        } else if (data.type === 'ESRI') {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: 'background',
            source: new ol.source.XYZ({
              attributions: [
                new ol.Attribution({
                  html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
                })
              ],
              url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
          });
        } else if (data.type === 'HOT') {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: 'background',
            source: new ol.source.OSM({
              attributions: [
                new ol.Attribution({
                  html: 'Tiles courtesy of <a href="//hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                }),
                ol.source.OSM.ATTRIBUTION
              ],
              crossOrigin: null,
              url: '//{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            })
          });
        } else if (data.type === 'OSM') {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: 'background',
            source: new ol.source.OSM()
          });
        } else if (data.type === 'MapBox') {
          var layer = new ol.layer.Tile({state: data, name: data.title, title: data.title, group: 'background'});
          var name = data.name;
          var urls = [
            '//a.tiles.mapbox.com/v1/mapbox.',
            '//b.tiles.mapbox.com/v1/mapbox.',
            '//c.tiles.mapbox.com/v1/mapbox.',
            '//d.tiles.mapbox.com/v1/mapbox.'
          ];
          var tileUrlFunction = function(tileCoord, pixelRatio, projection) {
            var zxy = tileCoord;
            if (zxy[1] < 0 || zxy[2] < 0) {
              return "";
            }
            return urls[Math.round(Math.random() * 3)] + name + '/' +
                  zxy[0].toString() + '/' + zxy[1].toString() + '/' +
                  zxy[2].toString() + '.png';
          };
          layer.setSource(new ol.source.TileImage({
            crossOrigin: null,
            attributions: [
              new ol.Attribution({
                html: /^world/.test(name) ?
                      "<a href='//mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='//mapbox.com/tos'>Terms of Service</a>" :
                      "<a href='//mapbox.com'>MapBox</a> | <a href='//mapbox.com/tos'>Terms of Service</a>"
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
        } else if (data.type === 'WMS') {
          return new ol.layer.Tile({
            group: "background",
            source: new ol.source.TileWMS({
              url: data.url,
              params: data.params
            })
          });
        } else {
          throw new Error('no type for : ' + JSON.stringify(data));
        }
      }
    };
  });

  module.service('stEditableLayerBuilder', function($q, stAnnotateLayer, stBaseLayerBuilder) {
    return {
      buildEditableLayer: function(data, map) {
        var layer = new EditableStoryLayer(data);
        var deferred = $q.defer();
        var promises = [];
        // TODO add this back when we have WMS-C GetCaps
        var needsCaps = !(data.latlonBBOX && data.times/* && data.bbox && data.resolutions*/);
        if (needsCaps) {
          promises.push(stAnnotateLayer.loadCapabilities(layer));
        }
        var needsDFT = !data.attributes;
        if (needsDFT) {
          promises.push(stAnnotateLayer.describeFeatureType(layer));
        }
        if ((data.type === 'VECTOR' || data.type === 'HEATMAP') && !data.features) {
          promises.push(stAnnotateLayer.getFeatures(layer, map));
        } else {
          promises.push(stAnnotateLayer.getStyleName(layer));
        }
        $q.all(
              promises
        ).then(function() {
                // this needs to be done here when everything is resolved
                if (layer.get('features')) {
                  var times = layer.get('times');
                  if (times) {
                    var start = times.start || times[0];
                    storytools.core.time.maps.filterVectorLayer(layer, {start: start, end: start});
                  } else {
                    layer.getLayer().getSource().addFeatures(layer.get('features'));
                  }
                } else {
                  layer.setWMSSource();
                }
                deferred.resolve(layer);
              }, function() {
                deferred.reject(arguments);
              });
        return deferred.promise;
      }
    };
  });

  module.service('stLayerBuilder', function($q) {
    return {
      buildLayer: function(data, map) {
        var layer = new StoryLayer(data);
        var deferred = $q.defer();
        layer.setWMSSource();
        deferred.resolve(layer);
        return deferred.promise;
      }
    };
  });

  module.service('stStoryMapBaseBuilder', function($rootScope, $compile, $http, stBaseLayerBuilder) {
    return {
      defaultMap: function(storymap) {
        storymap.getMap().setView(new ol.View({center: [0, 0], zoom: 3}));
        this.setBaseLayer(storymap, {
          title: 'World Topo Map',
          type: 'ESRI',
          name: 'world-topo-map'
        });
      },
      setBaseLayer: function(storymap, data) {
        var baseLayer = stBaseLayerBuilder.buildLayer(data);
        storymap.setBaseLayer(baseLayer);
      }
    };
  });

  module.service('stStoryMapBuilder', function($rootScope, $compile, stLayerBuilder, stStoryMapBaseBuilder) {
    return {
      modifyStoryMap: function(storymap, data) {
        storymap.clear();
        var mapConfig = storytools.mapstory.MapConfigTransformer.MapConfigTransformer(data);
        if (mapConfig.id >= 0) {
          storymap.set('id', mapConfig.id);
          storymap.setMode(mapConfig.playbackMode);
          if (data.about !== undefined) {
            storymap.setStoryTitle(data.about.title);
            storymap.setStoryAbstract(data.about.abstract);
            storymap.setStoryOwner(data.about.owner);
          }

          storymap.setCenter(mapConfig.map.center);
          storymap.setZoom(mapConfig.map.zoom);
        }
        for (var i = 0, ii = mapConfig.map.layers.length; i < ii; ++i) {
          var layerConfig = mapConfig.map.layers[i];
          if (layerConfig.group === 'background' && layerConfig.visibility === true) {
            stStoryMapBaseBuilder.setBaseLayer(storymap, layerConfig);
          } else {
            /*jshint loopfunc: true */
            stLayerBuilder.buildLayer(layerConfig, storymap.getMap()).then(function(sl) {
              // TODO insert at the correct index
              storymap.addStoryLayer(sl);
            });
          }
        }
        registerOnMapClick(storymap, $rootScope, $compile);
        storymap.getMap().setView(new ol.View({
          center: mapConfig.map.center,
          zoom: mapConfig.map.zoom,
          minZoom: 3,
          maxZoom: 17
        }));
      }
    };
  });

  module.service('stEditableStoryMapBuilder', function($rootScope, $compile, stStoryMapBaseBuilder, stEditableLayerBuilder) {
    return {
      modifyStoryLayer: function(storylayer, newType) {
        var data = storylayer.getProperties();
        var storymap = storylayer.getStoryMap();
        data.type = newType ? newType : ((data.type === 'WMS') ? 'VECTOR' : 'WMS');
        if (data.type === 'WMS') {
          delete data.features;
        }
        return stEditableLayerBuilder.buildEditableLayer(data, storymap.getMap()).then(function(sl) {
          // sequence is important here, first change layer, then the type.
          storylayer.setLayer(sl.getLayer());
          storylayer.set('type', sl.get('type'));
        });
      },
      modifyStoryMap: function(storymap, data) {
        storymap.clear();
        var mapConfig = storytools.mapstory.MapConfigTransformer.MapConfigTransformer(data);
        if (mapConfig.id >= 0) {
          storymap.set('id', mapConfig.id);
          storymap.setMode(mapConfig.playbackMode);
          if (data.about !== undefined) {
            storymap.setStoryTitle(data.about.title);
            storymap.setStoryAbstract(data.about.abstract);
            storymap.setStoryOwner(data.about.owner);
          }
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

        registerOnMapClick(storymap, $rootScope, $compile);

        storymap.getMap().setView(new ol.View({
          center: mapConfig.map.center,
          zoom: mapConfig.map.zoom,
          projection: mapConfig.map.projection,
          minZoom: 3,
          maxZoom: 17
        }));
      }
    };
  });

  var featureInfoPerLayer_ = [];
  // valid values: 'layers', 'layer', 'feature', or ''
  var state_ = '';
  var selectedItem_ = null;
  var selectedItemMedia_ = null;
  var selectedLayer_ = null;
  var selectedItemProperties_ = null;
  var position_ = null;
  var containerInstance_ = null;

  function registerOnMapClick(map_, $rootScope, $compile) {
    map_.getMap().on('singleclick', function(evt) {

      // Overlay clones the element so we need to compile it after it is cloned so that ng knows about it
      if (!goog.isDefAndNotNull(containerInstance_)) {
        containerInstance_ = map_.getMap().getOverlays().array_[0].getElement();
        $compile(containerInstance_)($rootScope);

      }

      self.hide();
      featureInfoPerLayer_ = [];
      selectedItem_ = null;
      selectedItemMedia_ = null;
      selectedItemProperties_ = null;
      state_ = null;

      var infoPerLayer = [];
      // Attempt to find a marker from the planningAppsLayer
      var view = map_.getMap().getView();
      var layers = map_.getStoryLayers().getArray();
      var validRequestCount = 0;
      var completedRequestCount = 0;

      goog.array.forEach(layers, function(layer, index) {
        var source = layer.getLayer().getSource();
        if (goog.isDefAndNotNull(source.getGetFeatureInfoUrl)) {
          validRequestCount++;
        }
      });
      //This function is called each time a get feature info request returns (call is made below).
      //when the completedRequestCount == validRequestCount, we can display the popup
      var getFeatureInfoCompleted = function() {
        completedRequestCount++;

        if (completedRequestCount === validRequestCount) {
          if (infoPerLayer.length > 0) {
            var clickPosition_ = evt.coordinate;
            self.show(infoPerLayer, clickPosition_);
          }
        } else {
          self.hide();
          selectedItem_ = null;
          selectedItemMedia_ = null;
          selectedItemProperties_ = null;
          state_ = null;
          featureInfoPerLayer_ = [];
        }
      };

      goog.array.forEach(layers, function(layer, index) {
        var source = layer.getLayer().getSource();

        if (goog.isDefAndNotNull(source.getGetFeatureInfoUrl)) {

          var url = source.getGetFeatureInfoUrl(evt.coordinate, view.getResolution(), view.getProjection(),
                {
                  'INFO_FORMAT': 'application/json',
                  'FEATURE_COUNT': 5
                });

          $http.get(url).then(function(response) {
            var layerInfo = {};
            layerInfo.features = response.data.features;

            if (layerInfo.features && layerInfo.features.length > 0 && goog.isDefAndNotNull(layers[index])) {
              layerInfo.layer = layers[index];
              goog.array.insert(infoPerLayer, layerInfo);
            }

            getFeatureInfoCompleted();
          }, function(reject) {
            getFeatureInfoCompleted();
          });

        }
      });
      getFeatureInfoCompleted();
    });


  }


})();
