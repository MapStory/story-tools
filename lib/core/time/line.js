var vis = require("vis/dist/vis.min.js");
var Timeline = vis.Timeline;
var utils = require("./utils");

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
        var elements = [], layer_groups = [], groups = [], options;
        var story_pin_label = 'Annotation';
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
                id: utils.sha1('annotation' + ann.id + i),
                start: start,
                end: end,
                content: ann.content || ann.title,
                title: ann.title,
                type: type,
                group: story_pin_label
            };
        });

        // Add the Group we there are elements.
        if(elements.length > 0){
            groups.push({id: story_pin_label, title: story_pin_label, time: []});
        }

        if (model.boxy.box) {
            var box_elements = model.boxy.box.map(function(box, i) {
                /*jshint eqnull:true */
                var start = box.range != null ? box.range.start : range.start;
                var end = box.range != null ? box.range.end : range.end;
                var type = 'background';
                return {
                    id: utils.sha1('box' + box.id),
                    start: start,
                    end: end,
                    content: box.content || box.title,
                    type: type
                };
            });
            elements = elements.concat(box_elements);
        }


        layer_groups = $.map(model.storyLayers, function(lyr, i) {
            var id = lyr.get('id');
            var title = lyr.get('title');
            var times = lyr.get('times') || [];
            var group = null;

            if (times.length > 0) {
                if (times.length > 1500) {
                    elements.push({
                        id: utils.sha1(id),
                        group: id,
                        content: "",
                        start: times[0],
                        end: times[times.length - 1],
                        type: 'range'
                    });
                } else {
                    for (var j = 0; j < times.length; j++) {
                        var time = times[j];
                        elements.push({
                            id: utils.sha1(id + time + Date()),
                            group: id,
                            content: "",
                            start: time,
                            type: 'box'
                        });
                    }
                }
                group = {
                    id: id,
                    content: title
                };

            }
            return group;
        });

        groups = groups.concat(layer_groups);

        if(elements.length > 5000){
            console.debug("%s elements is too large for the timeline to render performant, no worries we will take care of it.", elements.length);
            elements = [];

        }

        console.debug("Building the timeline from %s to %s with %s elements and %s groups.",
            new Date(range.start).toISOString(),
            new Date(range.end).toISOString(),
            elements.length,
            groups.length);

        var height = $( document ).height() * 0.35;

        options = {
            min: range.start,
            max: range.end,
            start: range.start,
            end: range.end,
            height: (height < 300)? 138: height,
            maxHeight: 400,
            showCurrentTime: false
        };
        if (timeline === null) {
            timeline = new Timeline(dom.get(0), elements, options);
            timeline.setGroups(groups);
            timeline.setCurrentTime(range.start);
            timeline.addCustomTime();
        } else {
            timeline.setOptions(options);
            timeline.setItems(elements);
            timeline.setGroups(groups);
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
        if (window.onMoveCallback) {
            window.onMoveCallback(time);
        }
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
