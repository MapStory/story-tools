(function() {
    'use strict';

    var module = angular.module('storytools.edit.pins.controllers', []);

    module.controller('pinEditorController',
        function($scope) {
            var me = this;
            me.drawingTools = {};
            me.onDrawStart = function() {
                $scope.overlay.getFeatures().clear();
            };
            me.onDrawEnd = function() {
                window.setTimeout(function() {
                    for (var t in me.drawingTools) {
                        me.drawingTools[t].setActive(false);
                    }
                }, 0);
            };
            me.createOrActivateTool = function(type) {
                if (me.modifyTool) {
                    me.modifyTool.setActive(false);
                }
                for (var t in me.drawingTools) {
                    me.drawingTools[t].setActive(false);
                }
                if (!me.drawingTools[type]) {
                    me.drawingTools[type] = new ol.interaction.Draw({
                        features: $scope.overlay.getFeatures(),
                        type: type
                    });
                    $scope.overlay.getMap().addInteraction(me.drawingTools[type]);
                    me.drawingTools[type].on('drawstart', me.onDrawStart, me);
                    me.drawingTools[type].on('drawend', me.onDrawEnd, me);
                }
                me.drawingTools[type].setActive(true);
            };
            $scope.modify = function() {
                for (var t in me.drawingTools) {
                    me.drawingTools[t].setActive(false);
                }
                if (!me.modifyTool) {
                    me.modifyTool = new ol.interaction.Modify({
                        features: $scope.overlay.getFeatures()
                    });
                    $scope.overlay.getMap().addInteraction(me.modifyTool);
                }
                me.modifyTool.setActive(true);
            };
            $scope.addPoint = function() {
                me.createOrActivateTool('Point');
            };
            $scope.addLine = function() {
                me.createOrActivateTool('LineString');
            };
            $scope.addPolygon = function() {
                me.createOrActivateTool('Polygon');
            };
            $scope.$watch('pinForm.$valid', function(neu) {
                $scope.onValidChange(neu);
            });
        });
})();
