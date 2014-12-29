(function() {
    'use strict';

    var module = angular.module('storytools.core.time.services', []);

    module.service('stTimeControlsFactory', function($rootScope) {
        return {
            create: function(options) {
                if (! options.map) {
                    throw 'timeControls requires map';
                }
                var annotations = options.annotations || [];
                var data = options.data || options.map.getLayers().item(1)._times;
                return storytools.core.time.create({
                    annotations: annotations,
                    map: options.map,
                    data: data,
                    playback: options.playbackOptions,
                    tileStatusCallback: function(remaining) {
                        $rootScope.$broadcast('tilesLoaded', remaining);
                    }
                });
            }
        };
    });
})();