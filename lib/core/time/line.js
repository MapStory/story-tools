var Timeline = require('vis/lib/timeline/Timeline');
var utils = require('./utils');

/**
 * Display annotations or other temporal instant/extent. Allow adjusting
 * time (either instant or extent) by dragging.
 * @param {type} id
 * @param {type} model
 * @returns {_L1.TimeLine}
 */
exports.TimeLine = function(id, model) {
    var dom = $("#" + id);
    var timeline = null;
    // @revisit - internally the timeline seems to apply the offset when
    //            creating a tool tip, does this cause problems elsewhere?
    var offset = new Date().getTimezoneOffset() * 60 * 1000;

    function init(model) {
        var elements = [], options;
        var range = model.getRange();
        if (range.isEmpty()) {
            range = utils.createRange(Date.now());
        }
        elements = model.annotations.getTimeLineAnnotatons().map(function(ann, i) {
            /*jshint eqnull:true */
            var start = ann.start_time != null ? ann.start_time : range.start;
            var end = ann.end_time != null ? ann.end_time : range.end;
            var type = start === end ? 'box' : 'range';
            return {
                id: ann.id,
                start: start,
                end: end,
                content: ann.content || ann.title,
                title: ann.title,
                type: type
            };
        });
        options = {
            min: range.start,
            max: range.end,
            start: range.start,
            end: range.end,
            height: 138,
            maxHeight: 138,
            showCurrentTime: false
        };
        if (timeline === null) {
            timeline = new Timeline(dom.get(0), elements, options);
            timeline.setCurrentTime(range.start);
        } else {
            timeline.setOptions(options);
            timeline.setItems(elements);
        }
    }
    init(model);

    // updates from user dragging customtime bar
    // @todo will not update slider currently at min timeline zoom as it
    // is difficult to determine whether an event is from zooming or dragging
    // need to wrap event handling to better differentiate
    timeline.on('timechanged', function() {
        timeline.moveTo(timeline.getCustomTime(), {animate: false});
    });

    this.moveTo = function(time) {
        timeline.moveTo(time, {animate: false});
        this.setTime(time);
    };
    this.setTime = function(time) {
        timeline.setCustomTime(time + offset);
    };
    this.isWindowMax = function() {
        return utils.rangesEqual(timeline.getWindow(), model.getRange());
    };
    this.moveToCurrentTime = function() {
        var current = timeline.getCustomTime().getTime();
        var width = utils.createRange(timeline.getWindow()).width();
        var range = model.getRange();
        if (current === range.start) {
            timeline.setWindow(range.start, range.start + width, {animate: false});
        } else if (current === range.end) {
            timeline.setWindow(range.end - width, range.end, {animate: false});
        } else {
            timeline.moveTo(current, {animate: false});
        }
    };
    this.getWindow = function() {
        return timeline.getWindow();
    };
    this.on = function(ev, cb) {
        timeline.on(ev, cb);
    };
    this.update = init;
    // @todo detect click or dblclick event and position based on % of total width
};
