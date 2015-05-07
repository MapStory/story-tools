var format = new ol.format.GeoJSON({
    defaultDataProjection: 'EPSG:4326'
});


var StoryPin = function(data, projection) {
    ol.Feature.call(this, data);
    if (data) {
        if (data.the_geom) {
            var geom = data.the_geom;
            if (typeof geom === 'string' || 'type' in geom) {
                geom = format.readGeometry(geom, {
                    featureProjection: projection
                });
            }
            this.setGeometry(geom);
            delete data.the_geom;
        }
        this.setId(data.id);
    }
};
StoryPin.prototype = Object.create(ol.Feature.prototype);
StoryPin.prototype.constructor = StoryPin;
// expose these simply for the timeline - it doesn't know they're features
['id','start_time','end_time','content','title','in_timeline','in_map'].forEach(function(prop) {
    Object.defineProperty(StoryPin.prototype, prop, {
        get: function() {
            var val = this.get(prop);
            return typeof val === 'undefined' ? null : val;
        },
        set: function(val) {
            this.set(prop, val);
        }
    });
});

/*
 var start = ann.start_time != null ? ann.start_time : range.start;
 var end = ann.end_time != null ? ann.end_time : range.end;
 var type = start === end ? 'box' : 'range';
 return {
 id: ann.id,
 start: start,
 end: end,
 content: ann.content || ann.title,
 title: ann.title,
 type: type
 };
 */

function getTime(props, prop) {
    var val = props[prop];
    if (typeof val != 'undefined') {
        return val *= 1000;
    }
    return null;
}

/**
 * Load StoryPins from geojson, reprojecting from 4326 to the provided
 * projection.
 * @param {Object} geojson
 * @param {String} projection
 * @returns array of StoryPin features
 */
exports.loadFromGeoJSON = function(geojson, projection) {
    if (projection) {
        projection = ol.proj.get(projection);
    }
    return geojson.features.map(function(f) {
        var props = f.properties;
        props.the_geom = f.geometry;
        props.id = f.id;
        props.start_time = getTime(props, 'start_time');
        props.end_time = getTime(props, 'end_time');
        return new StoryPin(props, projection);
    });
};

exports.StoryPin = StoryPin;