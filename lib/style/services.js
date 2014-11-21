(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.services', []);

    var defaultSymbol = {
        size: 10,
        shape: 'circle',
        graphic: null,
        graphicType: null,
        fillColor: '#000000',
        fillOpacity: 100
    };

    var defaultStroke = {
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeStyle: 'solid',
        strokeOpacity: 100
    };

    var defaultLabel = {
        attribute: null,
        fillColor: '#000000',
        fontFamily: 'Serif',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 'normal',
        placement: 'point'
    };

    var defaultUniqueClass = {
        method: 'unique',
        attribute: null,
        maxClasses: 100,
        colorRamp: null
    };

    var defaultBreaksClass = {
        method: null,
        attribute: null,
        maxClasses: 5,
        colorRamp: null
    };

    var types = [
        {
            name: 'simple point',
            displayName: 'Simple Point',
            prototype: {
                type: 'point'
            }
        },
        {
            name: 'unique point',
            displayName: 'Unique Point',
            prototype: {
                type: 'point',
                classify: defaultUniqueClass,
                rules: []
            }
        },
        {
            name: 'class point',
            displayName: 'Choropleth',
            prototype: {
                type: 'point',
                classify: defaultBreaksClass,
                rules: []
            }
        },
        {
            name: 'simple line',
            displayName: 'Simple Line',
            prototype: {
                type: 'line'
            }
        },
        {
            name: 'unique line',
            displayName: 'Unique Line',
            prototype: {
                type: 'line',
                classify: defaultUniqueClass,
                rules: []
            }
        }
    ];

    module.run(function($injector) {
        if ($injector.has('styleDefaults')) {
            var defaults = $injector.get('styleDefaults');
            [defaultSymbol, defaultStroke].forEach(function(s) {
                Object.keys(s).forEach(function(k) {
                    if (k in defaults) {
                        s[k] = defaults[k];
                    }
                });
            });
        }
    });

    module.factory('styleService', function() {
        return {
            getTypes: function(layerInfo) {
                return angular.copy(types).filter(function(f) {
                    return f.prototype.type === layerInfo.type;
                });
            },
            createStyle: function(styleType) {
                var base = {
                    symbol: defaultSymbol,
                    stroke: defaultStroke,
                    label: defaultLabel,
                    name: styleType.name
                };
                return angular.extend({}, angular.copy(base), styleType.prototype);
            }
        };
    });

    module.factory('styleChoices', function() {
        return {
            symbolizers: [
                'circle', 'square', 'triangle', 'star', 'cross', 'x'
            ],
            strokeStyle: [
                'solid', 'dashed', 'dotted'
            ],
            fontFamily: [
                'serif', 'sans-serif', 'cursive', 'monospace'
            ],
            colorRamps: [
                {
                    0: '#ff0000',
                    1: '#0000ff'
                },
                {
                    0: '#00ff00',
                    1: '#ffff00'
                }
            ],
            classMethods: [
                'Natural Breaks',
                'Equal Interval',
                'Quantile',
                'Geometric Interval',
                'Standard Deviation'
            ]
        };
    });

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

    module.factory('classificationService', function($q) {
        return {
            classify: function(layer, attribute, method) {
                var defer = $q.defer();
                var classes = (Math.random() * 10) + 1;
                var results = [];
                for (var i = 0; i < classes; i++) {
                    results.push({
                        name: 'random' + i
                    });
                }
                defer.resolve(results);
                return defer.promise;
            }
        };
    });
})();