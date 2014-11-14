(function() {
    'use strict';

    var module = angular.module('style.services', []);

    var defaultSymbol = {
        size: 10,
        shape: 'circle',
        graphic: null,
        graphicType: null
    };

    var defaultStroke = {
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeStyle: 'solid',
        fillColor: '#000000',
        fillOpacity: 100,
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
            active: true,
            prototype: {
                symbol: defaultSymbol,
                stroke: defaultStroke,
                label: defaultLabel
            }
        },
        {
            name: 'unique point',
            displayName: 'Unique Point',
            prototype: {
                symbol: defaultSymbol,
                stroke: defaultStroke,
                label: defaultLabel,
                classify: defaultUniqueClass,
                rules: []
            }
        },
        {
            name: 'class point',
            displayName: 'Choropleth',
            prototype: {
                symbol: defaultSymbol,
                stroke: defaultStroke,
                label: defaultLabel,
                classify: defaultBreaksClass,
                rules: []
            }
        }
    ];
    var styles = {};

    module.factory('styleService', function() {
        var currentStyleType;
        return {
            getTypes: function() {
                return types;
            },
            getStyle: function(typeName) {
                var style;
                if (typeName in styles) {
                    style = styles[typeName];
                } else {
                    var styleType = types.filter(function(t) {
                        return t.name == typeName;
                    });
                    if (styleType.length === 0) {
                        throw 'invalid style type: ' + typeName;
                    }
                    styleType = styleType[0];
                    style = angular.copy(styleType.prototype);
                    style.name = styleType.name;
                }
                return style;
            },
            setStyles: function(styles) {
                throw 'not implemented';
            },
            getCurrentStyleType: function() {
                return currentStyleType || types[0];
            },
            setCurrentStyleType: function(styleType) {
                currentStyleType = styleType;
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
                'serif','sans-serif','cursive','monospace'
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