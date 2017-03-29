(function() {
    'use strict';

    var module = angular.module('storytools.core.boxes', [
    ]);

    var boxes = storytools.core.maps.boxes;

    function StoryBoxLayerManager() {
        this.storyBoxes = [];
        this.map = null;
    }
    StoryBoxLayerManager.prototype.boxesChanged = function(boxes, action) {
        var i;
        if (action == 'delete') {
            for (i = 0; i < boxes.length; i++) {
                var box = boxes[i];
                for (var j = 0, jj = this.storyBoxes.length; j < jj; j++) {
                    if (this.storyBoxes[j].id == box.id) {
                        this.storyBoxes.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (action == 'add') {
            for (i = 0; i < boxes.length; i++) {
                this.storyBoxes.push(boxes[i]);
            }
        } else if (action == 'change') {
            // provided edits could be used to optimize below
        } else {
            throw new Error('action? :' + action);
        }
        // @todo optimize by looking at changes
        var times = this.storyBoxes.map(function(p) {
            return p.range;
        });
        this.map.storyBoxesLayer.set('times', times);
        this.map.storyBoxesLayer.set('features', this.storyBoxes);
    };
    StoryBoxLayerManager.prototype.loadFromGeoJSON = function(geojson, projection, overwrite) {

        if (overwrite){
             this.storyBoxes = [];
        }

        if (geojson && geojson.features) {
            var loaded = boxes.loadFromGeoJSON(geojson, projection);
            this.boxesChanged(loaded, 'add', true);
        }
    };

    module.service('StoryBoxLayerManager', StoryBoxLayerManager);

    module.constant('StoryBox', boxes.Box);

})();

(function() {
      'use strict';

    /**
     * @namespace storytools.core.legend.directives
     */
  var module = angular.module('storytools.core.legend.directives', []);

  var legendOpen = false;

  module.directive('stLegend',
      ["$rootScope", "MapManager", function($rootScope, MapManager) {
        return {
          restrict: 'C',
          replace: true,
          templateUrl: 'legend/legend.html',
          // The linking function will add behavior to the template
          link: function(scope, element) {
            scope.mapManager = MapManager;

            var openLegend = function() {
              angular.element(document.getElementById('legend-container'))[0].style.visibility = 'visible';
              angular.element(document.getElementById('legend-panel'))[0].style.display = 'block';
              legendOpen = true;
            };
            var closeLegend = function() {
              angular.element(document.getElementById('legend-panel'))[0].style.display = 'none';
              legendOpen = false;

              //the timeout is so the transition will finish before hiding the div
              setTimeout(function() {
                angular.element('#legend-container')[0].style.visibility = 'hidden';
              }, 350);
            };

            scope.toggleLegend = function() {
              if (legendOpen === false) {
                console.log(angular.element(document.getElementsByClassName('legend-item')));
                //if (angular.element(document.getElementsByClassName('.legend-item')).length > 0) {
                  openLegend();
                //}
              } else {
                closeLegend();
              }
            };

            scope.getLegendUrl = function(layer) {
              var url = null;
              var server = '/geoserver/wms';
              var layer_name = layer.get('typeName') || layer.get('id');
              url = server + '?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=' +
                  layer_name + '&transparent=true&legend_options=fontColor:0xFFFFFF;' +
                  'fontAntiAliasing:true;fontSize:14;fontStyle:bold;';
              //if (layer.get('params').STYLES) {
               // url += '&style=' + layer.get('params').STYLES;
              //}
              return url;
            };

            scope.$on('layer-added', function() {
              if (legendOpen === false) {
                openLegend();
              }
            });

            scope.$on('layerRemoved', function() {
              //close the legend if the last layer is removed
              if (legendOpen === true && angular.element('.legend-item').length == 1) {
                closeLegend();
              }
            });
          }
        };
      }]);
}());
(function() {
  'use strict';
   var module = angular.module('storytools.core.legend', [
        'storytools.core.legend.directives'
    ]);
})();
(function() {
  var module = angular.module('storytools.core.loading.directives', []);

  module.directive('stLoading',
      function() {
        return {
          restrict: 'C',
          templateUrl: 'loading/loading.html',
          scope: {
            spinnerHidden: '='
          },
          link: function(scope, element, attrs) {
            scope.spinnerWidth = 3;
            scope.spinnerRadius = 28;
            if (goog.isDefAndNotNull(attrs.spinnerWidth)) {
              scope.spinnerWidth = parseInt(attrs.spinnerWidth, 10);
            }
            if (goog.isDefAndNotNull(attrs.spinnerRadius)) {
              scope.spinnerRadius = parseInt(attrs.spinnerRadius, 10);
            }
            var loading = element.find('.loading');
            loading.css('width', scope.spinnerRadius + 'px');
            loading.css('height', scope.spinnerRadius + 'px');
            loading.css('margin', '-' + scope.spinnerRadius / 2 + 'px 0 0 -' + scope.spinnerRadius / 2 + 'px');

            var loadingSpinner = element.find('.loading-spinner');
            loadingSpinner.css('width', (scope.spinnerRadius - scope.spinnerWidth) + 'px');
            loadingSpinner.css('height', (scope.spinnerRadius - scope.spinnerWidth) + 'px');
            loadingSpinner.css('border', scope.spinnerWidth + 'px solid');
            loadingSpinner.css('border-radius', (scope.spinnerRadius / 2) + 'px');

            var mask = element.find('.mask');
            mask.css('width', (scope.spinnerRadius / 2) + 'px');
            mask.css('height', (scope.spinnerRadius / 2) + 'px');

            var spinner = element.find('.spinner');
            spinner.css('width', scope.spinnerRadius + 'px');
            spinner.css('height', scope.spinnerRadius + 'px');

          }
        };
      });
}());
(function() {
    'use strict';

    var module = angular.module('storytools.core.mapstory', [
      'storytools.core.mapstory.services'
    ]);

})();

(function() {
    'use strict';

    /**
     * @namespace storytools.core.measure.directives
     */
    var module = angular.module('storytools.core.measure.directives', []);


    module.directive('stMeasurepanel',
         ["$rootScope", "MapManager", function($rootScope, MapManager) {
            return {
                replace: true,
                templateUrl: 'measure/measurepanel.tpl.html',
                // The linking function will add behavior to the template
                link: function(scope, element) {
                    scope.mapManager = MapManager;

                    /** Handy flag for when measuring is happening */
                    scope.isMeasuring = false;

                    /** measuring feature. */
                    scope.feature = null;

                    /** label for hte output */
                    scope.measureType = '';

                    /** measuring 'source' */
                    scope.source = new ol.source.Vector();

                    /** measuring layer */
                    scope.layer = new ol.layer.Vector({
                        source: scope.source
                    });

                    /** which units to use as output. */
                    scope.units = 'm';

                    /** array of units options */
                    scope.unitTypes = [
                        {type: 'm', label: 'M/KM'},
                        {type: 'mi', label: 'Mi'},
                        {type: 'ft', label: 'Ft'}
                    ];

                    /** Change the units */
                    scope.changeUnits = function(newUnits) {
                        scope.units = newUnits;
                    };

                    /** A formatted string describing the measure */
                    scope.measureLabel = 0;

                    /** Formatted units label. */
                    scope.unitsLabel = '';

                    /** The interaction for drawing on the map,
                     *   defaults to null, set when measuring is started.
                     */
                    scope.interaction = null;

                    /** Create the interaction.
                     */
                    var createInteraction = function(measureType) {
                        return new ol.interaction.Draw({
                            source: scope.source,
                            type: (measureType == 'line' ? 'LineString' : 'Polygon')
                        });
                    };

                    /** This comes striaght from the OL Measuring example.
                     *
                     *  http://openlayers.org/en/latest/examples/measure.html
                     *
                     */
                    var wgs84Sphere = new ol.Sphere(6378137);

                    /** The map's projection should not change. */
                    var mapProjection = MapManager.storyMap.getMap().getView().getProjection();

                    /** When the measure has changed, update the UI.
                     *
                     *  Calculations are always done geodesically.
                     *
                     */
                    scope.updateMeasure = function() {
                        var geo = scope.feature.getGeometry();
                        // convert the geography to wgs84
                        var wgs84_geo = geo.clone().transform(mapProjection, 'EPSG:4326');
                        var coords = [];

                        if (geo instanceof ol.geom.Polygon) {
                            // get the polygon coordinates
                            coords = wgs84_geo.getLinearRing(0).getCoordinates();
                            // ensure polygon has at least 3 points.
                            if (coords.length > 2) {
                                // and calculate the area
                                var area = Math.abs(wgs84Sphere.geodesicArea(coords));
                                // convert to km's.
                                if (area > 1000000 && scope.units == 'm') {
                                    // m -> km
                                    area = area / 1000000;
                                    scope.unitsLabel = 'km^2';
                                } else if (scope.units == 'ft') {
                                    area = area * 10.7639;
                                    scope.unitsLabel = 'ft^2';
                                } else if (scope.units == 'mi') {
                                    area = (area / 1000) * 0.000386102;
                                    scope.unitsLabel = 'mi^2';
                                } else {
                                    scope.unitsLabel = 'm^2';
                                }
                                scope.measureLabel = area;
                                scope.feature.set('measureLabel', area);

                                // this updates outside of the standard angular event cycle,
                                //  so it is necessary to notify angular to update.
                                scope.$apply();
                            }
                        } else {
                            var length = 0;
                            coords = wgs84_geo.getCoordinates();
                            if (coords.length > 1) {
                                for (var i = 1, ii = coords.length; i < ii; i++) {
                                    length += wgs84Sphere.haversineDistance(coords[i - 1], coords[i]);
                                }

                                if (length > 1000 && scope.units == 'm') {
                                    // m -> km
                                    length = length / 1000;
                                    scope.unitsLabel = 'km';
                                } else if (scope.units == 'ft') {
                                    // m -> ft
                                    length = length * 3.28084;
                                    scope.unitsLabel = 'ft';
                                } else if (scope.units == 'mi') {
                                    // m -> mi
                                    length = length / 1609;
                                    scope.unitsLabel = 'mi';
                                } else {
                                    // assumes meters
                                    scope.unitsLabel = 'm';
                                }

                                scope.measureLabel = length;
                                scope.feature.set('measureLabel', length);
                                // see the note above re: forcing the update.
                                scope.$apply();
                            }
                        }
                    };

                    /** Initiate the measuring tool
                     *
                     *  @param {String} measureType 'line' or 'area' to determine what
                     *                              type of measuring should be done.
                     */
                    scope.startMeasuring = function(measureType) {
                        // cancel whatever current measuring is happening.
                        if (scope.isMeasuring) {
                            scope.stopMeasuring();
                        }

                        scope.measureType = measureType;

                        // add the measuring layer to the map.
                        MapManager.storyMap.getMap().addLayer(scope.layer);

                        // configure and add the interaction
                        scope.interaction = createInteraction(measureType);
                        MapManager.storyMap.getMap().addInteraction(scope.interaction);

                        scope.interaction.on('drawstart', function(event) {
                            // clear out the drawing of a feature whenever
                            //  a drawing starts.
                            scope.source.clear();

                            // reset the measure label.
                            scope.measureLabel = 0;

                            // configure the listener for the geometry changes.
                            scope.feature = event.feature;
                            scope.feature.set('id', 'measure-tool');
                            scope.feature.getGeometry().on('change', scope.updateMeasure);
                        });

                        scope.isMeasuring = true;
                    };

                    /** Stop the measuring process.
                     *
                     *  Cleans up the artifacts
                     *   of the measure tool from the map.
                     */
                    scope.stopMeasuring = function() {
                        // remove the layer from the map
                        MapManager.storyMap.getMap().removeLayer(scope.layer);

                        // clear the measure.
                        scope.measureLabel = 0;

                        // remove the interaction.
                        if (scope.interaction !== null) {
                            MapManager.storyMap.getMap().removeInteraction(scope.interaction);
                        }

                        // reset the measure type
                        scope.measureType = '';

                        // flag measuring as 'stopped'
                        scope.isMeasuring = false;
                    };

                }
            };
        }]);
}());
(function() {
  'use strict';
   var module = angular.module('storytools.core.measure', [
        'storytools.core.measure.directives'
    ]);
})();
(function() {
    'use strict';

    /**
     * @namespace storytools.core.ogc.directives
     */
    var module = angular.module('storytools.core.ogc.directives', []);

    module.directive('featureinfobox', ["MapManager", "$rootScope", "stFeatureInfoService", function(MapManager, $rootScope, stFeatureInfoService) {

            return {
                replace: false,
                restrict: 'A',
                templateUrl: 'ogc/featureinfobox.tpl.html',
                link: function(scope, el, atts) {
                    scope.mapManager = MapManager;
                    scope.featureInfoService = stFeatureInfoService;

                    scope.isUrl = function(str) {
                        if (!/^(f|ht)tps?:\/\//i.test(str)) {
                            return false;
                        }
                        return true;
                    };

                    scope.isShowingAttributes = function() {
                        var schema = null;//featureManagerService.getSelectedLayer().get('metadata').schema;

                        // if there is no schema, do not hide attributes
                        if (!goog.isDefAndNotNull(schema)) {
                            return true;
                        }

                        var properties = featureInfoService.getSelectedItemProperties();
                        for (var index = 0; index < properties.length; index++) {
                            if (goog.isDefAndNotNull(schema[properties[index][0]]) && schema[properties[index][0]].visible) {
                                return true;
                            }
                        }
                        return false;
                    };

                    scope.isAttributeVisible = function(property) {
                        var schema = null;//featureManagerService.getSelectedLayer().get('metadata').schema;

                        // if there is no schema, show the attribute. only filter out if there is schema and attr is set to hidden
                        if (!goog.isDefAndNotNull(schema) || !schema.hasOwnProperty(property)) {
                            return true;
                        }

                        return schema[property].visible;
                    };
                }
            };
        }]
    );
}());
(function() {
  'use strict';

  var module = angular.module('storytools.core.ogc', ['storytools.core.ogc.directives', 'storytools.core.ogc.services']);

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

  $('#map .metric-scale-line').css('bottom', '-=40px');
  $('#map .imperial-scale-line').css('bottom', '-=40px');
  $('#map .nautical-scale-line').css('bottom', '-=40px');
  $('#map .ol-mouse-position').css('bottom', '-=40px');
  $('#switch-coords-border').css('bottom', '-=40px');


  var nauticalScale = new ol.control.ScaleLine({className: 'nautical-scale-line ol-scale-line', units: ol.control.ScaleLineUnits.NAUTICAL,
        render: function(mapEvent) {
          //Have to write a custom render function as this scale always needs to display 20 nautical miles
          var frameState = mapEvent.frameState;
          if (!frameState) {
            this.viewState_ = null;
          } else {
            this.viewState_ = frameState.viewState;
          }


          var viewState = this.viewState_;

          if (!viewState) {
            if (this.renderedVisible_) {
              this.element_.style.display = 'none';
              this.renderedVisible_ = false;
            }
            return;
          }

          var center = viewState.center;
          var projection = viewState.projection;
          var metersPerUnit = projection.getMetersPerUnit();
          var pointResolution =
              projection.getPointResolution(viewState.resolution, center) *
              metersPerUnit;

          pointResolution /= 1852;
          var suffix = 'nm';

          var nauticalMiles = 20;
          var width = Math.round(nauticalMiles / pointResolution);

          var html = nauticalMiles + ' ' + suffix;
          if (this.renderedHTML_ != html) {
            this.innerElement_.innerHTML = html;
            this.renderedHTML_ = html;
          }

          //If the scale is wider than 60% the screen, hide it
          //If it's smaller than 15 pixels, hide it as the text won't fit inside the scale
          if (width > mapEvent.frameState.size[0] * 0.6 || width < 15) {
            this.element_.style.display = 'none';
            this.renderedVisible_ = false;
            return;
          }

          if (this.renderedWidth_ != width) {
            this.innerElement_.style.width = width + 'px';
            this.renderedWidth_ = width;
          }

          if (!this.renderedVisible_) {
            this.element_.style.display = '';
            this.renderedVisible_ = true;
          }

        }});


  function StoryMap(data) {
    ol.Object.call(this, data);
    this.map_ = new ol.Map({target: data.target, pixelRatio: 1,
        controls: ol.control.defaults().extend([
      /*new ol.control.ZoomSlider(),*/
      new ol.control.MousePosition({
        projection: 'EPSG:4326',
        coordinateFormat: ol.coordinate.toStringHDMS
      }),
      new ol.control.ScaleLine({className: 'metric-scale-line ol-scale-line',
        units: ol.control.ScaleLineUnits.METRIC}),
      new ol.control.ScaleLine({className: 'imperial-scale-line ol-scale-line',
        units: ol.control.ScaleLineUnits.IMPERIAL}),
            nauticalScale
    ])});
    this.overlay = new ol.layer.Vector({
      map: this.map_,
      style: defaultStyle
    });

    if (data.overlayElement) {
      this.map_.addOverlay(new ol.Overlay({
        element: data.overlayElement,
        stopEvent: true
      }));
    }
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
      if (sl === me.storyPinsLayer || sl instanceof ol.layer.Vector) {
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
    var layerParams= {};

    if (data.times && storytools.core.time.utils.isRangeLike(data.times)) {
      data.times = new storytools.core.time.utils.Interval(data.times);
    }
    ol.Object.call(this, data);
    var layer;
    if (this.get('type') === 'VECTOR') {

      var vectorSource = new ol.source.Vector({});

      if(data.cluster){
        var clusterSource = new ol.source.Cluster({distance: 20, source: vectorSource});
        layerParams = {source: clusterSource, style: data.style || defaultStyle};
      }
      else{
        layerParams = {source: vectorSource, style: data.style || defaultStyle};
      }

      layer = new ol.layer.Vector(layerParams);

      if(data.animate) {
        window.setInterval(function () {
          vectorSource.dispatchEvent('change');
        }, 1000 / 75);
      }

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

  module.service('stAnnotateLayer', ["$rootScope", "$http", "$q", function($rootScope, $http, $q) {
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
        $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'),
          phase: 'capabilities',
          status: 'loading' });

        return $http({
          method: 'GET',
          url: url,
          params: {
            'REQUEST': request,
            'SERVICE': service,
            'VERSION': '1.3.0',
            'TILED': true
          }
        }).then(function(response) {
          var context = new owsjs.Jsonix.Context([
            owsjs.mappings.XLink_1_0,
            owsjs.mappings.WMS_1_3_0
          ]);
          var unmarshaller = context.createUnmarshaller();
          var caps = unmarshaller.unmarshalString(response.data);
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

          $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'),
            phase: 'capabilities',
            status: 'done' });

        }).catch(function(response){});
      },
      describeFeatureType: function(storyLayer) {
        var me = this;
        var request = 'DescribeFeatureType', service = 'WFS';
        var id = storyLayer.get('id');
        $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'),  phase: 'featureType',
            status: 'loading' });
        return $http({
          method: 'GET',
          url: storyLayer.get('url').replace('http:', ''),
          params: {
            'SERVICE': service,
            'VERSION': '1.0.0',
            'REQUEST': request,
            'TYPENAME': id
          }
        }).then(function(response) {
          var parser = (storytools.edit)? new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType():null;
          if(parser) {
            var layerInfo = parser.parseResult(response.data);
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
          }
          $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'), phase: 'featureType', status: 'done' });
        }).catch(function(response){});
      },
      getTimeAttribute: function(storyLayer) {
        var me = this;
        return $http({
          method: 'GET',
          url: storyLayer.get('timeEndpoint')
        }).then(function(response) {
          storyLayer.set('timeAttribute', response.data.attribute);
          if (data.endAttribute) {
            storyLayer.set('endTimeAttribute', response.data.endAttribute);
          }
        }).catch(function(response){});
      },
      getStyleName: function(storyLayer) {
        if (storyLayer.get('canStyleWMS')) {
          var me = this;
          return $http({
            method: 'GET',
            url: storyLayer.get('path') + 'rest/layers/' + storyLayer.get('id') + '.json'
          }).then(function(response) {
            storyLayer.set('styleName', response.data.layer.defaultStyle.name);
          }).catch(function(response){});
        } else {
          return $q.when('');
        }
      },
      getFeatures: function(storyLayer, map) {
        var name = storyLayer.get('id');
        var cql = storyLayer.get('cql');
        var wfsUrl = storyLayer.get('url') + '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
              name + '&outputFormat=application/json' +
              '&srsName=' + map.getView().getProjection().getCode();

        if (cql){
          wfsUrl += "&cql_filter=" + cql;
        }

        wfsUrl += "&t=" + new Date().getTime();

        $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'), phase: 'features', status: 'loading' });

        return $http({
          method: 'GET',
          url: wfsUrl
        }).then(function(response) {
          var layer = storyLayer.getLayer();
          var filter = storyLayer.get('filter');
          var features = new ol.format.GeoJSON().readFeatures(response.data);

          if (filter) {
              features = filter(features);
          }

          storyLayer.set('features', features);

          if(layer.getSource() instanceof ol.source.Cluster) {
            layer.getSource().getSource().clear(true);
            layer.getSource().getSource().addFeatures(features);
          }else if(layer.getSource() instanceof ol.source.Vector){
            layer.getSource().clear(true);
            layer.getSource().addFeatures(features);
          }

          $rootScope.$broadcast('layer-status', { name: storyLayer.get('name'), phase: 'features', status: 'done' });

        }).catch(function(response){});
      }
    };
  }]);

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
                  html: 'Tiles &copy; <a href="//services.arcgisonline.com/ArcGIS/' +
                  'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>'
                })
              ],
              url: '//server.arcgisonline.com/ArcGIS/rest/services/' +
              'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
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

  module.service('stEditableLayerBuilder', ["$q", "stAnnotateLayer", "stBaseLayerBuilder", function($q, stAnnotateLayer, stBaseLayerBuilder) {
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
  }]);

  module.service('stLayerBuilder', ["$q", function($q) {
    return {
      buildLayer: function(data, map) {
        var layer = new StoryLayer(data);
        var deferred = $q.defer();
        layer.setWMSSource();
        deferred.resolve(layer);
        return deferred.promise;
      }
    };
  }]);

  module.service('stStoryMapBaseBuilder', ["$rootScope", "$compile", "stBaseLayerBuilder", function($rootScope, $compile, stBaseLayerBuilder) {
    return {
      defaultMap: function(storymap) {
        storymap.getMap().setView(new ol.View({center: [0, 0], zoom: 3, minZoom: 3, maxZoom: 16}));
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
  }]);

  module.service('stStoryMapBuilder', ["$rootScope", "$compile", "stLayerBuilder", "stStoryMapBaseBuilder", function($rootScope, $compile, stLayerBuilder, stStoryMapBaseBuilder) {
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
        storymap.getMap().setView(new ol.View({
          center: mapConfig.map.center,
          zoom: mapConfig.map.zoom,
          minZoom: 3,
          maxZoom: 17
        }));
      }
    };
  }]);

  module.service('stEditableStoryMapBuilder', ["$rootScope", "$compile", "stStoryMapBaseBuilder", "stEditableLayerBuilder", function($rootScope, $compile, stStoryMapBaseBuilder, stEditableLayerBuilder) {
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
        
        storymap.getMap().setView(new ol.View({
          center: mapConfig.map.center,
          zoom: mapConfig.map.zoom,
          projection: mapConfig.map.projection,
          minZoom: 3,
          maxZoom: 17
        }));
      }
    };
  }]);

     ol.Overlay.Popup = function(opt_options) {

        var options = opt_options || {};

        this.panMapIfOutOfView = options.panMapIfOutOfView;
        if (this.panMapIfOutOfView === undefined) {
            this.panMapIfOutOfView = true;
        }

        this.ani = options.ani;
        if (this.ani === undefined) {
            this.ani = ol.animation.pan;
        }

        this.ani_opts = options.ani_opts;
        if (this.ani_opts === undefined) {
            this.ani_opts = {'duration': 250};
        }

        this.container = document.createElement('div');
        this.container.className = 'ol-popup';
        this.container.id = (options.hasOwnProperty('id')) ? options.id : '';


        this.closer = document.createElement('a');
        this.closer.className = 'ol-popup-closer';
        this.closer.href = '#';
        this.container.appendChild(this.closer);

        var that = this;
        this.closer.addEventListener('click', function (evt) {
            that.container.style.display = 'none';
            that.closer.blur();
            evt.preventDefault();
        }, false);

        this.content = document.createElement('div');
        this.content.className = 'ol-popup-content';
        this.container.appendChild(this.content);

        ol.Overlay.call(this, {
            id: (options.hasOwnProperty('id')) ? options.id : 'popup',
            element: this.container,
            positioning: (options.hasOwnProperty('positioning')) ? options.positioning : 'top-left',
            stopEvent: (options.hasOwnProperty('stopEvent')) ? options.stopEvent : true,
            insertFirst: (options.hasOwnProperty('insertFirst')) ? options.insertFirst : true
        });

    };

    ol.inherits(ol.Overlay.Popup, ol.Overlay);

    ol.Overlay.Popup.prototype.getId = function() {
        return this.container.id;
    };

    ol.Overlay.Popup.prototype.show = function(coord, html) {
        this.setPosition(coord);
        if (html instanceof HTMLElement) {
            this.content.innerHTML = "";
            this.content.appendChild(html);
        } else {
            this.content.innerHTML = html;
        }
        this.container.style.display = 'block';
        if (this.panMapIfOutOfView) {
            this.panIntoView_(coord);
        }
        this.content.scrollTop = 0;
        return this;
    };

    /**
     * @private
     */
    ol.Overlay.Popup.prototype.panIntoView_ = function(coord) {

        var popSize = {
                width: this.getElement().clientWidth + 20,
                height: this.getElement().clientHeight + 20
            },
            mapSize = this.getMap().getSize();

        var tailHeight = 20,
            tailOffsetLeft = 60,
            tailOffsetRight = popSize.width - tailOffsetLeft,
            popOffset = this.getOffset(),
            popPx = this.getMap().getPixelFromCoordinate(coord);

        var fromLeft = (popPx[0] - tailOffsetLeft),
            fromRight = mapSize[0] - (popPx[0] + tailOffsetRight);

        var fromTop = popPx[1] - popSize.height + popOffset[1],
            fromBottom = mapSize[1] - (popPx[1] + tailHeight) - popOffset[1];

        var center = this.getMap().getView().getCenter(),
            curPx = this.getMap().getPixelFromCoordinate(center),
            newPx = curPx.slice();

        if (fromRight < 0) {
            newPx[0] -= fromRight;
        } else if (fromLeft < 0) {
            newPx[0] += fromLeft;
        }

        if (fromTop < 0) {
            newPx[1] += fromTop;
        } else if (fromBottom < 0) {
            newPx[1] -= fromBottom;
        }

        if (this.ani && this.ani_opts) {
            this.ani_opts.source = center;
            this.getMap().beforeRender(this.ani(this.ani_opts));
        }

        if (newPx[0] !== curPx[0] || newPx[1] !== curPx[1]) {
            this.getMap().getView().setCenter(this.getMap().getCoordinateFromPixel(newPx));
        }

        return this.getMap().getView().getCenter();

    };

    /**
     * Hide the popup.
     */
    ol.Overlay.Popup.prototype.hide = function() {
        this.container.style.display = 'none';
        return this;
    };


    /**
     * Indicates if the popup is in open state
     */
    ol.Overlay.Popup.prototype.isOpened = function() {
        return this.container.style.display == 'block';
    };





})();

