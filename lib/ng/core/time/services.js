(function() {
    'use strict';

    var module = angular.module('storytools.core.time.services', []);

    function getTimes(map) {
        var times = null;
        map.getLayers().forEach(function(l) {
            var l_times = l.get('times');
            if (l_times) {
                if (angular.isArray(l_times)) {
                    l_times = storytools.core.time.utils.computeRange(l_times);
                }
                if (times === null) {
                    times = l_times;
                } else {
                    times.extend(l_times);
                }
            }
        });
        return times;
    }

    function maybeCreateTimeControls(timeControlsManager, options, update) {
        if (timeControlsManager.timeControls !== null) {
            if (update) {
                var values = update();
                if (values) {
                    timeControlsManager.timeControls.update(values);
                }
            }
            return;
        }
        var range = getTimes(options.map);
        if (range !== null && !range.isEmpty()) {
            var annotations = options.pinsLayerManager.storyPins;
            timeControlsManager.timeControls = storytools.core.time.create({
                annotations: annotations,
                map: options.map,
                data: range,
                mode: options.mode,
                playback: options.playbackOptions,
                tileStatusCallback: function(remaining) {
                    TimeControlsManager.$rootScope.$broadcast('tilesLoaded', remaining);
                }
            });
        }
    }

    function TimeControlsManager(options) {
        this.timeControls = null;
        var timeControlsManager = this;
        options.map.getLayers().on('change:length', function() {
            maybeCreateTimeControls(timeControlsManager, options, function() {
                var range = getTimes(options.map);
                if (range) {
                    return {
                        data: range
                    };
                }
            });
        });
        var pinsLayer = options.pinsLayerManager.storyPinsLayer;
        pinsLayer.on('change:features', function() {
            maybeCreateTimeControls(timeControlsManager, options, function() {
                var range = getTimes(options.map);
                if (range) {
                    var features = pinsLayer.get("features");
                    var annotations = features.map(function(f) {
                        return f.getProperties();
                    });
                    return {
                        annotations: annotations,
                        data: range
                    };
                }
            });
        });
        maybeCreateTimeControls(timeControlsManager, options);
    }

    module.factory('TimeControlsManager', function($rootScope) {
        TimeControlsManager.$rootScope = $rootScope;
        return TimeControlsManager;
    });
})();
