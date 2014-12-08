(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.ol3StyleConverter', []);

    module.factory('ol3StyleConverter', function() {
        return {
            generateShapeConfig: function(style, fill, stroke) {
                var shape = style.symbol.shape, size = style.symbol.size;
                if (shape === 'circle') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        radius: size
                    };
                } else if (shape === 'square') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        angle: Math.PI / 4
                    };
                } else if (shape === 'triangle') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 3,
                        radius: size,
                        angle: 0
                    };
                } else if (shape === 'star') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 5,
                        radius: size,
                        radius2: 0.5*size,
                        angle: 0
                    };
                } else if (shape === 'cross') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        radius2: 0,
                        angle: 0
                    };
                } else if (shape === 'x') {
                    return {
                        fill: fill,
                        stroke: stroke,
                        points: 4,
                        radius: size,
                        radius2: 0,
                        angle: Math.PI / 4
                    };
                }
            },
            generateShape: function(style, fill, stroke) {
                var config = this.generateShapeConfig(style, fill, stroke);
                if (style.symbol.shape === 'circle') {
                    return new ol.style.Circle(config);
                } else {
                    return new ol.style.RegularShape(config);
                }
            },
            getText: function(style, feature) {
                return '' + feature.get(style.label.attribute);
            },
            generateText: function(style, fill, stroke, feature) {
                if (style.label && style.label.attribute !== null) {
                    return new ol.style.Text({
                        fill: new ol.style.Fill({color: style.label.fillColor}),
                        stroke: stroke,
                        font: style.label.fontWeight + ' ' + style.label.fontSize + 'px ' + style.label.fontFamily,
                        text: this.getText(style, feature)
                    });
                }
            },
            getColor: function(color, opacity) {
                var rgba = ol.color.asArray(color);
                if (opacity !== undefined) {
                    rgba = rgba.slice();
                    rgba[3] = opacity/100;
                }
                return 'rgba(' + rgba.join(',') + ')';
            },
            generateStyle: function(style, feature, resolution) {
                var result;
                if (!this.styleCache_) {
                    this.styleCache_ = {};
                }
                var key = JSON.stringify(style);
                if (this.styleCache_[key]) {
                    if (!this.styleCache_[key].length) {
                        var key2;
                        if (style.classify && style.classify.attribute) {
                            key2 = feature.get(style.classify.attribute);
                        } else {
                            key2 = this.getText(style, feature);
                        }
                        if (this.styleCache_[key][key2]) {
                            return this.styleCache_[key][key2];
                        }
                    } else {
                        return this.styleCache_[key];
                    }
                }
                var stroke;
                if (style.stroke) {
                    var lineDash;
                    if (style.stroke.strokeStyle === 'dashed') {
                        lineDash = [5];
                    } else if (style.stroke.strokeStyle === 'dotted') {
                        lineDash = [1,2];
                    }
                    stroke = new ol.style.Stroke({
                        lineDash: lineDash,
                        color: this.getColor(style.stroke.strokeColor, style.stroke.strokeOpacity),
                        width: style.stroke.strokeWidth
                    });
                }
                if (style.classify && style.classify.attribute !== null && style.rules.length > 0) {
                    for (var i=0, ii=style.rules.length; i<ii; ++i) {
                        if (feature.get(style.classify.attribute) === style.rules[i].value) {
                            // since there is no way for the user to select the point symbol in this case
                            // we default to a circle with a 5px radius
                            if (style.geomType === 'point' && style.rules[i].style.symbol.fillColor) {
                                result = [new ol.style.Style({
                                    image: new ol.style.Circle({
                                        fill: new ol.style.Fill({color: style.rules[i].style.symbol.fillColor}),
                                        stroke: stroke,
                                        radius: 5
                                    })
                                })];
                            } else if (style.geomType === 'line' && style.rules[i].style.stroke.strokeColor) {
                                result = [new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: style.rules[i].style.stroke.strokeColor,
                                        width: 2
                                    })
                                })];
                            }
                            // TODO other geometry types
                        }
                    }
                    if (result) {
                        if (!this.styleCache_[key]) {
                            this.styleCache_[key] = {};
                        }
                        this.styleCache_[key][feature.get(style.classify.attribute)] = result;
                    }
                } else {
                    var fill = new ol.style.Fill({
                        color: this.getColor(style.symbol.fillColor, style.symbol.fillOpacity)
                    });
                    result = [
                        new ol.style.Style({
                            image: this.generateShape(style, fill, stroke),
                            fill: fill,
                            stroke: stroke,
                            text: this.generateText(style, fill, stroke, feature)
                        })
                    ];
                }
                if (result) {
                    var hasText = result[0].getText();
                    if (hasText) {
                        if (!this.styleCache_[key]) {
                            this.styleCache_[key] = {};
                        }
                        this.styleCache_[key][this.getText(style, feature)] = result;
                    } else {
                        this.styleCache_[key] = result;
                    }
                }
                return result;
            }
        };
    });
})();