(function() {
    var module = angular.module('storytools.core.ogc.services', []);

    var featureInfoPerLayer_ = [];
    // valid values: 'layers', 'layer', 'feature', or ''
    var state_ = '';
    var selectedItem_ = null;
    var selectedItemMedia_ = null;
    var selectedLayer_ = null;
    var selectedItemProperties_ = null;
    var position_ = null;
    var enabled_ = true;
    var containerInstance_ = null;
    var overlay_ = null;



    module.provider('stFeatureInfoService', function() {

        this.$get = ["$rootScope", "$q", "MapManager", "$compile", "$http", function ($rootScope, $q, MapManager, $compile, $http) {
            rootScope_ = $rootScope;
            service_ = this;
            mapService_ = MapManager.storyMap;
            //translate_ = $translate;
            httpService_ = $http;
            q_ = $q;
            registerOnMapClick($rootScope, $compile);
            
            overlay_ = new ol.Overlay({
                insertFirst: false,
                element: document.getElementById('info-box')
            });

            mapService_.getMap().addOverlay(overlay_);

            rootScope_.$on('rangeChange', function(evt, layer) {
                if (goog.isDefAndNotNull(service_.getSelectedLayer())) {
                    service_.hide();
                }
            });


            return this;
        }];


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

        this.show = function (item, position) {

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
                        toString: function () {
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
                    toString: function () {
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

                    selectedLayer_ = this.getSelectedItemLayer().layer;

                    // -- update selectedItemProperties_ to contain the props from the newly selected item
                    var tempProps = {};
                    var props = [];

                    //if the selectedItem_ is a feature go through and collect the properties in tempProps
                    //if the property is a media property (like photo or video), we need to parse out
                    //the value into an array (since there may be multiple photos or videos)
                    goog.object.forEach(selectedItem_.properties, function (v, k) {
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
                mapService_.getMap().getOverlays().array_[0].setPosition(position_);
            }


        };

        this.getSelectedItemLayer = function () {
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

        this.showPreviousState = function () {
            //Note: might want to get position and pass it in again
            this.show(this.getPreviousState().item);
        };

        this.getPreviousState = function () {

            var state = null;
            var item = null;

            if (state_ === 'feature') {
                var layer = this.getSelectedItemLayer();
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
                        toString: function () {
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

        this.getState = function () {
            return state_;
        };

        this.getSelectedItem = function () {
            return selectedItem_;
        };

        this.getMediaUrl = function (mediaItem) {
            var url = mediaItem;
            // if the item doesn't start with 'http' then assume the item can be found in the fileservice and so convert it to
            // a url. This means if the item is, say, at https://mysite.com/mypic.jpg, leave it as is
            if (goog.isString(mediaItem) && mediaItem.indexOf('http') === -1) {
                url = configService_.configuration.fileserviceUrlTemplate.replace('{}', mediaItem);
            }
            return url;
        };

        this.getSelectedItemMedia = function () {
            return selectedItemMedia_;
        };

        // Warning, returns new array objects, not to be 'watched' / bound. use getSelectedItemMedia instead.
        this.getSelectedItemMediaByProp = function (propName) {
            var media = null;

            if (classifyItem(selectedItem_) === 'feature' && goog.isDefAndNotNull(selectedItem_) &&
                goog.isDefAndNotNull(selectedItemProperties_)) {

                goog.object.forEach(selectedItemProperties_, function (prop, index) {
                    if (service_.isMediaPropertyName(prop[0])) {
                        if (!goog.isDefAndNotNull(propName) || propName === prop[0]) {
                            if (!goog.isDefAndNotNull(media)) {
                                //TODO: media should no longer be objects
                                media = [];
                            }

                            goog.object.forEach(prop[1], function (mediaItem) {
                                media.push(mediaItem);
                            });
                        }
                    }
                });
            }

            return media;
        };

        this.isMediaPropertyName = function (name) {
            var lower = name.toLowerCase();
            return lower.indexOf('fotos') === 0 || lower.indexOf('photos') === 0 ||
                lower.indexOf('audios') === 0 || lower.indexOf('videos') === 0;
        };

        this.getMediaTypeFromPropertyName = function (name) {
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

        this.getMediaUrlThumbnail = function (mediaItem) {
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

        this.getMediaUrlDefault = function () {
            return '/static/maploom/assets/media-default.png';
        };

        this.getMediaUrlError = function () {
            return '/static/maploom/assets/media-error.png';
        };

        this.getSelectedItemProperties = function () {
            return selectedItemProperties_;
        };

        //this method is intended for unit testing only
        this.setSelectedItemProperties = function (props) {
            selectedItemProperties_ = props;
        };

        this.getSelectedLayer = function () {
            return selectedLayer_;
        };

        this.getPosition = function () {
            return position_;
        };

        this.getEnabled = function () {
            return enabled_;
        };

        this.hide = function () {
            selectedItem_ = null;
            selectedItemMedia_ = null;
            selectedItemProperties_ = null;
            state_ = null;
            featureInfoPerLayer_ = [];
            mapService_.getMap().getOverlays().array_[0].setPosition(undefined);
        };

    });

    function registerOnMapClick($rootScope, $compile) {
        mapService_.getMap().on('singleclick', function(evt) {

            // Overlay clones the element so we need to compile it after it is cloned so that ng knows about it
            if (!goog.isDefAndNotNull(containerInstance_)) {
                containerInstance_ = mapService_.getMap().getOverlays().array_[0].getElement();
                $compile(containerInstance_)($rootScope);

            }

            service_.hide();
            featureInfoPerLayer_ = [];
            selectedItem_ = null;
            selectedItemMedia_ = null;
            selectedItemProperties_ = null;
            state_ = null;

            var infoPerLayer = [];
            // Attempt to find a marker from the planningAppsLayer
            var view = mapService_.getMap().getView();
            var layers = mapService_.getStoryLayers().getArray();
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
                        service_.show(infoPerLayer, clickPosition_);
                    }
                } else {
                    service_.hide();
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

                    //Local Mod for testing
                    //url = url.split('https://mapstory.org')[1];

                    httpService_.get(url).then(function(response) {
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
        });


    }

}());
(function() {
  var module = angular.module('loom_media_service', []);
  var service_ = null;
  var mediaHandlers_ = null;
  var q_ = null;
  var noembedProviders_ = null;

  module.config(["$sceDelegateProvider", function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      new RegExp(/https?:\/\/.*\.flickr\.com\/photos\/.*/),
      new RegExp(/https?:\/\/flic\.kr\/p\/.*/),
      new RegExp(/https?:\/\/instagram\.com\/p\/.*/),
      new RegExp(/https?:\/\/instagr\.am\/p\/.*/),
      new RegExp(/https?:\/\/vine\.co\/v\/.*/),
      new RegExp(/https?:\/\/(?:www\.)?vimeo\.com\/.+/),
      new RegExp(/https?:\/\/((?:www\.)|(?:pic\.)?)twitter\.com\/.*/),
      new RegExp(/https?:\/\/(?:w{3}\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com).+/im),
      new RegExp(/https?:\/\/(w{3}\.)?soundcloud\.com\/.+/im),
      new RegExp(/https?:\/\/(?:((?:m)\.)|((?:www)\.)|((?:i)\.))?imgur\.com\/?.+/im)
    ]);

  }]);

  module.provider('mediaService', function() {

    this.$get = ["$rootScope", "$http", "$q", function($rootScope, $http, $q) {
      http_ = $http;
      q_ = $q;
      service_ = this;

      http_.jsonp('https://noembed.com/providers?callback=JSON_CALLBACK', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(result) {
        noembedProviders_ = result;
      });

      mediaHandlers_ = service_.configureDefaultHandlers();

      return service_;
    }];

    this.isNOEmbedProvided = function(url) {
      for (var iProvider = 0; iProvider < noembedProviders_.length; iProvider += 1) {
        var provider = noembedProviders_[iProvider];
        for (var iUrlScheme = 0; iUrlScheme < provider.patterns.length; iUrlScheme += 1) {
          var regExp = new RegExp(provider.patterns[iUrlScheme], 'i');
          if (url.match(regExp) !== null) {
            return true;
          }
        }
      }
      return false;
    };

    this.configureDefaultHandlers = function() {

      var defaultHandlers = [
        //{name: 'youtube', regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])/i, callback: embed_youtube},
        {name: 'imgur', regex: /(https?:\/\/(\w+\.)?imgur\.com)/i, callback: embed_imgur}
      ];

      return defaultHandlers;
    };

    this.isUrl = function(str) {
      if (!/^(f|ht)tps?:\/\//i.test(str)) {
        return false;
      }
      return true;
    };

    this.getEmbedContent = function(url, embed_params) {

      var unsafeReturn = '<a href="' + url + '"> Unable to Embed Content </a>';

      //Check to see if we have a specialized handler first for this site
      for (var iHandler = 0; iHandler < mediaHandlers_.length; iHandler += 1) {
        var testHandler = mediaHandlers_[iHandler];
        if (testHandler.regex.test(url)) {
          return testHandler.callback(url, embed_params);
        }
      }

      //Check and see if the embed content is handled through the noembed service
      if (service_.isNOEmbedProvided(url) !== null) {
        return noembed_handler(url, embed_params);
      }

      //Unable to embed allowed content. Return a link to content.
      return unsafeReturn;
    };

    //Handler callbacks
    function getNOEmbedRequestUrl(url, params) {
      var api_url = 'https://noembed.com/embed?url=' + url + '&callback=JSON_CALLBACK',
          qs = '',
          i;

      for (i in params) {
        if (params[i] !== null) {
          qs += '&' + encodeURIComponent(i) + '=' + params[i];
        }
      }

      api_url += qs;

      return api_url;
    }

    function noembed_handler(url, embed_params) {

      var response = q_.defer();

      var request_url = getNOEmbedRequestUrl(url, embed_params);

      http_.jsonp(request_url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(result) {
        response.resolve(result.html);
      });

      return response.promise;

    }

    function embed_imgur(url, embed_params) {

      var response = q_.defer();

      var regex = /(https?:\/\/(\w+\.)?imgur\.com)/ig;

      var matches = url.match(regex);

      var embed = '';
      if (matches.length > 1) {
        //dealing with a basic image link from something like i.imgur.blah.png
        embed = '<iframe src="' + url + '" width="' + embed_params.maxwidth + '" height="' + embed_params.maxheight + '"></iframe>';
      } else {
        //dealing with link to post or album
        var id_regex = /https?:\/\/imgur\.com\/(?:\w+)\/?(.*?)(?:[#\/].*|$)/i;
        embed = url.replace(id_regex,
            '<blockquote class="imgur-embed-pub" lang="en" data-id="a/$1"></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
      }

      response.resolve(embed);
      return response.promise;

    }

  });

})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    var pins = storytools.core.maps.pins;
    var stutils = storytools.core.time.utils;
    var rootScope_ = null;

    function StoryPinLayerManager($rootScope) {
        this.storyPins = [];
        this.map = null;
        rootScope_ = $rootScope;
    }
    StoryPinLayerManager.$inject = ["$rootScope"];
    StoryPinLayerManager.prototype.autoDisplayPins = function (range) {
        var pinsToCheck = this.storyPins.filter(function (pin) {
            return pin.get('auto_show');
        });

        for (var iPin = 0; iPin < pinsToCheck.length; iPin += 1) {
            var pin = pinsToCheck[iPin];
            var pinRange = stutils.createRange(pin.start_time, pin.end_time);
            if (pinRange.intersects(range)) {
                rootScope_.$broadcast('showPin', pin);
            } else {
                rootScope_.$broadcast('hidePinOverlay', pin);
            }
        }
    };
    StoryPinLayerManager.prototype.pinsChanged = function(pins, action) {
        var i;
        if (action == 'delete') {
            for (i = 0; i < pins.length; i++) {
                var pin = pins[i];
                for (var j = 0, jj = this.storyPins.length; j < jj; j++) {
                    if (this.storyPins[j].id == pin.id) {
                        this.storyPins.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (action == 'add') {
            for (i = 0; i < pins.length; i++) {
                this.storyPins.push(pins[i]);
            }
        } else if (action == 'change') {
            // provided edits could be used to optimize below
        } else {
            throw new Error('action? :' + action);
        }
        // @todo optimize by looking at changes
        var times = this.storyPins.map(function(p) {
            if (p.start_time > p.end_time) {
                return storytools.core.utils.createRange(p.end_time, p.start_time);
            } else {
                return storytools.core.utils.createRange(p.start_time, p.end_time);
            }
        });
        this.map.storyPinsLayer.set('times', times);
        this.map.storyPinsLayer.set('features', this.storyPins);
    };

    StoryPinLayerManager.prototype.clear = function(){
        this.storyPins = [];
        this.map.storyPinsLayer.set('times', []);
        this.map.storyPinsLayer.set('features', this.storyPins);
    };

    StoryPinLayerManager.prototype.loadFromGeoJSON = function(geojson, projection, overwrite) {

        if (overwrite){
            this.storyPins = [];
        }

        if (geojson && geojson.features) {
            var loaded = pins.loadFromGeoJSON(geojson, projection);
            this.pinsChanged(loaded, 'add', true);
        }
    };

    module.service('StoryPinLayerManager', StoryPinLayerManager);

    module.constant('StoryPin', pins.StoryPin);

    // @todo naive implementation on local storage for now
    module.service('stAnnotationsStore', ["StoryPinLayerManager", function(StoryPinLayerManager) {
        function path(mapid) {
            return '/maps/' + mapid + '/annotations';
        }
        function get(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? [] : JSON.parse(saved);
            // TODO is this still needed?
            /*saved.forEach(function(s) {
                s.the_geom = format.readGeometry(s.the_geom);
            });*/
            return saved;
        }
        function set(mapid, annotations) {
            // TODO is this still needed?
            /*annotations.forEach(function(s) {
                if (s.the_geom && !angular.isString(s.the_geom)) {
                    s.the_geom = format.writeGeometry(s.the_geom);
                }
            });*/
            localStorage.setItem(path(mapid),
                new ol.format.GeoJSON().writeFeatures(annotations,
                    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
            );
        }
        return {
            loadAnnotations: function(mapid, projection) {
                return StoryPinLayerManager.loadFromGeoJSON(get(mapid), projection);
            },
            deleteAnnotations: function(annotations) {
                var saved = get();
                var toDelete = annotations.map(function(d) {
                    return d.id;
                });
                saved = saved.filter(function(s) {
                    return toDelete.indexOf(s.id) < 0;
                });
                set(saved);
            },
            saveAnnotations: function(mapid, annotations) {
                var saved = get();
                var maxId = 0;
                saved.forEach(function(s) {
                    maxId = Math.max(maxId, s.id);
                });
                var clones = [];
                annotations.forEach(function(a) {
                    if (typeof a.id == 'undefined') {
                        a.id = ++maxId;
                    }
                    var clone = a.clone();
                    if (a.get('start_time') !== undefined) {
                        clone.set('start_time', a.get('start_time')/1000);
                    }
                    if (a.get('end_time') !== undefined) {
                        clone.set('end_time', a.get('end_time')/1000);
                    }
                    clones.push(clone);
                });
                set(mapid, clones);
            }
        };
    }]);

})();

(function() {
    'use strict';

    angular.module('storytools.core.style', [
        'storytools.core.style.ol3StyleConverter',
        'storytools.core.style.svgIcon'
    ]);

})();
(function() {
    'use strict';

    var module = angular.module('storytools.core.style.ol3StyleConverter', []);

    module.factory('ol3MarkRenderer', ["ol3StyleConverter", function(ol3StyleConverter) {
        return function(shapeName, size) {
            var black = ol3StyleConverter.getColor('#000000');
            var strokeWidth = 3; // hack to fix down-scaling for x and cross
            var opts = {color: black, width: strokeWidth};
            var canvas = angular.element(ol3StyleConverter.generateShape({
                    symbol: {shape: shapeName, size: size - strokeWidth}
                },
                new ol.style.Fill(opts),
                new ol.style.Stroke(opts)).getImage());
            return canvas;
        };
    }]);

    module.factory('ol3StyleConverter', ["stSvgIcon", function(stSvgIcon) {
        return {
            generateShapeConfig: function(style, fill, stroke) {
                var shape = style.symbol.shape,
                    // final size is actually (2 * (radius + stroke.width)) + 1
                    radius = style.symbol.size / 2;
                if (shape === 'circle') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        radius: radius
                    };
                } else if (shape === 'square') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: radius,
                        angle: Math.PI / 4
                    };
                } else if (shape === 'triangle') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 3,
                        radius: radius,
                        angle: 0
                    };
                } else if (shape === 'star') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 5,
                        radius: radius,
                        radius2: 0.5*radius,
                        angle: 0
                    };
                } else if (shape === 'cross') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: radius,
                        radius2: 0,
                        angle: 0
                    };
                } else if (shape === 'x') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: radius,
                        radius2: 0,
                        angle: Math.PI / 4
                    };
                }
            },
            calculateRotation: function(style, feature) {
                if (style.symbol && style.symbol.rotationAttribute) {
                    if (style.symbol.rotationUnits === 'radians') {
                        return feature.get(style.symbol.rotationAttribute);
                    } else {
                        return (feature.get(style.symbol.rotationAttribute)/360)*Math.PI;
                    }
                } else {
                    return undefined;
                }
            },
            generateShape: function(style, fill, stroke, feature) {
                var config = this.generateShapeConfig(style, fill, stroke);
                if (config && feature) {
                    config.rotation = this.calculateRotation(style, feature);
                }
                if (style.symbol.graphic) {
                    var info = stSvgIcon.getImage(style.symbol.graphic, fill.getColor(), stroke.getColor(), true);
                    return new ol.style.Icon({
                        src: info.dataURI,
                        rotation: this.calculateRotation(style, feature),
                        scale: style.symbol.size / Math.max(info.width, info.height),
                        opacity: style.symbol.opacity
                    });
                } else if (style.symbol.shape === 'circle') {
                    return new ol.style.Circle(config);
                } else {
                    return new ol.style.RegularShape(config);
                }
            },
            getText: function(style, feature) {
                if (style.label && style.label.attribute) {
                    return '' + feature.get(style.label.attribute);
                } else {
                    return undefined;
                }
            },
            generateText: function(style, stroke, feature) {
                if (style.label && style.label.attribute !== null) {
                    return new ol.style.Text({
                        fill: new ol.style.Fill({color: style.label.fillColor}),
                        stroke: stroke,
                        font: style.label.fontStyle + ' ' + style.label.fontWeight + ' ' + style.label.fontSize + 'px ' + style.label.fontFamily,
                        text: this.getText(style, feature)
                    });
                }
            },
            getColor: function(color, opacity) {
                var rgba = ol.color.asArray(color);
                if (opacity !== undefined) {
                    rgba = rgba.slice();
                    rgba[3] = opacity/100;
                }
                return 'rgba(' + rgba.join(',') + ')';
            },
            generateCacheKey: function(style, feature) {
                var text = this.getText(style, feature);
                var classify = (style.classify && style.classify.attribute) ? feature.get(style.classify.attribute) : undefined;
                var rotation = (style.symbol && style.symbol.rotationAttribute) ? feature.get(style.symbol.rotationAttribute): undefined;
                return text + '|' + classify + '|' + rotation;
            },
            generateStyle: function(style, feature, resolution) {
                var result, key2;
                if (!this.styleCache_) {
                    this.styleCache_ = {};
                }
                var key = JSON.stringify(style);
                if (this.styleCache_[key]) {
                    if (!this.styleCache_[key].length) {
                        key2 = this.generateCacheKey(style, feature);
                        if (this.styleCache_[key][key2]) {
                            return this.styleCache_[key][key2];
                        }
                    } else {
                        return this.styleCache_[key];
                    }
                }
                var stroke;
                if (style.stroke) {
                    var lineDash;
                    if (style.stroke.strokeStyle === 'dashed') {
                        lineDash = [5];
                    } else if (style.stroke.strokeStyle === 'dotted') {
                        lineDash = [1,2];
                    }
                    stroke = new ol.style.Stroke({
                        lineDash: lineDash,
                        color: this.getColor(style.stroke.strokeColor, style.stroke.strokeOpacity),
                        width: style.stroke.strokeWidth
                    });
                }
                if (style.classify && style.classify.attribute !== null) {
                    var label;
                    for (var i=0, ii=style.rules.length; i<ii; ++i) {
                        var rule = style.rules[i];
                        var attrVal = feature.get(style.classify.attribute);
                        var match = false;
                        if (rule.value !== undefined) {
                            match = attrVal === rule.value;
                        } else if (rule.range) {
                            match = (attrVal >= rule.range.min && attrVal <= rule.range.max);
                        }
                        if (match) {
                            label = this.generateText(style, stroke, feature);
                            if (style.geomType === 'point' && rule.style.symbol.fillColor) {
                                result = [new ol.style.Style({
                                    text: label,
                                    image: this.generateShape(style, new ol.style.Fill({color: rule.style.symbol.fillColor}), stroke, feature)
                                })];
                            } else if (style.geomType === 'line' && rule.style.stroke.strokeColor) {
                                result = [new ol.style.Style({
                                    text: label,
                                    stroke: new ol.style.Stroke({
                                        color: rule.style.stroke.strokeColor,
                                        width: 2
                                    })
                                })];
                            } else if (style.geomType === 'polygon' && rule.style.symbol.fillColor) {
                                result = [new ol.style.Style({
                                    text: label,
                                    stroke: stroke,
                                    fill: new ol.style.Fill({
                                        color: rule.style.symbol.fillColor
                                    })
                                })];
                            }
                        }
                    }
                    if (result) {
                        if (!this.styleCache_[key]) {
                            this.styleCache_[key] = {};
                        }
                        key2 = this.generateCacheKey(style, feature);
                        this.styleCache_[key][key2] = result;
                    }
                } else {
                    var fill = new ol.style.Fill({
                        color: this.getColor(style.symbol.fillColor, style.symbol.fillOpacity)
                    });
                    result = [
                        new ol.style.Style({
                            image: this.generateShape(style, fill, stroke, feature),
                            fill: fill,
                            stroke: stroke,
                            text: this.generateText(style, stroke, feature)
                        })
                    ];
                }
                if (result) {
                    var hasText = result[0].getText();
                    if (hasText || (style.classify && style.classify.attribute) || (style.symbol && style.symbol.rotationAttribute)) {
                        if (!this.styleCache_[key]) {
                            this.styleCache_[key] = {};
                        }
                        key2= this.generateCacheKey(style, feature);
                        this.styleCache_[key][key2] = result;
                    } else {
                        this.styleCache_[key] = result;
                    }
                }
                return result;
            }
        };
    }]);
})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.style.svgIcon', []);

    module.factory('stSvgIcon', ["$cacheFactory", "$http", "$q", "$log", function($cacheFactory, $http, $q, $log) {
        var element = angular.element(document.createElement('div'));
        var imageCache = $cacheFactory('stSvgImage');
        var dataCache = $cacheFactory('stSvgData');
        function process(svg, fill, stroke) {
            element.html(svg);
            // @todo make smarter
            ['path', 'polygon', 'circle', 'ellipse', 'rect', 'line', 'polyline'].forEach(function(el) {
                angular.forEach(element.find(el), function(e) {
                    // @todo does it make sense to override stroke width?
                    e = angular.element(e);
                    var css = {
                        opacity: 1
                    };
                    var existingFill = e.css('fill') || e.attr('fill') || '';
                    if (existingFill != 'none' && existingFill != 'rgb(255, 255, 255)' && existingFill.toLowerCase() != '#ffffff') {
                        css.fill = fill;
                    }
                    var existingStroke = e.css('stroke') || e.attr('stroke');
                    if (existingStroke != 'none') {
                        css.stroke = stroke;
                    }
                    e.css(css);
                });
            });
            var root = element.find('svg');
            var width = parseInt(root.attr('width'));
            var height = parseInt(root.attr('height'));
            // ugh - we're totally guessing here but things go badly without:
            // on firefox: ns_error_not_available on calling canvas.drawimage
            // on chrome: very large icon (default size as it renders)
            // we might be able to set the src on an img element and figure this out...
            if (isNaN(width) || isNaN(height)) {
                root.attr('width', 64);
                root.attr('height', 64);
                width = 64;
                height = 64;
            }
            var dataURI = 'data:image/svg+xml;base64,' + btoa(element.html());
            return {
                dataURI: dataURI,
                width: width,
                height: height
            };
        }
        return {
            getImage: function(svgURI, fill, stroke, sync) {
                var key = svgURI + fill + stroke;
                var cached = imageCache.get(key);
                var deferred = $q.defer();
                if (cached) {
                    if (sync) {
                        return cached;
                    }
                    deferred.resolve(cached);
                } else {
                    if (sync) {
                        var svg = dataCache.get(svgURI);
                        if (svg) {
                            var imageInfo = process(svg, fill, stroke);
                            imageInfo.uri = svgURI;
                            imageCache.put(key, imageInfo);
                            return imageInfo;
                        }
                        $log.warning('no svg for', svgURI);
                        return null;
                    }
                    this.getImageData(svgURI).then(function(response) {
                        var imageInfo = process(response.data, fill, stroke);
                        imageInfo.uri = svgURI;
                        imageCache.put(key, imageInfo);
                        deferred.resolve(imageInfo);
                    }, function() {
                        deferred.reject('error');
                    });
                }
                return deferred.promise;
            },
            getImageData: function(svgURI) {
                return $http.get(svgURI, {cache: true}).success(function(response) {
                    dataCache.put(svgURI, response);
                    return response;
                }).error(function() {
                    $log.warn('error fetching ' + svgURI);
                });
            }
        };
    }]);

})();

