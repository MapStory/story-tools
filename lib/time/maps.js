var utils = require('./utils');
var moment = require('vis/node_modules/moment');

function parseISODuration(duration) {
    if (duration.charAt(0) != 'P') {
        throw new Error('expected P as starting duration : ' + duration);
    }
    var pattern = /(\d+)(\w)/g;
    var date, time, values = {};
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
        };
        var next;
        while ((next = pattern.exec(chunk)) !== null) {
            read(next[1], next[2]);
        }
    }
    if (date) {
        parse(date, false);
    }
    if (time) {
        parse(time, true);
    }
    return moment.duration(values).asMilliseconds();
}

/**
 * Read the provide ol3 WMS capabilities document
 * @param {type} caps
 * @returns an object of name->[date|interval]|interval-range mappings
 */
exports.readCapabilitiesTimeDimensions = function(caps) {
    var dimensions = {};
    function readRange(subparts) {
        if (subparts.length < 2) {
            throw new Error('expected 2 parts for range : ' + subparts);
        }
        var range = utils.createRange(subparts[0], subparts[1]);
        if (subparts.length == 3) {
            range.interval = parseISODuration(subparts[2]);
        }
        return range;
    }
    function readPart(part) {
        var subparts = part.split('/');
        if (subparts.length == 1) {
            return Date.parse(subparts[0]);
        } else {
            return readRange(subparts);
        }
    }
    function parse(dimension) {
        var dims = dimension.split(',');
        if (dims.length == 1) {
            var read = readPart(dims[0]);
            return typeof read === 'number' ? [read] : read;
        }
        return dims.map(readPart);
    }
    // @todo need to make layer scanning recursive?
    caps.Capability.Layer.Layer.forEach(function(lyr) {
        if (typeof lyr.Dimension !== 'undefined') {
            var dims = lyr.Dimension.filter(function(dim) {
                return dim.name.toLowerCase() === 'time';
            });
            if (dims.length) {
                dimensions[lyr.Name] = parse(dims[0].values);
            }
        }
    });
    return dimensions;
};

exports.parseISODuration = parseISODuration;