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

    function init(model) {
        var elements = [], options;
        var range = model.getRange();
        elements = $.map(model.annotations.getTimeLineAnnotatons(), function(ann, i) {
            return {
                id: i,
                start: ann.start_time || range.start,
                end: ann.end_time || range.end,
                content: ann.content,
                title: ann.title,
                type: 'range'
            };
        });
        options = {
            min: range.start,
            max: range.end,
            start: range.start,
            end: range.end,
            height: 138,
            maxHeight: 138
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

    this.isWindowMax = function() {
        return utils.rangesEqual(timeline.getWindow(), model.getRange());
    };
    this.moveToCurrentTime = function() {
        var current = timeline.getCurrentTime().getTime();
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
    this._timeline = timeline;
    this.update = init;
    // @todo detect click or dblclick event and position based on % of total width
};