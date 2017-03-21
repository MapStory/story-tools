var utils = require('./utils');
var models = require('./models');
var timeslider = require('./slider');
var line = require('./line');
var maps = require('./maps');

/**
 * Facade object and guts of slider/timeline/playback logic.
 *
 * Since playback is driven by a timeout, all other potential events
 * are fired in an async manner to ensure a uniform API.
 */
function TimeController(model, slider, timeline, controls) {
    this.model = model;
    this.slider = slider;
    this.timeline = timeline;
    this.loop = 'none';

    var self = this,
        currentTimelineWindow = getTimelineWindow(),
        isAdjusting = false,
        started = false,
        timeout = null,
        events = new utils.Events(),
        deferred = [];

    function getTimelineWindow() {
        return utils.createRange(timeline.getWindow());
    }

    function adjust(fun, a, b) {
        if (isAdjusting) {
            return;
        }
        isAdjusting = true;
        try {
            fun(a, b);
        } finally {
            isAdjusting = false;
        }
    }

    function centerTimeline(range) {
        var c = model.mode === 'cumulative' ? range.end : range.center();
        timeline.moveTo(c);
        publishRangeChange(range);
    }

    function adjustSlider(range) {
        if (timeline.isWindowMax()) {
            return;
        }

        var center = range.center();
        var idx = model.getIndex(center);
        if (model.mode === 'cumulative') {
            slider.growTo(idx);
        } else {
            slider.center(idx);
        }
        timeline.setTime(center);
        publishRangeChange(slider.getRange());
    }

    function updateSlider(range) {
        if (utils.rangesEqual(range, currentTimelineWindow)) {
            return;
        }
        range = utils.createRange(range);
        // zoom or scroll event?
        if (range.width() !== currentTimelineWindow.width()) {
            timeline.moveToCurrentTime();
        } else {
            adjustSlider(range);
        }
        currentTimelineWindow = range;
    }

    slider.on('rangeChanged', function(range) {
        clearTimeout();
        adjust(centerTimeline, range);
        schedule();
    });
    timeline.on('rangechanged', function(range) {
        adjust(updateSlider, range);
    });
    timeline.on('select', function(properties) {
        console.log("Selected items: ", properties.items);
    });
    function clearTimeout() {
        if (timeout !== null) {
            window.clearTimeout(timeout);
        }
        timeout = null;
    }

    function move(amt) {
        timeout = null;
        var atEnd;
        if (model.mode === 'cumulative') {
            atEnd = slider.grow(amt);
        } else {
            atEnd = slider.move(amt);
        }
        if (atEnd) {
            if (self.loop === 'chapter') {
                slider.jump(0);
            } else if (self.loop === 'story') {
              var currentChapter = window.location.hash.split("/")[2];
              var nextChapter = currentChapter === undefined || currentChapter === null ? 2 : parseInt(currentChapter) + 1;
              if(nextChapter <= controls.chapterCount) {
                  console.log("Going to Chapter ", nextChapter);
                  window.location.href = '#/chapter/' + nextChapter;
                  slider.jump(0);
              } else {
                console.log("Going to Chapter 1");
                window.location.href = '#/chapter/1';
                slider.jump(0);
              }
            } else {
              self.stop();
            }
        }
        centerTimeline(slider.getRange());
        if (started) {
            schedule();
        }
    }

    function schedule() {
        if (started) {
            // @todo respect playback interval options...
            var wait = model.interval;
            $.when.apply($, deferred).then(function() {
                if (started) {
                    timeout = window.setTimeout(move, wait, 1);
                }
            }, function() {
                // the deferred was rejected, if arguments provided, this
                // represents an error state so don't continue playing
                if (arguments.length === 0 && started && timeout === null) {
                    timeout = window.setTimeout(move, wait, 1);
                } else {
                    self.stop();
                }
            });
            deferred = [];
        }
    }

    function run() {
        publishStateChange("running");
        move(1);
    }

    function publishRangeChange(data) {
        if (typeof data === 'undefined') {
            data = slider.getRange();
        }
        publish("rangeChange", data);
    }

    function publishStateChange(state) {
        publish("stateChange", state);
    }

    function publish(event, data) {
        events.event(event).publish(data);
    }

    this.defer = function(defer) {
        deferred.push(defer);
    };
    this.getCurrentRange = function() {
        return slider.getRange();
    };
    this.update = function(options) {
        model.update(options);
        slider.update(model);
        timeline.update(model);
        window.setTimeout(publishRangeChange, 0);
    };
    this.start = function() {
        if (started) {
            return;
        }
        deferred = [];
        started = true;
        window.setTimeout(run, 0);
    };
    this.stop = function() {
        deferred = [];
        started = false;
        clearTimeout();
        window.setTimeout(publishStateChange, 0, 'stopped');
    };
    this.next = function() {
        clearTimeout();
        window.setTimeout(move, 0, 1);
    };
    this.prev = function() {
        clearTimeout();
        window.setTimeout(move, 0, -1);
    };
    this.isStarted = function() {
        return started;
    };
    this.isReady = function() {
        var r = model.getRange();
        return r.start !== null && r.end !== null;
    };
    this.on = function(event, f) {
        events.event(event).subscribe(f);
    };
}

