(function() {
    'use strict';

    var module = angular.module('storytools.edit.pins.controllers', []);

    // @todo reduce use of $scope, especially implicity present properties
    module.controller('pinsEditorController', function($scope, $timeout, stStoryPins) {

        var drawingTools = {};
        var modifyTool;
        var editedGeometry;
        var ctrl = this;

        this.storyPins = [];
        this.addStoryPin = function(pin) {
            pin = angular.copy(pin);
            var feature = stStoryPins.createFeature(pin, $scope.map.map.getView().getProjection());
            feature.setGeometry(editedGeometry);
            this.targetLayer.getSource().addFeature(feature);
            this.storyPins.push(pin);
            $scope.overlay.getFeatures().clear();
        };

        function onDrawStart() {
            editedGeometry = null;
            $scope.overlay.getFeatures().clear();
        }
        function onDrawEnd() {
            $timeout(function() {
                for (var t in drawingTools) {
                    drawingTools[t].setActive(false);
                }
                var features = ctrl.overlay.getFeatures();
                editedGeometry = features.getLength() > 0 ? features.item(0).getGeometry() : null;
            });
        }
        function createOrActivateTool(type) {
            if (modifyTool) {
                modifyTool.setActive(false);
            }
            for (var t in drawingTools) {
                drawingTools[t].setActive(false);
            }
            if (!drawingTools[type]) {
                drawingTools[type] = new ol.interaction.Draw({
                    features: $scope.overlay.getFeatures(),
                    type: type
                });
                $scope.overlay.getMap().addInteraction(drawingTools[type]);
                drawingTools[type].on('drawstart', onDrawStart);
                drawingTools[type].on('drawend', onDrawEnd);
            }
            drawingTools[type].setActive(true);
        }
        this.modify = function() {
            for (var t in drawingTools) {
                drawingTools[t].setActive(false);
            }
            if (!modifyTool) {
                modifyTool = new ol.interaction.Modify({
                    features: $scope.overlay.getFeatures()
                });
                $scope.overlay.getMap().addInteraction(modifyTool);
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
                $scope.overlay.getMap().removeInteraction(tool);
            }
        });
    });

    module.controller('pinEditorController', function($scope) {
        function newStoryPin() {
            $scope.storyPin = {
                isNew: true
            };
        }
        this.isFormValid = function() {
            return $scope.pinForm.$valid;
        };
        this.finish = function() {
            var result = $scope.storyPin;
            newStoryPin();
            return result;
        };

        if (!$scope.storyPin) {
            newStoryPin();
        }
    });
})();
