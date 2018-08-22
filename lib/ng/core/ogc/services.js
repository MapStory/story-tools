(function() {
  var module = angular.module("storytools.core.ogc.services", []);

  var featureInfoPerLayer_ = [];
  // valid values: 'layers', 'layer', 'feature', or ''
  var state_ = "";
  var selectedItem_ = null;
  var selectedItemMedia_ = null;
  var selectedLayer_ = null;
  var selectedItemProperties_ = null;
  var position_ = null;
  var enabled_ = true;
  var containerInstance_ = null;
  var overlay_ = null;

  module.provider("stFeatureInfoService", function() {
    this.$get = function($rootScope, MapManager, $compile) {
      rootScope_ = $rootScope;
      service_ = this;
      mapService_ = MapManager.storyMap;
      //translate_ = $translate;
      // httpService_ = $http;
      registerOnMapClick($rootScope, $compile);

      overlay_ = new ol.Overlay({
        insertFirst: false,
        element: document.getElementById("popup_test")
      });

      mapService_.getMap().addOverlay(overlay_);

      rootScope_.$on("rangeChange", function(evt, layer) {
        if (goog.isDefAndNotNull(service_.getSelectedLayer())) {
          service_.hide();
        }
      });

      return this;
    };

    function classifyItem(item) {
      var type = "";

      if (goog.isDefAndNotNull(item)) {
        if (item.properties) {
          type = "feature";
        } else if (item.features) {
          type = "layer";
        } else if (item.length && item[0].features) {
          type = "layers";
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
        if (type === "feature") {
          featureInfoPerLayer_.push({
            features: [item],
            layer: selectedLayer_
          });
        } else if (type === "layer") {
          featureInfoPerLayer_.push(item);
        } else if (type === "layers") {
          featureInfoPerLayer_ = item;
        } else {
          throw {
            name: "featureInfoBox",
            level: "High",
            message: "Expected layers, layer, or feature.",
            toString: function() {
              return this.name + ": " + this.message;
            }
          };
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
      if (type === "feature") {
        state_ = "feature";
        selectedItem_ = item;
      } else if (type === "layer") {
        if (item.features.length === 1) {
          state_ = "feature";
          selectedItem_ = item.features[0];
        } else {
          state_ = "layer";
          selectedItem_ = item;
        }
      } else if (type === "layers") {
        if (item.length === 1) {
          if (item[0].features.length === 1) {
            state_ = "feature";
            selectedItem_ = item[0].features[0];
          } else {
            state_ = "layer";
            selectedItem_ = item[0];
          }
        } else {
          state_ = "layers";
          selectedItem_ = item;
        }
      } else {
        throw {
          name: "featureInfoBox",
          level: "High",
          message:
            "Invalid item passed in. Expected layers, layer, or feature.",
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }
      var forceUpdate = true;

      //---- if selected item changed
      if (selectedItem_ !== selectedItemOld) {
        // -- select the geometry if it is a feature, clear otherwise
        // -- store the selected layer of the feature
        if (classifyItem(selectedItem_) === "feature") {
          selectedLayer_ = this.getSelectedItemLayer().layer;

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
          console.log(
            "---- selectedItemProperties_: ",
            selectedItemProperties_
          );

          // -- update the selectedItemMedia_
          //selectedItemMedia_ = service_.getSelectedItemMediaByProp(null);
          //console.log('---- selectedItemMedia_: ', selectedItemMedia_);
        }
      }

      if (goog.isDefAndNotNull(position)) {
        position_ = position;
        mapService_
          .getMap()
          .getOverlays()
          .array_[0].setPosition(position_);
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
      this.show(this.getPreviousState().item);
    };

    this.getPreviousState = function() {
      var state = null;
      var item = null;

      if (state_ === "feature") {
        var layer = this.getSelectedItemLayer();
        if (layer) {
          if (layer.features.length > 1) {
            state = "layer";
            item = layer;
          } else if (
            layer.features.length === 1 &&
            featureInfoPerLayer_.length > 1
          ) {
            item = featureInfoPerLayer_;
            state = "layers";
          }
        } else {
          throw {
            name: "featureInfoBox",
            level: "High",
            message: "Could not find feature!",
            toString: function() {
              return this.name + ": " + this.message;
            }
          };
        }
      } else if (state_ === "layer") {
        if (featureInfoPerLayer_.length > 1) {
          state = "layers";
          item = featureInfoPerLayer_;
        }
      }

      if (item !== null) {
        return {
          state: state,
          item: item
        };
      }

      return "";
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
      if (goog.isString(mediaItem) && mediaItem.indexOf("http") === -1) {
        url = configService_.configuration.fileserviceUrlTemplate.replace(
          "{}",
          mediaItem
        );
      }
      return url;
    };

    this.getSelectedItemMedia = function() {
      return selectedItemMedia_;
    };

    // Warning, returns new array objects, not to be 'watched' / bound. use getSelectedItemMedia instead.
    this.getSelectedItemMediaByProp = function(propName) {
      var media = null;

      if (
        classifyItem(selectedItem_) === "feature" &&
        goog.isDefAndNotNull(selectedItem_) &&
        goog.isDefAndNotNull(selectedItemProperties_)
      ) {
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
      return (
        lower.indexOf("fotos") === 0 ||
        lower.indexOf("photos") === 0 ||
        lower.indexOf("audios") === 0 ||
        lower.indexOf("videos") === 0
      );
    };

    this.getMediaTypeFromPropertyName = function(name) {
      var lower = name.toLowerCase();
      var type = null;
      if (lower.indexOf("fotos") === 0 || lower.indexOf("photos") === 0) {
        type = "photos";
      } else if (lower.indexOf("audios") === 0) {
        type = "audios";
      } else if (lower.indexOf("videos") === 0) {
        type = "videos";
      }
      return type;
    };

    this.getMediaUrlThumbnail = function(mediaItem) {
      var url = mediaItem;
      if (goog.isDefAndNotNull(mediaItem) && typeof mediaItem === "string") {
        var ext = mediaItem
          .split(".")
          .pop()
          .split("/")[0]; // handle cases; /file.ext or /file.ext/endpoint
        if (supportedVideoFormats_.indexOf(ext) >= 0) {
          url = service_.getMediaUrlDefault();
        } else {
          url = service_.getMediaUrl(mediaItem);
        }
      }
      return url;
    };

    this.getMediaUrlDefault = function() {
      return "/static/maploom/assets/media-default.png";
    };

    this.getMediaUrlError = function() {
      return "/static/maploom/assets/media-error.png";
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
      mapService_
        .getMap()
        .getOverlays()
        .array_[0].setPosition(undefined);
    };
  });

  function registerOnMapClick($rootScope, $compile) {
    mapService_.getMap().on("singleclick", function(evt) {
      // Overlay clones the element so we need to compile it after it is cloned so that ng knows about it
      if (!goog.isDefAndNotNull(containerInstance_)) {
        containerInstance_ = mapService_
          .getMap()
          .getOverlays()
          .array_[0].getElement();
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
          var url = source.getGetFeatureInfoUrl(
            evt.coordinate,
            view.getResolution(),
            view.getProjection(),
            {
              INFO_FORMAT: "application/json",
              FEATURE_COUNT: 5
            }
          );

          //Local Mod for testing
          //url = url.split('https://mapstory.org')[1];

          fetch(url).then(
            rawResponse => {
              if (!rawResponse.ok) {
                getFeatureInfoCompleted();
                return;
              }
              rawResponse.json().then(response => {
                var layerInfo = {};
                layerInfo.features = response.data.features;

                if (
                  layerInfo.features &&
                  layerInfo.features.length > 0 &&
                  goog.isDefAndNotNull(layers[index])
                ) {
                  layerInfo.layer = layers[index];
                  goog.array.insert(infoPerLayer, layerInfo);
                }
                getFeatureInfoCompleted();
              });
            },
            function(reject) {
              getFeatureInfoCompleted();
            }
          );
        }
      });
    });
  }
})();
