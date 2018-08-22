(function() {
    'use strict';
    var module = angular.module('storytools.core.mapstory.localStorageSvc', []);

    module.service('stLocalStorageSvc', [function() {
        function path(mapid) {
            return '/maps/' + mapid;
        }

        var localStorageHandler = {};

        localStorageHandler.get = function(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? {} : angular.fromJson(saved);
            return saved;
        };

        localStorageHandler.set = function(mapConfig) {
            localStorage.setItem(path(mapConfig.id), angular.toJson(mapConfig));
        };

        localStorageHandler.list = function() {
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
        };

        localStorageHandler.nextId = function() {
            var lastId = 0;
            var existing = localStorageHandler.list().map(function(m) {
                return m.id;
            });
            existing.sort();
            if (existing.length) {
                lastId = parseInt(existing[existing.length - 1]);
            }
            return lastId + 1;
        };

        return {
            listMaps: function() {
                return localStorageHandler.list();
            },
            loadConfig: function(mapid) {
                return localStorageHandler.get(mapid);
            },
            saveConfig: function(mapConfig) {
                if (!angular.isDefined(mapConfig.id)) {
                    mapConfig.id = localStorageHandler.nextId();
                }
                localStorageHandler.set(mapConfig);
            }
        };
    }]);
})();
