(function() {
    'use strict';

    var module = angular.module('storytools.edit.pins.controllers', []);

    // @todo reduce use of $scope, especially implicity present properties
    module.controller('pinsEditorController', function($scope, $timeout, StoryPin) {

        var drawingTools = {};
        var ctrl = this;

        this.currentPin = null;
        this.editingCopy = new StoryPin();
        this.deleteStoryPin = function(pin) {
            this.storyPinLayerManager.pinsChanged([pin], 'delete');
        };
        this.saveStoryPin = function() {
            var currentPin = this.currentPin;
            var changes = this.editingCopy.getProperties();
            if (currentPin instanceof StoryPin) {
                // existing storypin edit - update with copy containing changes
                currentPin.setProperties(changes);
                this.storyPinLayerManager.pinsChanged([currentPin], 'change');
            } else {
                // new storypin
                var storyPin = new StoryPin(changes);
                ctrl.storyPinLayerManager.pinsChanged([storyPin], 'add');
            }
            this.currentPin = this.editingCopy = null;
            reset();
        };
        this.editStoryPin = function(pin) {
            reset();
            // currentPin is provided or a new object (see saveStoryPin)
            this.currentPin = pin;
            this.editingCopy = new StoryPin(this.currentPin ? this.currentPin.getProperties() : {});
            if (pin && pin.getGeometry()) {
                ctrl.overlay.getFeatures().push(pin);
                var extent = pin.getGeometry().getExtent();
                var center = ol.extent.getCenter(extent);
                ctrl.overlay.getMap().getView().setCenter(center);
            }
        };
        this.deleteGeometry = function() {
            this.editingCopy.setGeometry(null);
            reset();
        };
        function disableTools() {
            for (var t in drawingTools) {
                drawingTools[t].setActive(false);
            }
        }
        function reset() {
            ctrl.activeDrawTool = null;
            ctrl.overlay.getFeatures().clear();
        }
        function onDrawStart() {
            ctrl.overlay.getFeatures().clear();
        }
        function onDrawEnd() {
            $timeout(function() {
                ctrl.activeDrawTool = null;
                var features = ctrl.overlay.getFeatures();
                ctrl.editingCopy.setGeometry(features.getLength() > 0 ? features.item(0).getGeometry() : null);
            });
        }
        function createOrActivateTool(type) {
            disableTools();
            if (!drawingTools[type]) {
                if (type == 'Modify') {
                    drawingTools[type] = new ol.interaction.Modify({
                        features: ctrl.overlay.getFeatures()
                    });
                } else {
                    drawingTools[type] = new ol.interaction.Draw({
                        features: ctrl.overlay.getFeatures(),
                        type: type
                    });
                    drawingTools[type].on('drawstart', onDrawStart);
                }
                ctrl.overlay.getMap().addInteraction(drawingTools[type]);
                drawingTools[type].on('drawend', onDrawEnd);
            }
            drawingTools[type].setActive(true);
        }
        this.isEditing = function() {
            return this.currentPin instanceof StoryPin;
        };
        $scope.$watch('pinsCtrl.activeDrawTool', function(neu, old) {
            if (angular.isString(neu)) {
                createOrActivateTool(neu);
            } else {
                disableTools();
            }
        });
        $scope.$on('$destroy', function() {
            for (var t in drawingTools) {
                var tool = drawingTools[t];
                tool.setActive(false);
                ctrl.overlay.getMap().removeInteraction(tool);
            }
        });
    });

    module.controller('pinEditorController', function($scope) {
        $scope.$watch(function() {
            return $scope.pinsCtrl.editingCopy;
        }, function(neu, old) {
            $scope.storyPin = neu;
        });
        this.isFormValid = function() {
            return $scope.pinForm.$valid;
        };
        this.finish = function() {
            var result = $scope.storyPin;
            $scope.storyPin = null;
            return result;
        };
    });
})();
