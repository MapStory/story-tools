(function() {
    'use strict';

    var module = angular.module('storytools.core.mapstory', [
    ]);

    // @todo naive implementation on local storage for now
    module.service('stMapConfigStore', function() {
        function path(mapid) {
            return '/maps/' + mapid;
        }
        function get(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? {} : angular.fromJson(saved);
            return saved;
        }
        function set(mapConfig) {
            localStorage.setItem(path(mapConfig.id), angular.toJson(mapConfig));
        }
        function list() {
            var maps = [];
            var pattern = new RegExp('/maps/(\\d+)$');
            Object.getOwnPropertyNames(localStorage).forEach(function(key) {
                var match = pattern.exec(key);
                if (match) {
                    // name/title eventually
                    maps.push({
                        id: match[1]
                    });
                }
            });
            return maps;
        }
        function nextId() {
            var lastId = 0;
            var existing = list().map(function(m) {
                return m.id;
            });
            existing.sort();
            if (existing.length) {
                lastId = parseInt(existing[existing.length - 1]);
            }
            return lastId + 1;
        }
        return {
            listMaps: function() {
                return list();
            },
            loadConfig: function(mapid) {
                return get(mapid);
            },
            saveConfig: function(mapConfig) {
                if (!angular.isDefined(mapConfig.id)) {
                    mapConfig.id = nextId();
                }
                set(mapConfig);
            }
        };
    });

})();
