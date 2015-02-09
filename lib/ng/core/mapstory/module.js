(function() {
    'use strict';

    var module = angular.module('storytools.core.mapstory', [
    ]);

    // @todo naive implementation on local storage for now
    module.service('stMapConfigStore', function(mapid) {
        function path() {
            return '/maps/' + mapid;
        }
        function get() {
            var saved = localStorage.getItem(path());
            saved = (saved === null) ? {} : angular.fromJson(saved);
            return saved;
        }
        function set(mapConfig) {
            localStorage.setItem(path(), angular.toJson(mapConfig));
        }
        return {
            loadConfig: function() {
                return get();
            },
            saveConfig: function(mapConfig) {
                set(mapConfig);
            }
        };
    });

})();
