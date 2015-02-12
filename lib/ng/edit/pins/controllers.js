(function() {
    'use strict';

    var module = angular.module('storytools.edit.pins.controllers', []);

    // @todo reduce use of $scope, especially implicity present properties
    module.controller('pinsEditorController', function($scope, $timeout, StoryPin) {

        var drawingTools = {};
        var modifyTool;
        var ctrl = this;

        this.currentPin = null;
        this.editingCopy = new StoryPin();
        this.deleteStoryPin = function(pin) {
            this.storyPinLayerManager.pinsChanged([pin], 'delete');
        };
        this.saveStoryPin = function() {
            var currentPin = this.currentPin;
            if (currentPin instanceof StoryPin) {
                // existing storypin edit - update with copy containing changes
                currentPin.update(this.editingCopy);
                this.storyPinLayerManager.pinsChanged([currentPin], 'change');
            } else {
                // new storypin
                var storyPin = new StoryPin(this.editingCopy);
                ctrl.storyPinLayerManager.pinsChanged([storyPin], 'add');
            }
            this.currentPin = this.editingCopy = null;
            reset();
        };
        this.editStoryPin = function(pin) {
            reset();
            // currentPin is provided or a new object (see saveStoryPin)
            this.currentPin = pin || {};
            // make a copy - @todo geometry not cloned yet
            this.editingCopy = new StoryPin(this.currentPin);
            if (pin && pin.$feature) {
                ctrl.overlay.getFeatures().push(pin.$feature);
            }
        };
        function disableTools() {
            for (var t in drawingTools) {
                drawingTools[t].setActive(false);
            }
            if (modifyTool) {
                modifyTool.setActive(false);
            }
        }
        function reset() {
            disableTools();
            ctrl.overlay.getFeatures().clear();
            ctrl.activeDrawTool = null;
        }
        function onDrawStart() {
            ctrl.overlay.getFeatures().clear();
        }
        function onDrawEnd() {
            $timeout(function() {
                disableTools();
                var features = ctrl.overlay.getFeatures();
                ctrl.editingCopy.the_geom = features.getLength() > 0 ? features.item(0).getGeometry() : null;
            });
        }
        function createOrActivateTool(type) {
            disableTools();
            if (!drawingTools[type]) {
                drawingTools[type] = new ol.interaction.Draw({
                    features: ctrl.overlay.getFeatures(),
                    type: type
                });
                ctrl.overlay.getMap().addInteraction(drawingTools[type]);
                drawingTools[type].on('drawstart', onDrawStart);
                drawingTools[type].on('drawend', onDrawEnd);
            }
            drawingTools[type].setActive(true);
        }
        this.isEditing = function() {
            return this.currentPin instanceof StoryPin;
        };
        this.modify = function() {
            disableTools();
            if (!modifyTool) {
                modifyTool = new ol.interaction.Modify({
                    features: ctrl.overlay.getFeatures()
                });
                ctrl.overlay.getMap().addInteraction(modifyTool);
            }
            modifyTool.setActive(true);
        };
        $scope.$watch('pinsCtrl.activeDrawTool', function(neu) {
            if (angular.isString(neu)) {
                createOrActivateTool(neu);
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
