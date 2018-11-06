var moment = require('moment');

/**
 * Get the number of milliseconds from the provided arg.
 * @param arg - either Date, range (returns start), string or number
 * @returns milliseconds or null if nothing provided
 */
var getTime = function(arg) {
    var type = typeof arg;
    if (type === 'number') {
        return arg;
    }
    if (arg instanceof Date) {
        return arg.getTime();
    }
    if (type === 'string') {
        return parseDate(arg).getTime();
    }
    /*jshint eqnull:true */
    if (arg == null) {
        return null;
    }
    if (isRangeLike(arg)) {
        /*jshint eqnull:true */
        return getTime(arg.start != null ? arg.start : arg.end);
    }
    throw new Error('cannot call getTime with ' + type + ", : " + arg);
};

var isRangeLike = function(object) {
    /*jshint eqnull:true */
    return object != null && (object.hasOwnProperty('start') || object.hasOwnProperty('end'));
};

exports.formatTimelineDate = datetime => moment(datetime).format("llll");

exports.isRangeLike = isRangeLike;

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

exports.parseISODuration = function(duration) {
    var values = exports.isoDurationToMoment(duration);
    return moment.duration(values).asMilliseconds();
};

exports.Interval = function(start, end, duration) {
    if (typeof start === 'object') {
        var opts = start;
        start = opts.start;
        end = opts.end;
        duration = opts.duration;
    }
    if (start === end) {
        throw new Error('interval should have width');
    }
    Range.call(this, start, end);
    this.duration = duration;
    this.interval = exports.parseISODuration(this.duration);
    this.offset = exports.createOffsetter(this);
};

