(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    var pins = storytools.core.maps.pins;

    function StoryPinLayerManager() {
        this.storyPins = [];
        this.map = null;
    }
    StoryPinLayerManager.prototype.pinsChanged = function(pins, action) {
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
        var times = this.storyPins.map(function(p) {
            if (p.start_time > p.end_time) {
                return storytools.core.utils.createRange(p.end_time, p.start_time);
            } else {
                return storytools.core.utils.createRange(p.start_time, p.end_time);
            }
        });
        this.map.storyPinsLayer.set('times', times);
        this.map.storyPinsLayer.set('features', this.storyPins);
    };
    StoryPinLayerManager.prototype.loadFromGeoJSON = function(geojson, projection) {
        if (geojson && geojson.features) {
            var loaded = pins.loadFromGeoJSON(geojson, projection);
            this.pinsChanged(loaded, 'add', true);
        }
    };

    module.service('StoryPinLayerManager', StoryPinLayerManager);

    module.constant('StoryPin', pins.StoryPin);

    // @todo naive implementation on local storage for now
    module.service('stAnnotationsStore', function(StoryPinLayerManager) {
        function path(mapid) {
            return '/maps/' + mapid + '/annotations';
        }
        function get(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? [] : JSON.parse(saved);
            // TODO is this still needed?
            /*saved.forEach(function(s) {
                s.the_geom = format.readGeometry(s.the_geom);
            });*/
            return saved;
        }
        function set(mapid, annotations) {
            // TODO is this still needed?
            /*annotations.forEach(function(s) {
                if (s.the_geom && !angular.isString(s.the_geom)) {
                    s.the_geom = format.writeGeometry(s.the_geom);
                }
            });*/
            localStorage.setItem(path(mapid),
                new ol.format.GeoJSON().writeFeatures(annotations,
                    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
            );
        }
        return {
            loadAnnotations: function(mapid, projection) {
                return StoryPinLayerManager.loadFromGeoJSON(get(mapid), projection);
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
                var clones = [];
                annotations.forEach(function(a) {
                    if (typeof a.id == 'undefined') {
                        a.id = ++maxId;
                    }
                    var clone = a.clone();
                    if (a.get('start_time') !== undefined) {
                        clone.set('start_time', a.get('start_time')/1000);
                    }
                    if (a.get('end_time') !== undefined) {
                        clone.set('end_time', a.get('end_time')/1000);
                    }
                    clones.push(clone);
                });
                set(mapid, clones);
            }
        };
    });

})();
