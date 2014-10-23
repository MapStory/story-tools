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
        var start = model.getStartDate();
        var end = model.getEndDate();
        elements = $.map(model.annotations.getTimeLineAnnotatons(), function(ann, i) {
            return {
                id: i,
                start: ann.start_time || model.getStartDate(),
                end: ann.end_time || model.getEndDate(),
                content: ann.content,
                title: ann.title,
                type: 'range'
            };
        });
        options = {
            min: start,
            max: end,
            start: start,
            end: end,
            height: 138,
            maxHeight: 138
        };
        if (timeline === null) {
            timeline = new Timeline(dom.get(0), elements, options);
            timeline.setCurrentTime(model.getStartDate());
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
        var start = model.getStartDate(), end = model.getEndDate();
        if (current === start) {
            timeline.setWindow(start, start + width, {animate: false});
        } else if (current === end) {
            timeline.setWindow(end - width, end, {animate: false});
        } else {
            timeline.moveTo(current, {animate: false});
        }
    };
    this._timeline = timeline;
    this.update = init;
    // @todo detect click or dblclick event and position based on % of total width
};