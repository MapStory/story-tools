(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.styleTypes', []);

    var defaultSymbol = {
        size: 10,
        shape: 'circle',
        graphic: null,
        graphicType: null,
        fillColor: '#f59620',
        fillOpacity: 70,
        rotationAttribute: null,
        rotationUnits: 'degrees'
    };

    var defaultStroke = {
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeStyle: 'solid',
        strokeOpacity: 100
    };

    var defaultLabel = {
        attribute: null,
        fillColor: '#f59620',
        fontFamily: 'Serif',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 'normal',
        placement: 'point'
    };

    var defaultUniqueClass = {
        method: 'unique',
        attribute: null,
        maxClasses: 5,
        colorRamp: null
    };

    var defaultBreaksClass = {
        method: null,
        attribute: null,
        maxClasses: 5,
        colorRamp: null
    };

    var defaultRangeClass = {
        method: null,
        attribute: null,
        maxClasses: 5,
        range: {
            min: 0,
            max: 16
        }
    };

    var types = [
        {
            name: 'simple-point',
            displayName: 'Simple',
            prototype: {
                geomType: 'point'
            }
        },
        {
            name: 'unique-point',
            displayName: 'Unique',
            prototype: {
                geomType: 'point',
                classify: defaultUniqueClass
            },
            rule: {
                symbol : {
                    fillColor: 'color'
                }
            }
        },
        {
            name: 'class-point',
            displayName: 'Choropleth',
            prototype: {
                geomType: 'point',
                classify: defaultBreaksClass
            },
            rule: {
                symbol : {
                    fillColor: 'color'
                }
            }
        },
        {
            name: 'graduated-point',
            displayName: 'Graduated',
            prototype: {
                geomType: 'point',
                classify: defaultRangeClass
            },
            rule: {
                symbol: {
                    size: 'range'
                }
            }
        },
        {
            name: 'simple-line',
            displayName: 'Simple',
            prototype: {
                geomType: 'line'
            }
        },
        {
            name: 'unique-line',
            displayName: 'Unique',
            prototype: {
                geomType: 'line',
                classify: defaultUniqueClass
            },
            rule: {
                stroke : {
                    strokeColor: 'color'
                }
            }
        },
        {
            name: 'graduated-line',
            displayName: 'Graduated',
            prototype: {
                geomType: 'line',
                classify: defaultRangeClass
            },
            rule: {
               stroke : {
                   strokeColor: 'color',
                   strokeWidth: 'range'
               }
            }
        },
        {
            name: 'simple-polygon',
            displayName: 'Simple',
            prototype: {
                geomType: 'polygon'
            }
        },
        {
            name: 'unique-polygon',
            displayName: 'Unique',
            prototype: {
                geomType: 'polygon',
                classify: defaultUniqueClass
            },
            rule: {
                symbol : {
                    fillColor: 'color'
                }
            }
        },
        {
            name: 'class-polygon',
            displayName: 'Choropleth',
            prototype: {
                geomType: 'polygon',
                classify: defaultBreaksClass
            },
            rule: {
                symbol : {
                    fillColor: 'color'
                }
            }
        }
    ];

    module.run(function($injector) {
        if ($injector.has('stStyleDefaults')) {
            var defaults = $injector.get('stStyleDefaults');
            [defaultSymbol, defaultStroke].forEach(function(s) {
                Object.keys(s).forEach(function(k) {
                    if (k in defaults) {
                        s[k] = defaults[k];
                    }
                });
            });
        }
    });

    module.factory('stStyleTypes', function() {
        return {
            getTypes: function(storyLayer, styleLimit) {
                var styles = angular.copy(types).filter(function(f) {
                    var prop = storyLayer.get('geomType') || storyLayer.get('metadata').geomType;
                    return f.prototype.geomType === prop;
                });

                // if there are limited styles,
                //  limit the list to those that are offered.
                if (styleLimit !== undefined) {
                  styles = styles.filter(function(t) {
                    return (styleLimit.indexOf(t.name) >= 0);
                  });
                }

                return styles;
            },
            getStyleType: function(typeName) {
                var match = types.filter(function(t) {
                    return t.name == typeName;
                });
                if (match.length >  1) {
                    throw 'duplicate type names!';
                }
                return match.length === 0 ? null : match[0];
            },
            createStyle: function(styleType) {
                var base = {
                    symbol: styleType.symbol || defaultSymbol,
                    stroke: styleType.stroke || defaultStroke,
                    label: defaultLabel,
                    typeName: styleType.name
                };
                var style = angular.extend({}, angular.copy(base), styleType.prototype);
                if ('classify' in style) {
                    style.rules = styleType.rules || [];
                }
                return style;
            }
        };
    });
})();
