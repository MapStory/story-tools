(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    var format = new ol.format.GeoJSON({
        defaultDataProjection: 'EPSG:4326'
    });

    function readGeometry(data, projection) {
        var geom = data.the_geom;
        if (angular.isString(geom)) {
            geom = format.readGeometry(geom, {
                featureProjection: projection
            });
        }
        return geom;
    }

    function createFeature(data, projection) {
        var feature = new ol.Feature(data);
        var geom = readGeometry(data, projection);
        feature.setGeometry(geom);
        // for now, keep track of the related storypin
        feature.set('storyPin', data);
        return feature;
    }

    function StoryPin(data) {
        this.appearance = null;
        this.title = null;
        this.content = null;
        this.start_time = null;
        this.end_time = null;
        this.in_map = false;
        this.in_timeline = false;
        this.the_geom = null;
        this.id = null;
        if (data) {
            this.update(data);
        }
    }
    StoryPin.prototype.update = function(data) {
        var toCopy = ['appearance','title','content','start_time','end_time','in_map','in_timeline'];
        for (var i = 0; i < toCopy.length; i++) {
            var val = data[toCopy[i]];
            if (typeof val !== 'undefined') {
                this[toCopy[i]] = val;
            }
        }
        if (this.id === null && data.id) {
            this.id = data.id;
        }
        if (typeof data.the_geom != 'undefined') {
            this.the_geom = data.the_geom;
            if (this.the_geom) {
                // @todo we're always creating a new feature
                this.$feature = createFeature(this);
            } else {
                this.$feature = null;
            }
        } else {
            // @todo we're always creating a new feature
            this.$feature = createFeature(this);
        }
    };
    StoryPin.createStoryPins = function(data, projection) {
        if (!angular.isArray(data)) {
            data = [data];
        }
        // @todo deal w/ reproject from 4326 to projection
        return data.map(function(s) {
            return new StoryPin(s);
        });
    };

    function StoryPinLayerManager(storyPins) {
        // @todo - provisional default story pins style
        var defaultStyle = [new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                stroke: new ol.style.Stroke({color: 'red', width: 1}),
                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                    stroke: new ol.style.Stroke({color: 'red', width: 1})
                })
            })];
        this.storyPinsLayer = new ol.layer.Vector({
            timeAttribute: 'start_time',
            endTimeAttribute: 'end_time',
            source: new ol.source.Vector(),
            style: defaultStyle
        });
        this.storyPins = [];
        this.pinsChanged(storyPins || [], 'add', true);
    }
    StoryPinLayerManager.prototype.pinsChanged = function(pins, action, dontSave) {
        var i;
        if (action == 'delete') {
            for (i = 0; i < pins.length; i++) {
                var pin = pins[i];
                for (var j = 0, jj = this.storyPins.length; j < jj; j++) {
                    if (this.storyPins[j].id == pin.id) {
                        this.storyPins.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (action == 'add') {
            for (i = 0; i < pins.length; i++) {
                this.storyPins.push(pins[i]);
            }
        } else if (action == 'change') {
            // provided edits could be used to optimize below
        } else {
            throw new Error('action? :' + action);
        }
        // @todo optimize by looking at changes
        var features = [];
        this.storyPins.forEach(function(s) {
            if (s.$feature) {
                features.push(s.$feature);
            }
        });
        var times = this.storyPins.map(function(p) {
            return storytools.core.utils.createRange(p.start_time, p.end_time);
        });
        this.storyPinsLayer.set('times', times);
        this.storyPinsLayer.set('features', features);
        if (dontSave !== true) {
            StoryPinLayerManager.$stAnnotationsStore.saveAnnotations(this.storyPins);
        }
    };

    module.factory('StoryPinLayerManager', function(stAnnotationsStore) {
        StoryPinLayerManager.$stAnnotationsStore = stAnnotationsStore;
        return StoryPinLayerManager;
    });

    module.constant('StoryPin', StoryPin);

    // @todo naive implementation on local storage for now
    module.service('stAnnotationsStore', function(StoryPin) {
        function path(mapid) {
            return '/maps/' + mapid + '/annotations';
        }
        function get(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? [] : JSON.parse(saved);
            saved.forEach(function(s) {
                s.the_geom = format.readGeometry(s.the_geom);
            });
            return saved;
        }
        function set(mapid, annotations) {
            annotations.forEach(function(s) {
                if (s.the_geom && !angular.isString(s.the_geom)) {
                    s.the_geom = format.writeGeometry(s.the_geom);
                }
            });
            localStorage.setItem(path(mapid), angular.toJson(annotations));
        }
        return {
            loadAnnotations: function(mapid, projection) {
                return StoryPin.createStoryPins(get(mapid), projection);
            },
            deleteAnnotations: function(annotations) {
                var saved = get();
                var toDelete = annotations.map(function(d) {
                    return d.id;
                });
                saved = saved.filter(function(s) {
                    return toDelete.indexOf(s.id) < 0;
                });
                set(saved);
            },
            saveAnnotations: function(mapid, annotations) {
                var saved = get();
                var maxId = 0;
                saved.forEach(function(s) {
                    maxId = Math.max(maxId, s.id);
                });
                annotations.forEach(function(a) {
                    if (typeof a.id == 'undefined') {
                        a.id = ++maxId;
                    }
                });
                set(mapid, annotations);
            }
        };
    });

})();