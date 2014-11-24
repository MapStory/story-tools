/**
 * Visual feedback of complete story line. Allow dragging of range, click
 * to position.
 *
 * Playback Modes
 * - fixed cumulative (min fixed at 0, max adjusts with tick)
 * - fixed range playback (range fixed, window adjusts with tick)
 * - fixed instant (like fixed range but range of 0)
 * - open range playback (fully adjustable min/max, window adjusts with tick)
 *
 * Internal model
 * - 0-N where N is either the number of instants or the total number of extents
 *
 * @param {type} id
 * @param {type} model
 * @returns {TimeSlider}
 */
exports.TimeSlider = function(id, model) {
    var slider = $("#" + id);
    var initialized = false;
    var singleSlider;

    function init(model) {
        var options = {
            step: 1,
            start: [0, 0],
            animate: false,
            connect: true,
            range: {
                min: 0,
                max: model.getSteps() - 1
            },
            behaviour: 'drag-snap'
        };
        singleSlider = false;

        /*if (model.fixed) {
            // @todo need model interval
        }*/

        if (model.mode === 'cumulative') {
            singleSlider = true;
            options.connect = 'lower';
        } else if (model.mode === 'instant') {
            singleSlider = true;
            options.connect = false;
        } else if (model.mode === 'range') {
            if (model.fixed) {
                // ideally we'd support snap but it breaks fixed
                options.behaviour = 'drag-fixed';
            }
        } else {
            throw "invalid model mode : " + model.mode;
        }

        if (initialized) {
            // have to update values based on current state
            var range = getSliderRangeInternal();
            if (singleSlider) {
                options.start = range[0];
            } else {
                if (range[0] === range[1]) {
                    range[1] += 1;
                }
                options.start = range;
            }
        } else if (singleSlider) {
            options.start = 0;
        }
        slider.noUiSlider(options, initialized);
        if (!initialized) {
            slider.bind('slide', function(ev) {
                var range = getRange();
                slider.trigger('rangeChanged', range);
            });
        }
        initialized = true;
    }

    init(model);

    function getSliderRangeInternal() {
        var range = slider.val();
        if (! Array.isArray(range)) {
            range = parseInt(range, 10);
            range = [model.mode === 'cumulative' ? 0 : range, range];
        } else {
            range = range.map(function(i) { return parseInt(i, 10); });
        }
        return range;
    }

    function getRange() {
        var range = getSliderRangeInternal();
        return model.getRangeAt(range[0], range[1]);
    }

    function width() {
        var range = getSliderRangeInternal();
        return range[1] - range[0];
    }

    function isAtEnd(left) {
        var range = getSliderRangeInternal();
        if (left) {
            return range[0] === 0;
        }
        return range[1] === model.getSteps()-1;
    }

    function setValue(val) {
        // normalize nouislider.val to handle array
        if (singleSlider) {
            slider.val(val[1]);
        } else {
            slider.val(val);
        }
    }

    this.slider = slider;
    this.on = function() {
        slider.on.apply(slider, arguments);
    };
    this.getSliderRangeInternal = getSliderRangeInternal;
    this.center = function(index) {
        var half = Math.floor(width() / 2);
        setValue([index - half, index + half]);
    };
    this.move = function(amt) {
        var vals  = getSliderRangeInternal();
        vals[0] += amt;
        vals[1] += amt;
        setValue(vals);
        return isAtEnd(amt < 0);
    };
    this.grow = function(amt) {
        var vals = getSliderRangeInternal();
        vals[1] += amt;
        setValue(vals);
        return isAtEnd(false);
    };
    this.growTo = function(where) {
        var vals = getSliderRangeInternal();
        vals[1] = where;
        setValue(vals);
        return isAtEnd(false);
    };
    this.jump = function(to) {
        setValue([to, to + width()]);
    };
    this.getRange = getRange;
    this.update = init;
};
