var utils = require('./utils');

function Box(options) {
    this.range = options.range || null;
    this.data = options.data || null;
    this.layerIds = options.layerIds || null;
    this.center = options.center || null; // ol.Coordinate
    this.resolution = options.resolution || null;
    this.allowPan = options.allowPan;
    this.allowZoom = options.allowZoom;
    this.speed = options.speed;  // interval, seconds
    this.title = options.title || '';
    this.id = options.id || new Date().getUTCMilliseconds();
    this._offset = 0;
    if (this.range === null) {
        if(this.data) {
            this.range = utils.createRange(this.data[0], this.data[this.data.length - 1]);
        }else{
            this.range = utils.createRange(options.start_time, options.end_time);
        }
    }
    // @todo possible divide by zero if speed.interval not set!
    this._steps = this.data === null ? Math.floor(this.range.width() / this.speed.interval) + 1: this.data.length;
}
Box.prototype.getSteps = function() {
    return this._steps;
};
Box.prototype.getRange = function() {
    return this.range;
};
Box.prototype.getIndex = function(instant) {
    return this.data ? utils.find(this.data, instant) :
        Math.floor(Math.min(this.range.width(), Math.max(0, instant - this.range.start)) / this.speed.interval);
};
Box.prototype.getDate = function(idx) {
    idx = idx - this._offset;
    return this.data ? this.data[idx] : this.range.start + (idx * this.speed.interval);
};


function getTime(props, prop) {
    var val = props[prop];
    if (typeof val != 'undefined') {
        return val;// *= 1000;
    }
    return null;
}

/**
 * Load Box from geojson, reprojecting from 4326 to the provided
 * projection.
 * @param {Object} geojson
 * @param {String} projection
 * @returns array of Box features
 */
exports.loadFromGeoJSON = function(geojson, projection) {
    if (projection) {
        projection = ol.proj.get(projection);
    }
    return geojson.features.map(function(f) {
        var props = f.properties;
        //props.the_geom = f.geometry;
        props.id = f.id;
        props.start_time = getTime(props, 'start_time');
        props.end_time = getTime(props, 'end_time');
        return new Box(props, projection);
    });
};

function findBox(boxes, idx) {
    var i, ii;
    var box;
    for (i = 0, ii = boxes.length; i < ii; i++) {
        box = boxes[i];
        if (idx >= box._offset) {
            if (i + 1 < ii) {
                if (idx < boxes[i + 1]._offset) {
                    break;
                }
            } else {
                break;
            }
        }
    }
    return box;
}

exports.BoxModel = function(boxArray) {
    var boxes,
        range,
        steps;
    function updateBoxes(neu) {
        var offset = 0;
        boxes = neu.map(function(b) {
            var box = new Box(b);
            box._offset = offset;
            offset += box.getSteps();
            return box;
        });
        range = utils.computeRange(boxes, 'range');
        steps = offset;
    }
    updateBoxes(boxArray);
    this.getRange = function() {
        return range;
    };
    this.getSteps = function() {
        return steps;
    };
    this.getRangeAt = function(s, e) {
        var start = findBox(boxes, s);
        var end = findBox(boxes, e);
        return utils.createRange(start.getDate(s), end.getDate(e));
    };
    this.getIndex = function(instant) {
        var idx = 0, i;
        if (instant < boxes[0].getRange().start) {
            return 0;
        }
        for (i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            var range = box.getRange();
            if (instant >= range.start && instant <= range.end) {
                idx += box.getIndex(instant);
                break;
            } else {
                idx += box.getSteps();
            }
        }
        return idx;
    };
    this.setRange = function(newRange) {
        if (boxes.length == 1) {
            // @todo support for range
            if (utils.isRangeLike(newRange)) {
                throw new Error('not supported yet');
            }
            boxes[0].data = newRange;
            // @todo must set here or constructor is dumb and doesn't recompute
            boxes[0].range = utils.computeRange(newRange);
        } else {
            // @todo finish
            console.log('more than one story box to update range with!');
        }
        updateBoxes(boxes);
    };
    this.update = function(options) {

    };
};

exports.findBox = findBox;
exports.Box = Box;
