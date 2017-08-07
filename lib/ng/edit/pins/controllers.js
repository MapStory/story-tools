(function() {
  "use strict";

  var module = angular.module("storytools.edit.pins.controllers", []);

  module.controller("pinsEditorController", function(
    $scope,
    $timeout,
    StoryPin,
    StoryPinLayerManager,
    MapManager
  ) {
    var drawingTools = {};
    var ctrl = this;

    this.currentPin = null;
    this.editingCopy = new StoryPin();
    this.StoryPinLayerManager = StoryPinLayerManager;
    this.deleteStoryPin = function(pin) {
      StoryPinLayerManager.pinsChanged([pin], "delete");
    };
    this.saveStoryPin = function() {
      console.log("!DJA CURRENT PIN === >", this.currentPin);
      var currentPin = this.currentPin;
      var changes = this.editingCopy.getProperties();
      if (currentPin instanceof StoryPin) {
        // existing storypin edit - update with copy containing changes
        currentPin.setProperties(changes);
        StoryPinLayerManager.pinsChanged([currentPin], "change");
      } else {
        // new storypin
        var storyPin = new StoryPin(changes);
        StoryPinLayerManager.pinsChanged([storyPin], "add");
      }
      this.currentPin = this.editingCopy = null;
      reset();
    };
    this.editStoryPin = function(pin) {
      reset();
      // currentPin is provided or a new object (see saveStoryPin)
      this.currentPin = pin;
      this.editingCopy = new StoryPin(
        this.currentPin ? this.currentPin.getProperties() : {}
      );
      if (pin && pin.getGeometry()) {
        getFeatures().push(pin);
        var extent = pin.getGeometry().getExtent();
        var center = ol.extent.getCenter(extent);
        getMap().getView().setCenter(center);
      }
    };
    this.deleteGeometry = function() {
      this.editingCopy.setGeometry(null);
      reset();
    };
    function getMap() {
      return MapManager.storyMap.getMap();
    }
    function getFeatures() {
      var features = MapManager.storyMap.storyPinsLayer
        .getLayer()
        .getSource()
        .getFeatures();
      console.log("!DJA features === >", features);
      return features;
    }

    function getSource() {
      var source = MapManager.storyMap.storyPinsLayer.getLayer().getSource();
      return source;
    }
    function disableTools() {
      for (var t in drawingTools) {
        drawingTools[t].setActive(false);
      }
    }
    function reset() {
      ctrl.activeDrawTool = null;
      getSource().clear();
    }
    function onDrawStart() {
      getSource().clear();
    }
    function onDrawEnd() {
      $timeout(function() {
        ctrl.activeDrawTool = null;
        var features = getFeatures();
        var geom = features.length > 0 ? features.item(0).getGeometry() : null;
        ctrl.editingCopy.setGeometry(geom);
        // if there is a geom but in_map hasn't been set, do it
        if (geom && ctrl.editingCopy.in_map === null) {
          ctrl.editingCopy.in_map = true;
        }
      });
    }
    function createOrActivateTool(type) {
      disableTools();
      if (!drawingTools[type]) {
        if (type == "Modify") {
          drawingTools[type] = new ol.interaction.Modify({
            features: getFeatures()
          });
        } else {
          drawingTools[type] = new ol.interaction.Draw({
            features: getFeatures(),
            type: type
          });
          drawingTools[type].on("drawstart", onDrawStart);
        }
        getMap().addInteraction(drawingTools[type]);
        drawingTools[type].on("drawend", onDrawEnd);
      }
      drawingTools[type].setActive(true);
    }
    this.isEditing = function() {
      return this.currentPin instanceof StoryPin;
    };
    // because bootstrap-ui btn-radio wants to use ng-model, expose this
    // as a property to allow action on change
    Object.defineProperty(this, "activeDrawTool", {
      get: function() {
        return this._activeDrawTool;
      },
      set: function(val) {
        this._activeDrawTool = val;
        if (angular.isString(val)) {
          createOrActivateTool(val);
        } else {
          disableTools();
        }
      }
    });
    $scope.$on("$destroy", function() {
      for (var t in drawingTools) {
        var tool = drawingTools[t];
        tool.setActive(false);
        getMap().removeInteraction(tool);
      }
    });
  });

  module.controller("pinEditorController", function($scope) {
    $scope.$watch(
      function() {
        return $scope.pinsCtrl.editingCopy;
      },
      function(neu, old) {
        $scope.storyPin = neu;
      }
    );
    function check_range() {
      var pin = $scope.pinsCtrl.editingCopy;
      var valid = true;
      if (pin) {
        /*jshint eqnull:true */
        if (pin.start_time != null && pin.end_time != null) {
          valid = pin.start_time <= pin.end_time;
        }
      }
      //$scope.pinForm.$setValidity('range', valid); !DJA test
    }
    $scope.$watch("pinsCtrl.editingCopy.start_time", check_range);
    $scope.$watch("pinsCtrl.editingCopy.end_time", check_range);
    this.isFormValid = function() {
      //return $scope.pinForm.$valid; !DJA test
    };
    this.finish = function() {
      var result = $scope.storyPin;
      $scope.storyPin = null;
      return result;
    };
  });
})();
