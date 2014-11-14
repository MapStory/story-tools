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
    this.loop = false;

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

    slider.on('rangeChanged', function(ev, range) {
        clearTimeout();
        adjust(centerTimeline, range);
        schedule();
    });
    timeline.on('rangechanged', function(range) {
        adjust(updateSlider, range);
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
            if (self.loop) {
                slider.jump(0);
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
            if (deferred.length > 0) {
                $.when.apply($, deferred).then(function() {
                    if (started) {
                        timeout = window.setTimeout(move, 1000, 1);
                    }
                }, function() {
                    // the deferred was rejected, if arguments provided, this
                    // represents an error state so don't continue playing
                    if (arguments.length === 0 && started && timeout === null) {
                        timeout = window.setTimeout(move, 1000, 1);
                    } else {
                        self.stop();
                    }
                });
                deferred = [];
            } else {
                timeout = window.setTimeout(move, 1000, 1);
            }
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
        controls.controllerStateChanged();
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
    this.on = function(event, f) {
        events.event(event).subscribe(f);
    };
    controls._setController(this);
}


// @todo - extract to separate UI module - won't do anything if provided id is not found
function PlaybackControls(id) {
    var controls = $("#" + id);
    var startStop = controls.find('.startStop');
    var next = controls.find('.next');
    var prev = controls.find('.prev');
    var controller = null;
    startStop.bind('click', function() {
        var b = $(this);
        if (b.hasClass('stop')) {
            controller.start();
        } else {
            controller.stop();
        }
    });
    next.bind('click', function() {
        controller.next();
    });
    prev.bind('click', function() {
        controller.prev();
    });
    controls.find('.loop').bind('click', function() {
        var b = $(this);
        controller.loop = !controller.loop;
        if (controller.loop) {
            b.addClass('on');
        } else {
            b.removeClass('on');
        }
    });
    this.controllerStateChanged = function() {
        if (controller.isStarted()) {
            startStop.removeClass('stop');
            startStop.addClass('start');
            next.attr('disabled', true);
            prev.attr('disabled', true);
        } else {
            startStop.addClass('stop');
            startStop.removeClass('start');
            next.attr('disabled', null);
            prev.attr('disabled', null);
        }
    };
    this._setController = function(c) {
        controller = c;
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
    var mapAnnotations;
    function inTimeline(yes) {
        return $.map(annotations, function(ann) {
            return yes === ann.in_timeline ? ann : null;
        });
    }
    mapAnnotations = inTimeline(false);
    this.getTimeLineAnnotatons = function() {
        return inTimeline(true);
    };
    this.getMapAnnotations = function(instantOrRange) {
        return $map(mapAnnotations, function(ann) {
            // @todo
        });
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
        totalRange,
        slider,
        timeline,
        mapController,
        controls;

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
    controls = new PlaybackControls(options.controlsId || 'controls');

    var timeControls = new TimeController(model, slider, timeline, controls);
    mapController = new maps.MapController(options, timeControls);
    return timeControls;
}

exports.create = create;
exports.maps = maps;
