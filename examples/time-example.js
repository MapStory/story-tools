/* global ol, angular, window, $, timeControls */
'use strict';

(function () {

    var module = angular.module('timeControls', [
        'storytools.core.time',
        'storytools.examples.common'
    ]);

    module.controller('timeExample', function ($scope, stTimeControlsFactory, mapFactory) {
        var self = this;
        var map = mapFactory.create();
        this.playbackOptions = {
            mode: 'instant',
            fixed: false
        };
        this.layerName = '';
        this.timeControls = null;
        $scope.$on('tilesLoaded', function(evt, remaining) {
            $scope.$apply(function () {
                self.tilesRemaining = remaining;
            });
        });
        this.addLayer = function () {
            this.loading = true;
            map.addLayer(this.layerName, this.asVector).then(function () {
                if (self.timeControls === null) {
                    self.timeControls = stTimeControlsFactory.create({
                        map: map.map,
                        playbackOptions: self.playbackOptions
                    });
                }
            }, function(problem) {
                alert(problem.data);
            }).finally(function() {
                self.loading = false;
            });
            this.layerName = null;
        };
    });

})();
