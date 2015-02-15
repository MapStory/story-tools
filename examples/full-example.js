'use strict';

(function() {

    var module = angular.module('fullExample', [
        'storytools.examples.common'
    ]);

    module.controller('exampleController', function($scope, mapFactory, TimeControlsManager,
        styleUpdater, loadMapDialog) {
        var map = mapFactory.create();

        var timeControlsManager = new TimeControlsManager({
            mode: map.mode,
            map: map.map,
            pinsLayerManager: map.storyPinLayerManager
        });
        $scope.map = map;
        $scope.timeControlsManager = timeControlsManager;

        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        $scope.saveMap = function() {
            map.saveMap();
        };
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };
        $scope.showLoadMapDialog = function() {
            var promise = loadMapDialog.show();
            promise.then(function(result) {
                var options = {};
                if (result.mapstoryMapId) {
                    options.url = '/maps/' + result.mapstoryMapId + "/data/";
                } else if (result.localMapId) {
                    options.id = result.localMapId;
                }
                $scope.map.loadMap(options);
            });
        };

    });
})();
