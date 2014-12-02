/*jshint loopfunc: true */
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
        }
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

function TileLoadListener(tileStatusCallback) {
    var tilesLoading = {};
    var deferred = $.Deferred(),
        cancelled = false;
    function remainingTiles() {
        var t = 0;
        for (var i in tilesLoading) {
            t += tilesLoading[i];
        }
        return t;
    }
    var listener = {
        deferred: deferred,
        cancel: function() {
            cancelled = true;
            for (var s in tilesLoading) {
                tilesLoading[s] = 0;
            }
            if (deferred) {
                deferred.reject(); // notify we've aborted but w/out error
            }
        },
        tileQueued: function(source) {
            if (cancelled) {
                return;
            }
            tilesLoading[source] = (tilesLoading[source] || 0) + 1;
            if (tileStatusCallback) {
                tileStatusCallback(remainingTiles());
            }
        },
        tileLoaded: function(event, source) {
            if (cancelled) {
                return;
            }
            tilesLoading[source] -= 1;
            var remaining = remainingTiles();
            if (tileStatusCallback) {
                tileStatusCallback(remaining);
            }
            if (remaining === 0 && deferred) {
                deferred.resolve();
            }
        }
    };
    // workaround for when the tiles are cached and no events are triggered
    // this adds a constant (small) additional delay to the current play rate
    // under optimal (cached) conditions
    // @todo can this safely be shortened?
    window.setTimeout(function() {
        if (Object.keys(tilesLoading).length === 0) {
            listener.cancel();
        }
    },100);
    return listener;
}

exports.MapController = function(options, timeControls) {
    var loadListener = null,
        tileStatusCallback = options.tileStatusCallback,
        map = options.map;
    function layerAdded(layer) {
        if (layer instanceof ol.layer.Tile && layer.getSource() instanceof ol.source.TileWMS) {
            var source = layer.getSource();
            source.setTileLoadFunction((function() {
                var tileLoadFn = source.getTileLoadFunction();
                return function(tile, src) {
                    // grab the active loadListener to avoid phantom onloads
                    // when listener is cancelled
                    var currentListener = loadListener;
                    if (currentListener) {
                        currentListener.tileQueued(source);
                        var image = tile.getImage();
                        // @todo handle onerror and cancel deferred with an example
                        // to stop automatic playback
                        image.onload = image.onerror = function(event) {
                            currentListener.tileLoaded(event, source);
                        };
                    }
                    tileLoadFn(tile, src);
                };
            })());
        }
    }
    function createLoadListener() {
        if (loadListener !== null) {
            loadListener.cancel();
        }
        loadListener = new TileLoadListener(tileStatusCallback);
        return loadListener;
    }
    function updateLayers(range) {
        var layers = map.getLayers();
        var time = new Date(range.start).toISOString();
        if (range.start != range.end) {
            time += "/" + new Date(range.end).toISOString();
        }
        // TODO this only assumes a single base layer
        for (var i = 1; i < layers.getLength(); i++) {
            var layer = layers.item(i);
            if (layer instanceof ol.layer.Tile && layer.getSource() instanceof ol.source.TileWMS) {
                layer.getSource().updateParams({TIME: time});
            } else if (layer instanceof ol.layer.Vector) {
                var origStyle = layer.get('origStyle');
                if (origStyle) {
                    var func = function(feature, style) {
                        return typeof origStyle === 'function' ? origStyle.call(this, feature, style) : origStyle;
                    };
                    layer.setStyle(function(feature, style) {
                        var featureTime = Date.parse(feature.get(layer._timeAttribute));
                        if (range.start != range.end) {
                            if (featureTime >= range.start && featureTime <= range.end) {
                                return func.call(this, feature, style);
                            }
                        } else if (featureTime === range.start) {
                            return func.call(this, feature, style);
                        }
                    });
                }
            }
        }
        if (layers.getLength() > 1) {
            timeControls.defer(createLoadListener().deferred);
        }
    }
    map.getLayers().on('add', function(ev) {
        layerAdded(ev.element);
    });
    map.getLayers().forEach(layerAdded);
    timeControls.on('rangeChange', updateLayers);
};

exports.parseISODuration = parseISODuration;