function Range(start, end) {
    if (isNaN(start) || isNaN(end)) {
        throw new Error('invalid start and/or end');
    }
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
    if (start != null) {
        if (this.start == null) {
            this.start = start;
        } else {
            this.start = Math.min(this.start, start);
        }
    }
    if (end != null) {
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

exports.stringToMoment = function(date, format){
    return moment(date, format);
};

exports.getTime = getTime;

/**
 * Read an iso duration into a moment.js object.
 * @param {string} duration
 * @returns {object} with moment.js info
 */
exports.isoDurationToMoment = function(duration) {
    if (duration.charAt(0) != 'P') {
        throw new Error('expected P as starting duration : ' + duration);
    }
    var pattern = /(\d+)(\w)/g;
    var date = null, time = null, values = {};
    duration = duration.substring(1);
    if (duration.indexOf('T') >= 0) {
        var parts = duration.split('T');
        date = parts[0];
        time = parts[1];
    } else {
        date = duration;
    }
    var mapping = {
        'Y': 'years',
        'M': 'months',
        'W': 'weeks',
        'D': 'days',
        'H': 'hours',
        'm': 'minutes',
        'S': 'seconds'
    };
    function parse(chunk, time) {
        function read(amount, part) {
            if (time && part == 'M') {
                part = 'm';
            }
            var mappedTo = mapping[part];
            if (typeof mappedTo == 'undefined') {
                throw Error('unknown duration specifier : ' + part);
            }
            values[mappedTo] = parseFloat(amount);
        }
        var next;
        while ((next = pattern.exec(chunk)) !== null) {
            read(next[1], next[2]);
        }
    }
    if (date !== null) {
        parse(date, false);
    }
    if (time !== null) {
        parse(time, true);
    }
    return values;
};

/**
 * Get a function for the provided duration that computes a new timestamp based on a
 * provided date and optional multiplier (negative for reverse).
 * @param {string} iso duration
 * @returns {function} offsetter(timestamp, multiplier=1)
 */
exports.createOffsetter = function(intervalOrDuration) {
    var duration = typeof intervalOrDuration === 'string' ? intervalOrDuration: intervalOrDuration.duration;
    var values = exports.isoDurationToMoment(duration);
    // as of writing, moment assumes y=365d and m=30d resulting in slow
    // day of month shifts that break ticks from matching
    // so we take care of this using a more accurate approach
    // ** the current approach breaks down if the day of month is greater than
    // 28 and day of month will no longer be retained (will shift)
    if ('years' in values || 'months' in values) {
        var years = values.years;
        var months = values.months;
        values.years = 0;
        values.months = 0;
        var millis = moment.duration(values).asMilliseconds();
        return function(ts, mult) {
            mult = mult || 1;
            var d = new Date(ts);
            /*jshint eqnull:true */
            var y = d.getUTCFullYear();
            if (years != null) {
                y += mult * years;
            }
            var m = d.getUTCMonth();
            if (months != null) {
                m += mult * months;
            }
            d.setUTCFullYear(y, m);
            return d.getTime() + (mult * millis);
        };
    } else {
        var offset = moment.duration(values).asMilliseconds();
        return function(ts, mult) {
            mult = mult || 1;
            return ts + (mult * offset);
        };
    }
};


/**
 * Contains implementations of Date.parse and date.toISOString that match the
 *     ECMAScript 5 specification for parsing RFC 3339 dates.
 *     http://tools.ietf.org/html/rfc3339
 */


/**
 * The regex to be used for validating dates. You can provide your own
 * regex for instance for adding support for years before BC. Default
 * value is: /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:(?:T(\d{1,2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(?:[+-]\d{1,2}(?::(\d{2}))?)))|Z)?$/
 */
var dateRegEx = /^(-?)(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:(?:T(\d{1,2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(?:[+-]\d{1,2}(?::(\d{2}))?)))|Z)?$/;


/**
 * Generate a date object from a string.  The format for the string follows
 *     the profile of ISO 8601 for date and time on the Internet (see
 *     http://tools.ietf.org/html/rfc3339).  We don't call the native
 *     Date.parse because of inconsistency between implmentations.  In
 *     Chrome, calling Date.parse with a string that doesn't contain any
 *     indication of the timezone (e.g. "2011"), the date is interpreted
 *     in local time.  On Firefox, the assumption is UTC.
 *
 * Parameters:
 * str - {String} A string representing the date (e.g.
 *     "2010", "2010-08", "2010-08-07", "2010-08-07T16:58:23.123Z",
 *     "2010-08-07T11:58:23.123-06", "-3000-08-07T16:58:23.123Z").
 *
 * Returns:
 * {Date} A date object.  If the string could not be parsed, an invalid
 *     date is returned (i.e. isNaN(date.getTime())).
 */
var parseDate = function(str) {
  var date;
  var match = str.match(dateRegEx);
  if (match && (match[2] || match[8])) { // must have at least year or time
    var year = parseInt(match[2], 10) || 0;
    if (match[1]){
      year = year * -1;
    }
    var month = (parseInt(match[3], 10) - 1) || 0;
    var day = parseInt(match[4], 10) || 1;
    date = new Date(Date.UTC(year, month, day));
    // optional time
    var type = match[8];
    if (type) {
      var hours = parseInt(match[5], 10);
      var minutes = parseInt(match[6], 10);
      var secFrac = parseFloat(match[7]);
      var seconds = secFrac | 0;
      var milliseconds = Math.round(1000 * (secFrac - seconds));
      date.setUTCHours(hours, minutes, seconds, milliseconds);
      // check offset
      if (type !== "Z") {
        var hoursOffset = parseInt(type, 10);
        var minutesOffset = parseInt(match[9], 10) || 0;
        var offset = -1000 * (60 * (hoursOffset * 60) + minutesOffset * 60);
        date = new Date(date.getTime() + offset);
      }
    }
  } else {
    date = new Date("invalid");
  }
  return date;
};


//  Secure Hash Algorithm (SHA1)
//  http://www.webtoolkit.info/

exports.sha1 = function(msg) {
  /* eslint-disable no-bitwise */
  var rotate_left = function(n, s) {
    return (n << s) | (n >>> (32 - s));
  };

  var cvt_hex = function(val) {
    var str = '';
    var i;
    var v;

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };


  var utf8Encode = function(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  };

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;

  msg = utf8Encode(msg);

  var msg_len = msg.length;

  var word_array = [];
  for (i = 0; i < msg_len - 3; i += 4) {
    j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
        msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (msg_len % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
      break;

    case 2:
      i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
      break;

    case 3:
      i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 |
          msg.charCodeAt(msg_len - 1) << 8 | 0x80;
      break;
  }

  word_array.push(i);

  while ((word_array.length % 16) != 14) {
    word_array.push(0);
  }

  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);


  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

    for (i = 0; i < 16; i++) {
      W[i] = word_array[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;

  }

  var localtemp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return localtemp.toLowerCase();
  /* eslint-enable no-bitwise */
};
