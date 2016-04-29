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
            var storyMap = layersWithTime;
            layersWithTime = storyMap.getStoryLayers().getArray().filter(function(l) {
                var times = l.get('times');
                /*jshint eqnull:true */
                return times != null;
            });
            layersWithTime.push(storyMap.storyPinsLayer);
            layersWithTime.push(storyMap.storyBoxesLayer);
        }
        var ticks = {};
        var totalRange = null;
        var intervals = [];
        function addTick(add) {
            add = stutils.getTime(add);
            if (add !== null && ! (add in ticks)) {
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
                                totalRange.extend(r);
                            }
                        });
                    } else {
                        times.forEach(function(r) {
                            addTick(r);
                        });
                    }
                }
                // add a tick at the end to ensure we get there
                /*jshint eqnull:true */
                if (range.end != null) {
                    addTick(range.end);
                }
            } else if (times) {
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

    function TimeControlsManager($log, $rootScope, StoryPinLayerManager, StoryBoxLayerManager, MapManager) {
        this.timeControls = null;
        var timeControlsManager = this;

        function maybeCreateTimeControls(update) {
            $log.debug("Creating TimeControls with boxes: ");
            $log.debug(StoryBoxLayerManager.storyBoxes);
            if (timeControlsManager.timeControls !== null) {
                if (update) {
                    var values = update();
                    if (values) {
                        timeControlsManager.timeControls.update(values);
                    }
                }
                return;
            }
            var range = computeTicks(MapManager.storyMap);
            if (range.length) {
                var annotations = StoryPinLayerManager.storyPins;
                timeControlsManager.timeControls = storytools.core.time.create({
                    annotations: annotations,
                    storyMap: MapManager.storyMap,
                    storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                    data: range,
                    mode: MapManager.storyMap.mode,
                    tileStatusCallback: function(remaining) {
                        $rootScope.$broadcast('tilesLoaded', remaining);
                    }
                });
                timeControlsManager.timeControls.on('rangeChange', function(range) {
                    timeControlsManager.currentRange = range;
                });
            }
        }

        MapManager.storyMap.getStoryLayers().on('change:length', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length) {
                    return {
                        storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                        data: range
                    };
                }
            });
        });
        var pinsLayer = MapManager.storyMap.storyPinsLayer;
        var boxesLayer = MapManager.storyMap.storyBoxesLayer;
        pinsLayer.on('change:features', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length) {
                    return {
                        storyLayers: MapManager.storyMap.getStoryLayers().getArray(),
                        annotations: pinsLayer.get("features"),
                        boxes: boxesLayer.get("features"),
                        data: range
                    };
                }
            });
        });

        boxesLayer.on('change:features', function() {
            maybeCreateTimeControls(function() {
                var range = computeTicks(MapManager.storyMap);
                if (range.length) {
                    return {
                        annotations: pinsLayer.get("features"),
                        data: range,
                        boxes: boxesLayer.get("features")
                    };
                }
            });
        });

        maybeCreateTimeControls();
    }

    module.constant('TimeControlsManager', TimeControlsManager);

    module.service('TimeMachine', function() {
        return {
            computeTicks: computeTicks
        };
    });
})();
