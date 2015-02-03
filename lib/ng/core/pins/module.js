(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    var format = new ol.format.GeoJSON({
        defaultDataProjection: 'EPSG:4326'
    });

    // @todo pull this out of module?
    module.service('stStoryPins', function() {
        
        function createFeature(storyPin, projection) {
            var feature = new ol.Feature(storyPin);
            var geom = storyPin.the_geom;
            if (angular.isString(geom)) {
                geom = format.readGeometry(geom, {
                    featureProjection: projection
                });
            }
            feature.setGeometry(geom);
            return feature;
        }
        return {
            createStoryPins: function(data, projection) {
                if (!angular.isArray(data)) {
                    data = [data];
                }
                return data.map(function(s) {
                    if (s.the_geom) {
                        s.$feature = createFeature(s, projection);
                    }
                    return s;
                });
            }
        };
    });

    // @todo naive implementation on local storage for now
    module.service('stAnnotationsStore', function(mapid, stStoryPins) {
        function path() {
            return '/maps/' + mapid + '/annotations';
        }
        function get() {
            var saved = localStorage.getItem(path());
            saved = (saved === null) ? [] : JSON.parse(saved);
            saved.forEach(function(s) {
                s.the_geom = format.readGeometry(s.the_geom);
            });
            return saved;
        }
        function set(annotations) {
            annotations.forEach(function(s) {
                if (s.the_geom && !angular.isString(s.the_geom)) {
                    s.the_geom = format.writeGeometry(s.the_geom);
                }
            });
            localStorage.setItem(path(), angular.toJson(annotations));
        }
        return {
            loadAnnotations: function(projection) {
                return stStoryPins.createStoryPins(get());
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
            saveAnnotations: function(annotations) {
                var saved = get();
                var maxId = 0;
                saved.forEach(function(s) {
                    maxId = Math.max(maxId, s.id);
                });
                annotations.forEach(function(a) {
                    if (typeof a.id == 'undefined') {
                        a.id = ++maxId;
                        saved.push(a);
                    } else {
                        var existing = null;
                        for (var i = 0; i < saved.length; i++) {
                            if (saved[i].id == a.id) {
                                existing = i;
                                break;
                            }
                        }
                        if (existing !== null) {
                            saved[existing] = a;
                        } else {
                            saved.push(a);
                        }
                    }
                });
                set(saved);
            }
        };
    });

})();