(function () {
  'use strict';

  /**
   * @namespace storytools.core.time.directives
   */
  var module = angular.module('storytools.core.time.directives', []);

  /**
   * @ngdoc directive
   * @name stPlaybackControls
   * @memberOf storytools.core.time.directives
   * @description
   * Directive that presents playback controls to manipulate the provided
   * TimeController instance.
   *
   * @param {TimeController} time-controls attribute
   */
  module.directive('stPlaybackControls', function () {
    return {
      restrict: 'E',
      templateUrl: 'time/playback-controls.html',
      scope: {
        timeControls: '=',
        playbackOptions: '='
      },
      link: function (scope, elem) {
        scope.playbackState = "Play";
        scope.loopText = 'Loop Chapter';
        scope.loopStoryEnabled = false;
        scope.loopChapterEnabled = false;
        scope.showTimeLine = false;
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
              scope.playbackState = started ? "Pause" : "Play";
              scope.$apply();
            });
            neu.on('rangeChange', function (range) {
              scope.currentRange = range;
              scope.$apply();
            });
          }
        });
        scope.$on('pausePlayback', function () {
          var tc = scope.timeControls;
          var started = tc.isStarted();
          if (started) {
            tc.stop();
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

        /**
         * Check if window is in full screen mode.
         * @return {Boolean} full screen mode
         */
        scope.isInFullScreen = function (doc) {


          if (doc.fullScreenElement !== undefined) {
            return !!doc.fullScreenElement;
          }


          if (doc.mozFullScreen !== undefined) {
            return !!doc.mozFullScreen;
          }


          if (doc.webkitIsFullScreen !== undefined) {
            return !!doc.webkitIsFullScreen;
          }


          if (window.fullScreen !== undefined) {
            return !!window.fullScreen;
          }


          if (window.navigator.standalone !== undefined) {
            return !!window.navigator.standalone;
          }
        };

        scope.toggleFullScreen = function () {
          var elem = window.parent.document.getElementById('embedded_map');

          if (!this.isInFullScreen(document) && !this.isInFullScreen(parent.document)) {
            if (!document.webkitFullScreen || !document.mozFullScreen || !document.msFullscreenElement || !document.fullscreenElement) {
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            }
          } else {
            if (document.mozCancelFullScreen) {
              parent.document.mozCancelFullScreen();
              document.mozCancelFullScreen();
            } else {
              parent.document.webkitCancelFullScreen();
              document.webkitCancelFullScreen();
            }
          }
        };

        scope.toggleLoop = function () {
          var tc = scope.timeControls;
          if (tc.loop === 'none') {
            scope.loop = tc.loop = 'chapter';
            scope.loopText = 'Loop Story';
            scope.loopChapterEnabled = true;
          } else if (tc.loop === 'chapter') {
            scope.loop = tc.loop = 'story';
            scope.loopText = 'Disable Loop';
            scope.loopStoryEnabled = true;
            scope.loopChapterEnabled = false;
          } else {
            scope.loopText = 'Loop Chapter';
            scope.loop = tc.loop = 'none';
            scope.loopStoryEnabled = false;
            scope.loopChapterEnabled = false;          }
        };

        scope.getLoopButtonGlyph = function(){
          if (scope.loop === 'story') {
            return 'glyphicon glyphicon-refresh';
          } else {
            return 'glyphicon glyphicon-repeat';
          }
        };

        scope.toggleTimeLine = function () {
          var tc = scope.timeControls;
          scope.showTimeLine = tc.showTimeLine = !tc.showTimeLine;
          var element = $('#timeline');

          if (tc.showTimeLine) {
            element.show("slow");

          } else {
            element.hide("slow");
          }
        };
      }
    };
  });

  /**
   * @ngdoc directive
   * @name stPlaybackSettings
   * @memberOf storytools.core.time.directives
   * @description
   * Directive that presents playback settings that manipulate the provided
   * TimeController instance.
   *
   * @param {TimeController} time-controls attribute
   * @param {object} playbackOptions (will go away)
   */
  module.directive('stPlaybackSettings', function () {
    return {
      restrict: 'E',
      templateUrl: 'time/playback-settings.html',
      scope: {
        timeControls: '=',
        // @todo remove once timeControls properly exposes access to this
        playbackOptions: '='
      },
      link: function (scope, elem) {
        scope.optionsChanged = function () {
          if (scope.timeControls) {
            scope.timeControls.update(scope.playbackOptions);
          }
        };
      }
    };
  });
})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.time', [
        'storytools.core.time.directives',
        'storytools.core.time.services',
        'storytools.core.templates'
    ]);

    module.filter('isodate', function() {
        // @todo should support optional precision specifier (as unit?)
        return function(input) {
            return input !== null && angular.isDefined(input)  ?
                angular.isNumber(input) ? new Date(input).toISOString():
                    Date.parse(input).toISOString():
                    '';
        };
    });

})();
(function() {
    'use strict';

    var module = angular.module('storytools.core.time.services', []);

    var stutils = storytools.core.time.utils;

    /**
     * Compute a sorted, unique array of ticks for the provided layers. The
     * algorithm uses any provided instant or extent(start value used) list values
     * and looks at the total range of all interval values creating a tick at the
     * minimum interval for the total range. See the tests for examples.
     * @param {array|ol.Map} layersWithTime
     * @returns array of ticks
     */
    function computeTicks(layersWithTime) {
        // allow a map to be passed in
        if (!angular.isArray(layersWithTime)) {
            var storyMap = layersWithTime;
            layersWithTime = storyMap.getStoryLayers().getArray().filter(function(l) {
                var times = l.get('times');
                /*jshint eqnull:true */
                return times != null;
            });
            layersWithTime.push(storyMap.storyPinsLayer);
            layersWithTime.push(storyMap.storyBoxesLayer);
        }
        var ticks = {};
        var totalRange = null;
        var intervals = [];
        function addTick(add) {
            add = stutils.getTime(add);
            if (add !== null && ! (add in ticks)) {
                ticks[add] = 1;
            }
        }
        layersWithTime.forEach(function(l) {
            var times = l.get('times');
            var range;
            if (angular.isArray(times)) {
                // an array of instants or extents
                range = stutils.computeRange(times);
                if (times.length) {
                    if (stutils.isRangeLike(times[0])) {
                        times.forEach(function(r) {
                            addTick(r.start);
                            if (totalRange === null) {
                                totalRange = stutils.createRange(r);
                            } else {
                                totalRange.extend(r);
                            }
                        });
                    } else {
                        times.forEach(function(r) {
                            addTick(r);
                        });
                    }
                }
                // add a tick at the end to ensure we get there
                /*jshint eqnull:true */
                if (range.end != null) {
                    addTick(range.end);
                }
            } else if (times) {
                // a interval (range+duration)
                range = times;
                intervals.push(times);
            }
            if (totalRange === null) {
                // copy, will be modifying
                totalRange = stutils.createRange(range);
            } else {
                totalRange.extend(range);
            }
        });
        if (intervals.length) {
            intervals.sort(function(a, b) {
                return a.interval - b.interval;
            });
            var smallest = intervals[0];
            var start = totalRange.start;
            while (start <= totalRange.end) {
                addTick(start);
                start = smallest.offset(start);
            }
        }
        ticks = Object.getOwnPropertyNames(ticks).map(function(t) {
            return parseInt(t);
        });
        return ticks.sort(function(a, b) {
            return a - b;
        });
    }

    function TimeControlsManager($log, $rootScope, StoryPinLayerManager, MapManager) {
        this.timeControls = null;
        var timeControlsManager = this;

        function maybeCreateTimeControls(update) {
            if (timeControlsManager.timeControls !== null) {
                if (update) {
                    var values = update();
                    if (values) {
                        timeControlsManager.timeControls.update(values);
                    }
                }
                return;
            }
            var range = computeTicks(MapManager.storyMap);
            if (range.length) {
                var annotations = StoryPinLayerManager.storyPins;
                timeControlsManager.timeControls = storytools.core.time.create({
                    annotations: annotations,
                    storyMap: MapManager.storyMap,
                    storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                    data: range,
                    mode: MapManager.storyMap.mode,
                    tileStatusCallback: function(remaining) {
                        $rootScope.$broadcast('tilesLoaded', remaining);
                    },
                    chapterCount: MapManager.chapterCount
                });
                timeControlsManager.timeControls.on('rangeChange', function(range) {
                    timeControlsManager.currentRange = range;
                    $rootScope.$broadcast('rangeChange', range);
                });
            }
        }

        MapManager.storyMap.getStoryLayers().on('change:length', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length >= 0) {
                    return {
                        storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                        data: range
                    };
                }
            });
        });
        var pinsLayer = MapManager.storyMap.storyPinsLayer;
        var boxesLayer = MapManager.storyMap.storyBoxesLayer;
        pinsLayer.on('change:features', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length) {
                    return {
                        storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                        annotations: pinsLayer.get("features"),
                        boxes: boxesLayer.get("features"),
                        data: range
                    };
                }
            });
        });

        boxesLayer.on('change:features', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length) {
                    return {
                        annotations: pinsLayer.get("features"),
                        data: range,
                        boxes: boxesLayer.get("features")
                    };
                }
            });
        });

        maybeCreateTimeControls();
    }

    module.constant('TimeControlsManager', TimeControlsManager);

    module.service('TimeMachine', function() {
        return {
            computeTicks: computeTicks
        };
    });
})();

