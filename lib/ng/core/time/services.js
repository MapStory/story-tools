(function() {
    'use strict';

    var module = angular.module('storytools.core.time.services', []);

    var stutils = storytools.core.time.utils;

    /**
     * Compute a sorted, unique array of ticks for the provided layers. The
     * algorithm uses any provided instant or extent(start value used) list values
     * and looks at the total range of all interval values creating a tick at the
     * minimum interval for the total range. See the tests for examples.
     * @param {array|ol.Map} layersWithTime
     * @returns array of ticks
     */
    function computeTicks(layersWithTime) {
        // allow a map to be passed in
        if (!angular.isArray(layersWithTime)) {
            layersWithTime = layersWithTime.getStoryLayers().getArray().filter(function(l) {
                var times = l.get('times');
                /*jshint eqnull:true */
                return times != null;
            });
        }
        var ticks = {};
        var totalRange = null;
        var intervals = [];
        function addTick(add) {
            add = stutils.getTime(add);
            if (! (add in ticks)) {
                ticks[add] = 1;
            }
        }
        layersWithTime.forEach(function(l) {
            var times = l.get('times');
            var range;
            if (angular.isArray(times)) {
                // an array of instants or extents
                range = stutils.computeRange(times);
                if (times.length) {
                    if (stutils.isRangeLike(times[0])) {
                        times.forEach(function(r) {
                            addTick(r.start);
                            if (totalRange === null) {
                                totalRange = stutils.createRange(r);
                            } else {
                                totalRange.extend(r.end);
                            }
                        });
                    } else {
                        times.forEach(function(r) {
                            addTick(r);
                        });
                    }
                }
            } else {
                // a interval (range+duration)
                range = times;
                intervals.push(times);
            }
            if (totalRange === null) {
                // copy, will be modifying
                totalRange = stutils.createRange(range);
            } else {
                totalRange.extend(range);
            }
        });
        if (intervals.length) {
            intervals.sort(function(a, b) {
                return a.interval - b.interval;
            });
            var smallest = intervals[0];
            var start = totalRange.start;
            while (start <= totalRange.end) {
                addTick(start);
                start = smallest.offset(start);
            }
        }
        ticks = Object.getOwnPropertyNames(ticks).map(function(t) {
            return parseInt(t);
        });
        return ticks.sort(function(a, b) {
            return a - b;
        });
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
        var range = computeTicks(options.storyMap);
        if (range.length) {
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
            timeControlsManager.timeControls.on('rangeChange', function(range) {
                timeControlsManager.currentRange = range;
            });
        }
    }

    function TimeControlsManager(options) {
        this.timeControls = null;
        var timeControlsManager = this;
        options.map.getLayers().on('change:length', function() {
            maybeCreateTimeControls(timeControlsManager, options, function() {
                var range = computeTicks(options.storyMap);
                if (range.length) {
                    return {
                        data: range
                    };
                }
            });
        });
        var pinsLayer = options.pinsLayerManager.storyPinsLayer;
        pinsLayer.on('change:features', function() {
            maybeCreateTimeControls(timeControlsManager, options, function() {
                var range = computeTicks(options.storyMap);
                if (range.length) {
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

    module.service('TimeMachine', function() {
        return {
            computeTicks: computeTicks
        };
    });
})();
