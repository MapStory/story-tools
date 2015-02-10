var moment = require('vis/node_modules/moment');

/**
 * Get the number of milliseconds from the provided arg.
 * @param arg - either Date, range (returns start), string or number
 * @returns milliseconds or null if nothing provided
 */
getTime = function(arg) {
    var type = typeof arg;
    if (type === 'number') {
        return arg;
    }
    if (arg instanceof Date) {
        return arg.getTime();
    }
    if (type === 'string') {
        return Date.parse(arg);
    }
    /*jshint eqnull:true */
    if (arg == null) {
        return null;
    }
    if (isRangeLike(arg)) {
        /*jshint eqnull:true */
        return getTime(arg.start != null ? arg.start : arg.end);
    }
    throw new Error('cannot call getTime with ' + type);
};

isRangeLike = function(object) {
    return object.hasOwnProperty('start') || object.hasOwnProperty('end');
};

exports.createRange = function(start, end) {
    if (arguments.length === 1) {
        var other = start;
        if (isRangeLike(other)) {
            start = other.start;
            end = other.end;
        } else {
            end = start;
        }
    }
    /*jshint eqnull:true */
    if (start != null && end != null && start > end) {
        throw new Error('start > end');
    }
    return new Range(getTime(start), getTime(end));
};

exports.rangesEqual = function(a, b) {
    return getTime(a.start) === getTime(b.start) &&
        getTime(a.end) === getTime(b.end);
};

function rangeContains(range, time) {
    /*jshint eqnull:true */
    if (time == null) {
        throw new Error('invalid time argument');
    }
    /*jshint eqnull:true */
    return ((range.start != null ? time >= range.start : true) &&
           (range.end != null ? time < range.end : true)) ||
           range.start === range.end && time === range.start;
}

function Range(start, end) {
    this.start = start;
    this.end = end;
}
/**
 * extend this Range by another. This algorithm will consider an open-ended
 * range to represent a minimum of start and maximum of end.
 * @param {type} other
 * @returns {undefined}
 */
Range.prototype.extend = function(other) {
    /*jshint eqnull:true */
    if (!isRangeLike(other)) {
        other = exports.createRange(other);
    }
    var start = getTime(other.start);
    var end = getTime(other.end);
    if (start == null) {
        start = end;
    }
    if (end == null) {
        end = start;
    }
    if (start !== null) {
        if (this.start == null) {
            this.start = start;
        } else {
            this.start = Math.min(this.start, start);
        }
    }
    if (end !== null) {
        if (this.end == null) {
            this.end = end;
        } else {
            this.end = Math.max(this.end, end);
        }
    }
};
Range.prototype.intersects = function(other) {
    if (isRangeLike(other)) {
        /*jshint eqnull:true */
        var es = other.start == null ? Number.MIN_VALUE : other.start;
        var ee = other.end == null ? Number.MAX_VALUE : other.end;
        // intersection if (any)
        // effective end in this range
        // effective start in this range
        // effective start before and effective end after
        return rangeContains(this, es) ||
            rangeContains(this, ee) ||
            es <= this.start && ee >= this.end;
    } else {
        return rangeContains(this, getTime(other));
    }
};
Range.prototype.toString = function() {
    return new Date(this.start).toUTCString() + " : " + new Date(this.end).toUTCString();
};
Range.prototype.center = function() {
    return Math.floor(this.start + (this.end - this.start) / 2);
};
Range.prototype.width = function() {
    return this.end - this.start;
};
Range.prototype.isEmpty = function() {
    /*jshint eqnull:true */
    return this.end == null && this.start == null;
};
exports.Range = Range;



/**
 * Compute the overall range of provided args. Args may be an array of:
 * date or long, range, object with property/function yielding range for the
 * object.
 * @param {type} args
 * @returns range will have start/end even if the same time.
 */
exports.computeRange = function(args, rangeGetter) {
    var range = new Range(null, null);
    exports.visitRanges(args, rangeGetter, function(arg, r) {
        range.extend(r);
    });
    /*jshint eqnull:true */
    if (range.start == null) {
        range.start = range.end;
    }
    if (range.end == null) {
        range.end = range.start;
    }
    return range;
};

exports.visitRanges = function(objects, rangeGetter, visitor) {
    var getRange;
    if (typeof rangeGetter == 'string') {
        getRange = function(object) {
            return object[rangeGetter];
        };
    } else if (typeof rangeGetter == 'function') {
        getRange = rangeGetter;
    } else {
        getRange = function(object) {
            return isRangeLike(object) ? object : exports.createRange(object);
        };
    }
    for (var i = 0, ii = objects.length; i < ii; i++) {
        var object = objects[i];
        visitor(object, getRange(object));
    }
};

/** for the given what, find the index in the items that what is closest
 * to. items must be sorted. The lowest closest value possible is returned.
 */
exports.binarySearch = function(items, what) {
    var start = 0;
    var stop = items.length - 1;
    var mid = stop + start / 2 | 0;
    var val;
    if (what < items[0]) {
        return 0;
    }
    if (what > items[stop]) {
        return items.length - 1;
    }
    while ((val = items[mid]) !== what && start < stop) {
        if (what > val) {
            if (what < items[mid + 1]) {
                return mid;
            }
        } else if (what < val) {
            if (what > items[mid - 1]) {
                return mid - 1;
            }
            stop = mid - 1;
        }
        mid = stop + start / 2 | 0;
    }
    return mid;
};

exports.find = function(items, what) {
    if (what < items[0]) {
        return 0;
    }
    for (var i = 0, ii = items.length - 1; i < ii; i++) {
        if (what >= items[i] && what < items[i + 1]) {
            return i;
        }
    }
    return items.length - 1;
};

exports.Events = function() {
    var topics = {};

    // @todo introduce setting topics with arguments and logging/exception
    // on un-fired event

    function event(id) {
        var callbacks, method,
                topic = id && topics[ id ];
        if (!topic) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (id) {
                topics[ id ] = topic;
            }
        }
        return topic;
    }

    return {
        event: event
    };
};

exports.pickInterval = function(range) {
    var intervals = [
        moment.duration(1, 'seconds').asMilliseconds(),
        moment.duration(1, 'minutes').asMilliseconds(),
        moment.duration(1, 'hours').asMilliseconds(),
        moment.duration(1, 'days').asMilliseconds(),
        moment.duration(1, 'weeks').asMilliseconds(),
        moment.duration(1, 'months').asMilliseconds(),
        moment.duration(1, 'years').asMilliseconds()
    ];
    return intervals[Math.max(exports.find(intervals, range.width()) - 1, 0)];
};

exports.getTime = getTime;
