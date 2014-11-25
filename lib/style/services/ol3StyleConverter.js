(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.ol3StyleConverter', []);

    module.factory('ol3StyleConverter', function() {
        return {
            generateStyle: function(style) {
                var fill = new ol.style.Fill({
                    color: style.symbol.fillColor
                });
                var stroke = new ol.style.Stroke({
                    color: style.stroke.strokeColor,
                    width: style.stroke.strokeWidth
                });
                var styles = [
                    new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: fill,
                            stroke: stroke,
                            radius: style.symbol.size
                        }),
                        fill: fill,
                        stroke: stroke
                    })
                ];
                return styles;
            }
        };
    });
})();