(function() {
    'use strict';
    var module = angular.module('storytools.core.mapstory.localStorageSvc', []);

    module.service('stLocalStorageSvc', ["$http", function($http) {
        function path(mapid) {
            return '/maps/' + mapid;
        }

        var localStorageHandler = {};

        localStorageHandler.get = function(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? {} : angular.fromJson(saved);
            return saved;
        };

        localStorageHandler.set = function(mapConfig) {
            localStorage.setItem(path(mapConfig.id), angular.toJson(mapConfig));
        };

        localStorageHandler.list = function() {
            var maps = [];
            var pattern = new RegExp('/maps/(\\d+)$');
            Object.getOwnPropertyNames(localStorage).forEach(function(key) {
                var match = pattern.exec(key);
                if (match) {
                    // name/title eventually
                    maps.push({
                        id: match[1]
                    });
                }
            });
            return maps;
        };

        localStorageHandler.nextId = function() {
            var lastId = 0;
            var existing = localStorageHandler.list().map(function(m) {
                return m.id;
            });
            existing.sort();
            if (existing.length) {
                lastId = parseInt(existing[existing.length - 1]);
            }
            return lastId + 1;
        };

        return {
            listMaps: function() {
                return localStorageHandler.list();
            },
            loadConfig: function(mapid) {
                return localStorageHandler.get(mapid);
            },
            saveConfig: function(mapConfig) {
                if (!angular.isDefined(mapConfig.id)) {
                    mapConfig.id = localStorageHandler.nextId();
                }
                localStorageHandler.set(mapConfig);
            }
        };
    }]);
})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.mapstory.remoteStorageSvc', []);

    module.factory('stRemoteStorageSvc', ["$q", "$http", function($q, $http) {

    this.save = function(map_config) {

      // @TODO: Update window.config and save to server

    };
  }]);
})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.mapstory.services', [
        'storytools.core.mapstory.localStorageSvc',
        'storytools.core.mapstory.remoteStorageSvc'
    ]);
})();
