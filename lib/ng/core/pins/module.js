(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    // @todo pull this out of module?
    module.service('stStoryPins', function() {
        return {
            createFeature: function(storyPin, projection) {
                var feature = new ol.Feature(storyPin);
                // @todo geometry parsing (using projection) if/when the_geom is not a geometry?
                feature.setGeometry(storyPin.the_geom);
                storyPin.$feature = feature;
                return feature;
            }
        };
    });

})();