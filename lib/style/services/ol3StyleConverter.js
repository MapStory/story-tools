(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.ol3StyleConverter', []);

    module.factory('ol3StyleConverter', function() {
        return {
            generateShape: function(style, fill, stroke) {
                var shape = style.symbol.shape, size = style.symbol.size;
                if (shape === 'circle') {
                    return new ol.style.Circle({
                        fill: fill,
                        stroke: stroke,
                        radius: size
                    });
                } else if (shape === 'square') {
                    return new ol.style.RegularShape({
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        angle: Math.PI / 4
                    });
                } else if (shape === 'triangle') {
                    return new ol.style.RegularShape({
                        fill: fill,
                        stroke: stroke,
                        points: 3,
                        radius: size,
                        angle: 0
                    });
                } else if (shape === 'star') {
                    return new ol.style.RegularShape({
                        fill: fill,
                        stroke: stroke,
                        points: 5,
                        radius: size,
                        radius2: 0.5*size,
                        angle: 0
                    });
                } else if (shape === 'cross') {
                    return new ol.style.RegularShape({
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        radius2: 0,
                        angle: 0
                    });
                } else if (shape === 'x') {
                    return new ol.style.RegularShape({
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        radius2: 0,
                        angle: Math.PI / 4
                    });
                }
            },
            generateStyle: function(style) {
                var fill = new ol.style.Fill({
                    color: style.symbol.fillColor
                });
                var lineDash;
                if (style.stroke.strokeStyle === 'dashed') {
                    lineDash = [5];
                } else if (style.stroke.strokeStyle === 'dotted') {
                    lineDash = [1,2];
                }
                var stroke = new ol.style.Stroke({
                    lineDash: lineDash,
                    color: style.stroke.strokeColor,
                    width: style.stroke.strokeWidth
                });
                var styles = [
                    new ol.style.Style({
                        image: this.generateShape(style, fill, stroke),
                        fill: fill,
                        stroke: stroke
                    })
                ];
                return styles;
            }
        };
    });
})();
