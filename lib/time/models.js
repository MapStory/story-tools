var utils = require('./utils');

/**
 * @param mode string - one of instant, range, cumulative
 * @param fixed boolean
 * @param range object - object with start/end
 * @param annotations Annotations
 */
function TimeModel(mode, fixed, boxes, annotations, totalRange) {
    this.mode = mode;
    this.fixed = fixed;
    this.annotations = annotations;
    var activeRange = utils.computeRange(boxes, "range");
    this.getRange = function() {
        return activeRange;
    };
    this.getTotalRange = function() {
        return totalRange;
    };
    this.getStartDate = function() {
        return activeRange.start;
    };
    this.getEndDate = function() {
        return activeRange.end;
    };
    this.update = function(options) {
        this.mode = options.mode ? options.mode : this.mode;
        if (options.hasOwnProperty('fixed')) {
            this.fixed = options.fixed;
        }
        this.annotations = options.annotations ? options.annotations : this.annotations;
        this.updateInternal(options);
    };
}

exports.TimeModelInstant = function(mode, fixed, boxes, annotations, totalRange, dates) {
    TimeModel.call(this, mode, fixed, boxes, annotations, totalRange);

    this.getSteps = function() {
        return dates.length - 1;
    };
    this.getIndex = function(instant) {
        var idx = utils.find(dates, instant);
        return idx;
    };
    this.getRangeAt = function(i, j) {
        return new utils.Range(dates[i], dates[j]);
    };
    this.updateInternal = function(options) {
        if (options.data) {
            dates = options.data;
        }
    };
};

exports.TimeModelRanged = function(mode, fixed, boxes, annotations, totalRange, interval) {
    TimeModel.call(this, mode, fixed, boxes, annotations, totalRange);
};