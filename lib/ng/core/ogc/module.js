(function() {
  "use strict";

  var module = angular.module("storytools.core.ogc", [
    "storytools.core.ogc.directives",
    "storytools.core.ogc.services"
  ]);

  // @todo - provisional default story pins style
  var defaultStyle = [
    new ol.style.Style({
      fill: new ol.style.Fill({ color: "rgba(255, 0, 0, 0.1)" }),
      stroke: new ol.style.Stroke({ color: "red", width: 1 }),
      image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({ color: "rgba(255, 0, 0, 0.1)" }),
        stroke: new ol.style.Stroke({ color: "red", width: 1 })
      })
    })
  ];

  var enabled_ = true;

  $("#map .metric-scale-line").css("bottom", "-=40px");
  $("#map .imperial-scale-line").css("bottom", "-=40px");
  $("#map .nautical-scale-line").css("bottom", "-=40px");
  $("#map .ol-mouse-position").css("bottom", "-=40px");
  $("#switch-coords-border").css("bottom", "-=40px");

  var nauticalScale = new ol.control.ScaleLine({
    className: "nautical-scale-line ol-scale-line",
    units: ol.control.ScaleLineUnits.NAUTICAL,
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
          this.element_.style.display = "none";
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
      var suffix = "nm";

      var nauticalMiles = 20;
      var width = Math.round(nauticalMiles / pointResolution);

      var html = nauticalMiles + " " + suffix;
      if (this.renderedHTML_ != html) {
        this.innerElement_.innerHTML = html;
        this.renderedHTML_ = html;
      }

      //If the scale is wider than 60% the screen, hide it
      //If it's smaller than 15 pixels, hide it as the text won't fit inside the scale
      if (width > mapEvent.frameState.size[0] * 0.6 || width < 15) {
        this.element_.style.display = "none";
        this.renderedVisible_ = false;
        return;
      }

      if (this.renderedWidth_ != width) {
        this.innerElement_.style.width = width + "px";
        this.renderedWidth_ = width;
      }

      if (!this.renderedVisible_) {
        this.element_.style.display = "";
        this.renderedVisible_ = true;
      }
    }
  });

  function StoryMap(data) {
    ol.Object.call(this, data);
    this.map_ = new ol.Map({
      target: data.target,
      pixelRatio: 1,
      controls: ol.control.defaults().extend([
        /*new ol.control.ZoomSlider(),*/
        new ol.control.MousePosition({
          projection: "EPSG:4326",
          coordinateFormat: ol.coordinate.toStringHDMS
        }),
        /*
      new ol.control.ScaleLine({className: 'metric-scale-line ol-scale-line',
        units: ol.control.ScaleLineUnits.METRIC}),
      */
        new ol.control.ScaleLine({
          className: "imperial-scale-line ol-scale-line",
          units: ol.control.ScaleLineUnits.IMPERIAL
        })
        /*,
            nauticalScale
            */
      ])
    });
    this.overlay = new ol.layer.Vector({
      map: this.map_,
      style: defaultStyle
    });

    if (data.overlayElement) {
      this.map_.addOverlay(
        new ol.Overlay({
          element: data.overlayElement,
          stopEvent: true
        })
      );
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
      timeAttribute: "start_time",
      endTimeAttribute: "end_time",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: defaultStyle
      })
    });
    this.storyPinsLayer = new StoryLayer({
      timeAttribute: "start_time",
      endTimeAttribute: "end_time",
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
    this.set("baselayer", baseLayer);
    this.map_.getLayers().forEach(function(lyr) {
      if (lyr.get("group") === "background") {
        this.map_.removeLayer(lyr);
      }
    }, this);
    this.map_.getLayers().insertAt(0, this.get("baselayer"));
  };

  StoryMap.prototype.addStoryLayer = function(storyLayer) {
    storyLayer.storyMap_ = this;
    this.storyLayers_.push(storyLayer);
    // keep pins layer on top
    var idx = this.map_.getLayers().getLength(),
      me = this;
    this.map_.getLayers().forEach(function(sl) {
      if (sl === me.storyPinsLayer || sl instanceof ol.layer.Vector) {
        idx -= 1;
      }
    });
    this.map_.getLayers().insertAt(idx, storyLayer.getLayer());
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
      this.map_.beforeRender(
        ol.animation.pan({
          duration: this.animationDuration_,
          source: view.getCenter()
        })
      );
      view.setCenter(center);
      this.map_.beforeRender(
        ol.animation.zoom({
          resolution: view.getResolution(),
          duration: this.animationDuration_
        })
      );
      view.setZoom(zoom);
    }
  };

  StoryMap.prototype.setAllowPan = function(allowPan) {
    this.map_.getInteractions().forEach(function(i) {
      if (
        i instanceof ol.interaction.KeyboardPan ||
        i instanceof ol.interaction.DragPan
      ) {
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
      if (
        i instanceof ol.interaction.DoubleClickZoom ||
        i instanceof ol.interaction.PinchZoom ||
        i instanceof ol.interaction.DragZoom ||
        i instanceof ol.interaction.MouseWheelZoom
      ) {
        i.setActive(allowZoom);
      }
    });
  };

  StoryMap.prototype.toggleStoryLayer = function(storyLayer) {
    var layer = storyLayer.getLayer();
    storyLayer.set("visibility", !layer.getVisible());
    layer.setVisible(!layer.getVisible());
  };

  module.constant("StoryMap", StoryMap);

  function EditableStoryMap(data) {
    StoryMap.call(this, data);
  }

  EditableStoryMap.prototype = Object.create(StoryMap.prototype);
  EditableStoryMap.prototype.constructor = EditableStoryMap;

  module.constant("EditableStoryMap", EditableStoryMap);

  EditableStoryMap.prototype.getState = function() {
    var config = {};
    config.map = {
      center: this.map_.getView().getCenter(),
      projection: this.map_
        .getView()
        .getProjection()
        .getCode(),
      zoom: this.map_.getView().getZoom(),
      layers: []
    };
    var mapId = this.get("id");
    if (mapId >= 0) {
      config.id = mapId;
    }
    var baseLayer = this.get("baselayer");
    if (baseLayer) {
      var baseLayerState = this.get("baselayer").get("state");
      baseLayerState.group = "background";
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
    var layerParams = {};

    if (data.times && storytools.core.time.utils.isRangeLike(data.times)) {
      data.times = new storytools.core.time.utils.Interval(data.times);
    }
    ol.Object.call(this, data);
    var layer;
    if (this.get("type") === "VECTOR") {
      var vectorSource = new ol.source.Vector({});

      if (data.cluster) {
        var clusterSource = new ol.source.Cluster({
          distance: 20,
          source: vectorSource
        });
        layerParams = {
          source: clusterSource,
          style: data.style || defaultStyle
        };
      } else {
        layerParams = {
          source: vectorSource,
          style: data.style || defaultStyle
        };
      }

      layer = new ol.layer.Vector(layerParams);

      if (data.animate) {
        window.setInterval(function() {
          vectorSource.dispatchEvent("change");
        }, 1000 / 75);
      }
    } else if (this.get("type") === "HEATMAP") {
      layer = new ol.layer.Heatmap({
        radius: data.style.radius,
        opacity: data.style.opacity,
        source: new ol.source.Vector()
      });
    } else if (this.get("type") === "WMS") {
      var config = {
        useOldAsInterimTiles: true
      };
      if (this.get("singleTile") === true) {
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
    var name = this.get("name");
    var times = this.get("times");
    var singleTile = this.get("singleTile");
    var params = this.get("params") || {
      LAYERS: name,
      VERSION: "1.1.0",
      TILED: true
    };
    if (times) {
      params.TIME = new Date(times.start || times[0]).toISOString();
    }
    if (singleTile) {
      layer.setSource(
        new ol.source.ImageWMS({
          params: params,
          url: this.get("url"),
          serverType: "geoserver"
        })
      );
    } else {
      var tileGrid,
        resolutions = this.get("resolutions"),
        bbox = this.get("bbox");
      if (resolutions && bbox) {
        tileGrid = new ol.tilegrid.TileGrid({
          extent: bbox,
          resolutions: resolutions
        });
      }
      // @todo use urls for subdomain loading
      layer.setSource(
        new ol.source.TileWMS({
          url: this.get("url"),
          params: params,
          tileGrid: tileGrid,
          serverType: "geoserver"
        })
      );
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
      var idx = map
        .getLayers()
        .getArray()
        .indexOf(this.layer_);
      map.getLayers().setAt(idx, layer);
    }
    this.layer_ = layer;
  };

  module.constant("StoryLayer", StoryLayer);

  function EditableStoryLayer(data) {
    StoryLayer.call(this, data);
  }

  EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
  EditableStoryLayer.prototype.constructor = EditableStoryLayer;

  module.constant("EditableStoryLayer", EditableStoryLayer);

  module.service("stAnnotateLayer", function($rootScope, $http, $q) {
    return {
      loadCapabilities: function(storyLayer, map) {
        var request = "GetCapabilities",
          service = "WMS";
        // always use the virtual service for GetCapabilities
        var url = storyLayer.get("url");
        if (url === "/geoserver/wms") {
          var name = storyLayer.get("name");
          var parts = name.split(":");
          url = url.replace(
            "/geoserver",
            "/geoserver/" + parts[0] + "/" + parts[1]
          );
        }
        url = url.replace("http:", "");
        $rootScope.$broadcast("layer-status", {
          name: storyLayer.get("name"),
          phase: "capabilities",
          status: "loading"
        });

        return $http({
          method: "GET",
          url: url,
          params: {
            REQUEST: request,
            SERVICE: service,
            VERSION: "1.3.0",
            TILED: true
          }
        })
          .then(function(response) {
            var parser = new ol.format.WMSCapabilities();
            var caps = parser.read(response.data);
            var layer = caps.Capability.Layer.Layer[0];
            if (layer.EX_GeographicBoundingBox) {
              var extent = ol.proj.transformExtent(
                  layer.EX_GeographicBoundingBox,
                  'EPSG:4326',
                  map.getView().getProjection()
              );
              storyLayer.set("extent", extent);
            }
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(
              caps
            );
            var name = storyLayer.get("name");
            if (name in found) {
              storyLayer.set("times", found[name]);
            }

            $rootScope.$broadcast("layer-status", {
              name: storyLayer.get("name"),
              phase: "capabilities",
              status: "done"
            });
          })
          .catch(function(response) {});
      },
      describeFeatureType: function(storyLayer) {
        var me = this;
        var request = "DescribeFeatureType",
          service = "WFS";
        var id = storyLayer.get("id");
        $rootScope.$broadcast("layer-status", {
          name: storyLayer.get("name"),
          phase: "featureType",
          status: "loading"
        });
        return $http
          .get(storyLayer.get("url").replace("http:", ""), {
            params: {
              SERVICE: service,
              VERSION: "1.0.0",
              REQUEST: request,
              TYPENAME: id,
              outputFormat: "application/json"
            }
          })
          .then(function(response) {
            var parser = storytools.edit
              ? new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType()
              : null;
            if (parser) {
              var layerInfo = parser.parseResult(response.data);
              if (layerInfo.timeAttribute) {
                storyLayer.set("timeAttribute", layerInfo.timeAttribute);
              } else if (storyLayer.get("timeEndpoint")) {
                me.getTimeAttribute(storyLayer);
              }
              var parts = id.split(":");
              storyLayer.set("typeName", id);
              storyLayer.set("featurePrefix", parts[0]);
              storyLayer.set("featureNS", layerInfo.featureNS);
              storyLayer.set("geomType", layerInfo.geomType);
              storyLayer.set("attributes", layerInfo.attributes);
            }
            $rootScope.$broadcast("layer-status", {
              name: storyLayer.get("name"),
              phase: "featureType",
              status: "done"
            });
          })
          .catch(function(response) {});
      },
      getTimeAttribute: function(storyLayer) {
        var me = this;
        return $http({
          method: "GET",
          url: storyLayer.get("timeEndpoint")
        })
          .then(function(response) {
            storyLayer.set("timeAttribute", response.data.attribute);
            if (data.endAttribute) {
              storyLayer.set("endTimeAttribute", response.data.endAttribute);
            }
          })
          .catch(function(response) {});
      },
      getStyleName: function(storyLayer) {
        if (storyLayer.get("canStyleWMS")) {
          var me = this;
          return $http({
            method: "GET",
            url:
              storyLayer.get("path") +
              "rest/layers/" +
              storyLayer.get("id") +
              ".json"
          })
            .then(function(response) {
              storyLayer.set(
                "styleName",
                response.data.layer.defaultStyle.name
              );
            })
            .catch(function(response) {});
        } else {
          return $q.when("");
        }
      },
      getFeatures: function(storyLayer, map) {
        var name = storyLayer.get("id");
        var cql = storyLayer.get("cql");
        var wfsUrl =
          storyLayer.get("url") +
          "?service=WFS&version=1.1.0&request=GetFeature&typename=" +
          name +
          "&outputFormat=application/json" +
          "&srsName=" +
          map
            .getView()
            .getProjection()
            .getCode();

        if (cql) {
          wfsUrl += "&cql_filter=" + cql;
        }

        wfsUrl += "&t=" + new Date().getTime();

        $rootScope.$broadcast("layer-status", {
          name: storyLayer.get("name"),
          phase: "features",
          status: "loading"
        });

        return $http({
          method: "GET",
          url: wfsUrl
        })
          .then(function(response) {
            var layer = storyLayer.getLayer();
            var filter = storyLayer.get("filter");
            var features = new ol.format.GeoJSON().readFeatures(response.data);

            if (filter) {
              features = filter(features);
            }

            storyLayer.set("features", features);

            if (layer.getSource() instanceof ol.source.Cluster) {
              layer
                .getSource()
                .getSource()
                .clear(true);
              layer
                .getSource()
                .getSource()
                .addFeatures(features);
            } else if (layer.getSource() instanceof ol.source.Vector) {
              layer.getSource().clear(true);
              layer.getSource().addFeatures(features);
            }

            $rootScope.$broadcast("layer-status", {
              name: storyLayer.get("name"),
              phase: "features",
              status: "done"
            });
          })
          .catch(function(response) {});
      }
    };
  });

  module.service("stBaseLayerBuilder", function() {
    return {
      buildLayer: function(data) {
        if (data.type === "MapQuest") {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: "background",
            source: new ol.source.MapQuest({ layer: data.layer })
          });
        } else if (data.type === "ESRI") {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: "background",
            source: new ol.source.XYZ({
              attributions: [
                new ol.Attribution({
                  html:
                    'Tiles &copy; <a href="//services.arcgisonline.com/ArcGIS/' +
                    'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>'
                })
              ],
              url:
                "//server.arcgisonline.com/ArcGIS/rest/services/" +
                "NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            })
          });
        } else if (data.type === "HOT") {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: "background",
            source: new ol.source.OSM({
              attributions: [
                new ol.Attribution({
                  html:
                    'Tiles courtesy of <a href="//hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                }),
                ol.source.OSM.ATTRIBUTION
              ],
              crossOrigin: null,
              url: "//{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            })
          });
        } else if (data.type === "OSM") {
          return new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: "background",
            source: new ol.source.OSM()
          });
        } else if (data.type === "MapBox") {
          var layer = new ol.layer.Tile({
            state: data,
            name: data.title,
            title: data.title,
            group: "background"
          });
          var name = data.name;
          var urls = [
            "//a.tiles.mapbox.com/v1/mapbox.",
            "//b.tiles.mapbox.com/v1/mapbox.",
            "//c.tiles.mapbox.com/v1/mapbox.",
            "//d.tiles.mapbox.com/v1/mapbox."
          ];
          var tileUrlFunction = function(tileCoord, pixelRatio, projection) {
            var zxy = tileCoord;
            if (zxy[1] < 0 || zxy[2] < 0) {
              return "";
            }
            return (
              urls[Math.round(Math.random() * 3)] +
              name +
              "/" +
              zxy[0].toString() +
              "/" +
              zxy[1].toString() +
              "/" +
              zxy[2].toString() +
              ".png"
            );
          };
          layer.setSource(
            new ol.source.TileImage({
              crossOrigin: null,
              attributions: [
                new ol.Attribution({
                  html: /^world/.test(name) ? "<a href='//mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='//mapbox.com/tos'>Terms of Service</a>": "<a href='//mapbox.com'>MapBox</a> | <a href='//mapbox.com/tos'>Terms of Service</a>"
                })
              ],
              tileGrid: new ol.tilegrid.TileGrid({
                origin: [-128 * 156543.03390625, -128 * 156543.03390625],
                resolutions: [
                  156543.03390625,
                  78271.516953125,
                  39135.7584765625,
                  19567.87923828125,
                  9783.939619140625,
                  4891.9698095703125,
                  2445.9849047851562,
                  1222.9924523925781,
                  611.4962261962891,
                  305.74811309814453,
                  152.87405654907226,
                  76.43702827453613,
                  38.218514137268066,
                  19.109257068634033,
                  9.554628534317017,
                  4.777314267158508,
                  2.388657133579254,
                  1.194328566789627,
                  0.5971642833948135
                ]
              }),
              tileUrlFunction: tileUrlFunction
            })
          );
          return layer;
        } else if (data.type === "WMS") {
          return new ol.layer.Tile({
            group: "background",
            source: new ol.source.TileWMS({
              url: data.url,
              params: data.params
            })
          });
        } else {
          throw new Error("no type for : " + JSON.stringify(data));
        }
      }
    };
  });

  module.service("stEditableLayerBuilder", function(
    $q,
    stAnnotateLayer,
    stBaseLayerBuilder
  ) {
    return {
      buildEditableLayer: function(data, map) {
        var layer = new EditableStoryLayer(data);
        var deferred = $q.defer();
        var promises = [];
        // TODO add this back when we have WMS-C GetCaps
        var needsCaps = !(
          data.latlonBBOX && data.times
        ) /* && data.bbox && data.resolutions*/;
        if (needsCaps) {
          promises.push(stAnnotateLayer.loadCapabilities(layer, map));
        }
        var needsDFT = !data.attributes;
        if (needsDFT) {
          promises.push(stAnnotateLayer.describeFeatureType(layer));
        }
        if (
          (data.type === "VECTOR" || data.type === "HEATMAP") &&
          !data.features
        ) {
          promises.push(stAnnotateLayer.getFeatures(layer, map));
        } else {
          promises.push(stAnnotateLayer.getStyleName(layer));
        }
        $q.all(promises).then(
          function() {
            // this needs to be done here when everything is resolved
            if (layer.get("features")) {
              var times = layer.get("times");
              if (times) {
                var start = times.start || times[0];
                storytools.core.time.maps.filterVectorLayer(layer, {
                  start: start,
                  end: start
                });
              } else {
                layer
                  .getLayer()
                  .getSource()
                  .addFeatures(layer.get("features"));
              }
            } else {
              layer.setWMSSource();
            }
            deferred.resolve(layer);
          },
          function() {
            deferred.reject(arguments);
          }
        );
        return deferred.promise;
      }
    };
  });

  module.service("stLayerBuilder", function($q) {
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

  module.service("stStoryMapBaseBuilder", function(
    $rootScope,
    $compile,
    stBaseLayerBuilder
  ) {
    return {
      defaultMap: function(storymap) {
        storymap
          .getMap()
          .setView(
            new ol.View({ center: [0, 0], zoom: 3, minZoom: 3, maxZoom: 16 })
          );
        this.setBaseLayer(storymap, {
          title: "World Topo Map",
          type: "ESRI",
          name: "world-topo-map"
        });
      },
      setBaseLayer: function(storymap, data) {
        var baseLayer = stBaseLayerBuilder.buildLayer(data);
        storymap.setBaseLayer(baseLayer);
      }
    };
  });

  module.service("stStoryMapBuilder", function(
    $rootScope,
    $compile,
    stLayerBuilder,
    stStoryMapBaseBuilder
  ) {
    return {
      modifyStoryMap: function(storymap, data) {
        storymap.clear();
        var mapConfig = storytools.mapstory.MapConfigTransformer.MapConfigTransformer(
          data
        );
        if (mapConfig.id >= 0) {
          storymap.set("id", mapConfig.id);
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
          if (
            layerConfig.group === "background" &&
            layerConfig.visibility === true
          ) {
            stStoryMapBaseBuilder.setBaseLayer(storymap, layerConfig);
          } else {
            /*jshint loopfunc: true */
            stLayerBuilder
              .buildLayer(layerConfig, storymap.getMap())
              .then(function(sl) {
                // TODO insert at the correct index
                storymap.addStoryLayer(sl);
              });
          }
        }
        storymap.getMap().setView(
          new ol.View({
            center: mapConfig.map.center,
            zoom: mapConfig.map.zoom,
            minZoom: 3,
            maxZoom: 17
          })
        );
      }
    };
  });

  module.service("stEditableStoryMapBuilder", function(
    $rootScope,
    $compile,
    stStoryMapBaseBuilder,
    stEditableLayerBuilder
  ) {
    return {
      modifyStoryLayer: function(storylayer, newType) {
        var data = storylayer.getProperties();
        var storymap = storylayer.getStoryMap();
        data.type = newType ? newType : data.type === "WMS" ? "VECTOR" : "WMS";
        if (data.type === "WMS") {
          delete data.features;
        }
        return stEditableLayerBuilder
          .buildEditableLayer(data, storymap.getMap())
          .then(function(sl) {
            // sequence is important here, first change layer, then the type.
            storylayer.setLayer(sl.getLayer());
            storylayer.set("type", sl.get("type"));
          });
      },
      modifyStoryMap: function(storymap, data) {
        storymap.clear();
        var mapConfig = storytools.mapstory.MapConfigTransformer.MapConfigTransformer(
          data
        );
        if (mapConfig.id >= 0) {
          storymap.set("id", mapConfig.id);
          storymap.setMode(mapConfig.playbackMode);
          if (data.about !== undefined) {
            storymap.setStoryTitle(data.about.title);
            storymap.setStoryAbstract(data.about.abstract);
            storymap.setStoryOwner(data.about.owner);
          }
        }
        for (var i = 0, ii = mapConfig.map.layers.length; i < ii; ++i) {
          var layerConfig = mapConfig.map.layers[i];
          if (
            layerConfig.group === "background" &&
            layerConfig.visibility === true
          ) {
            stStoryMapBaseBuilder.setBaseLayer(storymap, layerConfig);
          } else {
            /*jshint loopfunc: true */
            stEditableLayerBuilder
              .buildEditableLayer(layerConfig, storymap.getMap())
              .then(function(sl) {
                // TODO insert at the correct index
                storymap.addStoryLayer(sl);
              });
          }
        }

        storymap.getMap().setView(
          new ol.View({
            center: mapConfig.map.center,
            zoom: mapConfig.map.zoom,
            projection: mapConfig.map.projection,
            minZoom: 3,
            maxZoom: 17
          })
        );
      }
    };
  });

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
      this.ani_opts = { duration: 250 };
    }

    this.container = document.createElement("div");
    this.container.className = "ol-popup";
    this.container.id = options.hasOwnProperty("id") ? options.id : "";

    this.closer = document.createElement("a");
    this.closer.className = "ol-popup-closer";
    this.closer.href = "#";
    this.container.appendChild(this.closer);

    var that = this;
    this.closer.addEventListener(
      "click",
      function(evt) {
        that.container.style.display = "none";
        that.closer.blur();
        evt.preventDefault();
      },
      false
    );

    this.content = document.createElement("div");
    this.content.className = "ol-popup-content";
    this.container.appendChild(this.content);

    ol.Overlay.call(this, {
      id: options.hasOwnProperty("id") ? options.id : "popup",
      element: this.container,
      positioning: options.hasOwnProperty("positioning") ? options.positioning : "top-left",
      stopEvent: options.hasOwnProperty("stopEvent") ? options.stopEvent : true,
      insertFirst: options.hasOwnProperty("insertFirst") ? options.insertFirst : true
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
    this.container.style.display = "block";
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

    var fromLeft = popPx[0] - tailOffsetLeft,
      fromRight = mapSize[0] - (popPx[0] + tailOffsetRight);

    var fromTop = popPx[1] - popSize.height + popOffset[1],
      fromBottom = mapSize[1] - (popPx[1] + tailHeight) - popOffset[1];

    var center = this.getMap()
        .getView()
        .getCenter(),
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
      this.getMap()
        .getView()
        .setCenter(this.getMap().getCoordinateFromPixel(newPx));
    }

    return this.getMap()
      .getView()
      .getCenter();
  };

  /**
     * Hide the popup.
     */
  ol.Overlay.Popup.prototype.hide = function() {
    this.container.style.display = "none";
    return this;
  };

  /**
     * Indicates if the popup is in open state
     */
  ol.Overlay.Popup.prototype.isOpened = function() {
    return this.container.style.display == "block";
  };
})();