/**
 * annotation model:
 * title
 * content
 * the_geom
 * start_time
 * end_time
 * in_timeline
 * in_map
 * appearance
 */
function Annotations(annotations) {
    var ann = annotations || [];
    function inTimeline() {
        return ann.filter(function(a) {
            return a.in_timeline;
        });
    }
    this.getTimeLineAnnotatons = function() {
        return inTimeline(true);
    };
    this.update = function(annotations) {
        this.ann = annotations;
    };
}

/**
 * box model:
 * title
 * content
 * the_geom
 * start_time
 * end_time
 * in_timeline
 * in_map
 * appearance
 */
function Boxes(boxes) {
    var box = boxes || [];
    function inTimeline() {
        return box.filter(function(b) {
            return true;//b.in_timeline;
        });
    }
    this.getTimeLineBoxes = function() {
        return inTimeline(true);
    };
    this.update = function(boxes) {
        this.box = boxes;
    };
}


/**
 * common lingo:
 * instant: a single point in time
 * extent, range: has property start and end
 * start, end: long values representing UTC (internal) but generally,
 *             a date
 * interval: multipier * precision
 * precision: tick, second, minute, hour, day, week, month, year
 *            note: tick implies a multipier of 1
 * speed: object with property seconds (framerate) and optional interval
 *
 * options = {
 *   annotations: [ {
 *      title,
 *      content,
 *      the_geom,
 *      start_time,
 *      end_time,
 *      in_timeline,
 *      in_map,
 *      appearance
 *      } ... ],
 *   map: ol.Map,
 *   boxes : [ {
 *      range : {
 *          start, end
 *      },
 *      center: ol.Coordinate,
 *      resolution: float,
 *      static: boolean,
 *      speed: { interval, seconds }
 *      } ... ],
 *   data : [ date ...] | rangeWithInterval,
 *   playback : {
 *      mode: instant | range | cumulative,
 *      fixed: boolean
 *   },
 *   timeLineId : element id,
 *   timeSliderId : element id,
 *   controlsId: element id
 *
 * }
 */
function create(options) {
    // @todo for layers, annotations won't exist and, intially, we won't
    //       have playback settings for layers...
    var model,
        annotations = new Annotations(options.annotations),
        boxes = options.boxes,
        controls = {'chapterCount': options.chapterCount},
        totalRange,
        slider,
        timeline,
        mapController;
    options.boxy = new Boxes(options.boxes);
    // make a default box if none provided
    if (typeof boxes == 'undefined' || boxes.length === 0) {
        var interval = 0, data = null;
        if (Array.isArray(options.data)) {
            data = options.data;
            totalRange = utils.computeRange(options.data);
        } else {
            interval = options.data.interval || utils.pickInterval(options.data);
            totalRange = options.data;
        }
        boxes = [{
                data: data,
                range: totalRange,
                speed: {
                    interval: interval,
                    seconds: 3
                }
            }];
    }

    model = new models.TimeModel(options, boxes, annotations);
    slider = new timeslider.TimeSlider(options.timeSliderId || 'slider', model);
    timeline = new line.TimeLine(options.timeLineId || 'timeline', model);

    var timeControls = new TimeController(model, slider, timeline, controls);
    mapController = new maps.MapController(options, timeControls);
    return timeControls;
}

exports.create = create;
exports.maps = maps;
exports.utils = utils;
