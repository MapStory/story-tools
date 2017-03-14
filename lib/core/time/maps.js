/*jshint loopfunc: true */
var utils = require('./utils');
var moment = require('moment');

/**
 * Read the provide ol3 WMS capabilities document
 * @param {type} caps
 * @returns an object of name->[date|interval]|interval-range mappings
 */
exports.readCapabilitiesTimeDimensions = function(caps, openlayers2) {
    var dimensions = {};
    function readRange(subparts) {
        if (subparts.length < 2) {
            throw new Error('expected 2 parts for range : ' + subparts);
        }
        var range = utils.createRange(subparts[0], subparts[1]);
        if (subparts.length == 3) {
            range.duration = subparts[2];
            range = new utils.Interval(range);
        }
        return range;
    }
    function readPart(part) {
        var subparts = part.split('/');
        if (subparts.length == 1) {
            return utils.getTime(subparts[0]);
        } else {
            return readRange(subparts);
        }
    }
    function parse(dimension) {
        var dims = openlayers2 ? dimension : dimension.split(',');
        if (dims.length == 1) {
            var read = readPart(dims[0]);
            return typeof read === 'number' ? [read] : read;
        }
        return dims.map(readPart);
    }
    if (openlayers2 === true) {
        if (caps.dimensions && caps.dimensions.time) {
            dimensions = parse(caps.dimensions.time.values);
        } else {
            dimensions = undefined;
        }
    } else {
        // @todo need to make layer scanning recursive?
        caps.value.capability.layer.layer.forEach(function(lyr) {
            if (lyr.dimension && lyr.extent[0].value) {
                dimensions[lyr.name] = parse(lyr.extent[0].value);
            }
        });
    }
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
            if (tileStatusCallback) {
                tileStatusCallback(0);
            }
        },
        tileQueued: function(source) {
            if (cancelled) {
                return;
            }
            var key;
            if (source instanceof ol.source.TileWMS) {
                key = source.getUrls()[0];
            } else if (source instanceof ol.source.ImageWMS) {
                key = source.getUrl();
            }
            tilesLoading[key] = (tilesLoading[key] || 0) + 1;
            if (tileStatusCallback) {
                tileStatusCallback(remainingTiles());
            }
        },
        tileLoaded: function(event, source) {
            if (cancelled) {
                return;
            }
            var key;
            if (source instanceof ol.source.TileWMS) {
                key = source.getUrls()[0];
            } else if (source instanceof ol.source.ImageWMS) {
                key = source.getUrl();
            }
            tilesLoading[key] -= 1;
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

function filterVectorLayer(storyLayer, range) {
    var timeAttr = storyLayer.get('timeAttribute'), l_features = storyLayer.get('features') || storyLayer.getLayer().get('features');
    if (timeAttr === undefined || l_features === undefined) {
        return;
    }
    range = utils.createRange(range);
    // loop over all original features and filter them
    var features = [];
    var layer = storyLayer.getLayer();
    visitAllLayerFeatureTimes(storyLayer, function(f,r) {
        if (range.intersects(r)) {
            features.push(f);
        }
    }, l_features);
    layer.getSource().clear(true);
    layer.getSource().addFeatures(features);
}


function filterVectorBoxLayer(storyLayer, range) {
    var timeAttr = storyLayer.get('timeAttribute'), l_features = storyLayer.get('features');
    if (timeAttr === undefined || l_features === undefined) {
        return;
    }
    range = utils.createRange(range);
    // loop over all original features and filter them
    var features = [];
    visitAllLayerFeatureTimes(storyLayer, function(f,r) {
        if (range.intersects(r)) {
            features.push(f);
        }
    });

    return features;
}
/**
 * Call the provided visitor function on the specified features using the
 * configuration provided in the layer. The visitor function will be called
 * with the feature, and start and end time, if any. The features visited will
 * be, in order of priority: the provided (optional) features argument, the
 * layer property 'features', the layer's source features.
 * @param {StoryLayer} story layer
 * @param {function} visitor function(feature, start, end)
 * @param {array} features (opitonal)
 */
function visitAllLayerFeatureTimes(storyLayer, visitor, features) {
    var startAtt = storyLayer.get('timeAttribute');
    var endAtt = storyLayer.get('endTimeAttribute');
    var rangeGetter;
    var layer = storyLayer.getLayer();
    features = features || storyLayer.get('features') || layer.getSource().getFeatures();
    if (endAtt) {
        rangeGetter = function(f) {
            if(f.range){
                return f.range;
            }else {
                var start = f.get(startAtt);
                var end = f.get(endAtt);
                return utils.createRange(start, end);
            }
        };
    } else {
        rangeGetter = function(f) {
            if(f.range){
                return f.range;
            }else {
                var start = f.get(startAtt);
                return utils.createRange(start, start);
            }
        };
    }
    utils.visitRanges(features, rangeGetter, visitor);
}

/**
 * Compute the range of the provided features using the layer's configured
 * timeattributes. If the optional features array is omitted, the features
 * will come from the layer.
 * @param {StoryLayer} storyLayer
 * @param {array} features (optional)
 * @returns {storytools.core.time.Range} range of features
 */
exports.computeVectorRange = function(storyLayer, features) {
    var startAtt = storyLayer.get('timeAttribute');
    var endAtt = storyLayer.get('endTimeAttribute');
    var layer = storyLayer.getLayer();
    features = features || storyLayer.get('features') || layer.getSource().getFeatures();
    return utils.computeRange(features, function(f) {
        return utils.createRange(f.get(startAtt), f.get(endAtt));
    });
};

exports.filterVectorLayer = filterVectorLayer;
exports.filterVectorBoxLayer = filterVectorBoxLayer;

exports.MapController = function(options, timeControls) {
    var loadListener = null,
          tileStatusCallback = options.tileStatusCallback,
          storyMap = options.storyMap;
    function layerAdded(layer) {
        var source, image;
        var loaded = function(event) {
            // grab the active loadListener to avoid phantom onloads
            // when listener is cancelled
            var currentListener = loadListener;
            if (currentListener) {
                currentListener.tileLoaded(event, source);
            }
        };
        var loadstart = function() {
            // grab the active loadListener to avoid phantom onloads
            // when listener is cancelled
            var currentListener = loadListener;
            if (currentListener) {
                currentListener.tileQueued(source);
            }
        };
        if (layer instanceof ol.layer.Tile && layer.getSource() instanceof ol.source.TileWMS) {
            source = layer.getSource();
            source.on('tileloadstart', loadstart);
            source.on('tileloadend', loaded);
            // @todo handle onerror and cancel deferred with an example
            // to stop automatic playback
            source.on('tileloaderror', loaded);
        } else if (layer instanceof ol.layer.Image && layer.getSource() instanceof ol.source.ImageWMS) {
            source = layer.getSource();
            source.on('imageloadstart', loadstart);
            source.on('imageloadend', loaded);
            source.on('imageloaderror', loaded);
        }
    }
    function createLoadListener() {
        if (loadListener !== null) {
            loadListener.cancel();
        }
        loadListener = new TileLoadListener(tileStatusCallback);
        return loadListener;
    }

    function updateCenterAndZoom(range){
        var currentBoxes = filterVectorBoxLayer(storyMap.storyBoxesLayer, range);

        if(currentBoxes && currentBoxes.length > 0) {
            var currentBox = currentBoxes[0];

            if (currentBox.center) {
                storyMap.animateCenterAndZoom(currentBox.center, currentBox.zoom);
            }
        }else{
            if (storyMap.returnToExtent) {
                storyMap.animateCenterAndZoom(storyMap.getCenter(), storyMap.getZoom());
            }
        }
    }

    function updateLayers(range) {
        var storyLayers = storyMap.getStoryLayers();
        var time = new Date(range.start).toISOString();
        if (range.start != range.end) {
            time += "/" + new Date(range.end).toISOString();
        }
        for (var i = 0; i < storyLayers.getLength(); i++) {
            var storyLayer = storyLayers.item(i), layer = storyLayer.getLayer();
            if ((layer instanceof ol.layer.Tile && layer.getSource() instanceof ol.source.TileWMS) ||
                  (layer instanceof ol.layer.Image && layer.getSource() instanceof ol.source.ImageWMS)) {
                if (storyLayer.get('times')) {
                    layer.getSource().updateParams({TIME: time});
                }
            } else if (layer instanceof ol.layer.Vector) {
                filterVectorLayer(storyLayer, range);
            }
        }
        // this is a non-story layer - not part of the main collection
        filterVectorLayer(storyMap.storyPinsLayer, range);
        if (storyLayers.getLength() >= 1) {
            timeControls.defer(createLoadListener().deferred);
        }
    }
    var me = this;
    me.layers = {};
    storyMap.getStoryLayers().on('add', function(ev) {
        var lyr = ev.element, id = lyr.get('id');
        if (me.layers[id] !== true) {
            layerAdded(lyr.getLayer());
            me.layers[id] = true;
        }
    });
    storyMap.getStoryLayers().forEach(function(lyr) {
        var id = lyr.get('id');
        if (id !== undefined && me.layers[id] !== true) {
            layerAdded(lyr.getLayer());
            me.layers[id] = true;
        }
    });
    timeControls.on('rangeChange', updateCenterAndZoom);
    timeControls.on('rangeChange', updateLayers);
};
