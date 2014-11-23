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
            name: 'simple point',
            displayName: 'Simple',
            prototype: {
                geomType: 'point'
            }
        },
        {
            name: 'unique point',
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
            name: 'class point',
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
            name: 'graduated point',
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
            name: 'simple line',
            displayName: 'Simple',
            prototype: {
                geomType: 'line'
            }
        },
        {
            name: 'unique line',
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
                    return f.prototype.geomType === layerInfo.geomType;
                });
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
                    symbol: defaultSymbol,
                    stroke: defaultStroke,
                    label: defaultLabel,
                    typeName: styleType.name
                };
                var style = angular.extend({}, angular.copy(base), styleType.prototype);
                if ('classify' in style) {
                    style.rules = [];
                }
                return style;
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
            // @todo build these statically ahead of time using color-scheme-js
            colorPalettes: [
                {
                    name: 'colors 1',
                    vals: ["#ff9900", "#b36b00", "#ffe6bf", "#ffcc80",
                        "#00b366", "#007d48", "#bfffe4", "#80ffc9",
                        "#400099", "#2d006b", "#dabfff", "#b580ff"]
                },
                {
                    name: 'colors 2',
                    vals: ["#ff99aa", "#b36baa", "#aae6bf", "#aacc80",
                        "#00b366", "#007d48", "#bfaae4", "#80aac9",
                        "#40aa99", "#2daa6b", "#dabfaa", "#b580aa"]
                }
            ],
            classMethods: [
                'Natural Breaks',
                'Equal Interval',
                'Quantile',
                'Geometric Interval',
                'Standard Deviation'
            ],
            getPalette: function(name) {
                var found = this.colorPalettes.filter(function(p) {
                    return p.name === name;
                });
                return found.length ? found[0] : null;
            }
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

    // @todo this is a dummy
    module.factory('classificationService', function($q) {
        return {
            classify: function(layer, attribute, method, numClasses) {
                var defer = $q.defer();
                var classes = numClasses || (Math.random() * 10) + 1;
                var classBreak = (Math.random() * 10).toFixed(2) + 1;
                var results = [];
                var unique = method == 'unique';
                if (unique) {
                    classBreak = Math.floor(classBreak);
                }
                for (var i = 0; i < classes; i++) {
                    var value =  unique ? classBreak * i : {
                        min : classBreak * i,
                        max: classBreak * (i + 1)
                    };
                    var rule = {
                        name: unique ? value : value.min + '-' + value.max
                    };
                    rule[unique ? 'value' : 'range'] = value;
                    results.push(rule);
                }
                defer.resolve(results);
                return defer.promise;
            }
        };
    });

    module.factory('ruleStyleService', function(styleService, styleChoices) {
        function hex(v) {
            return ('00' + v.toString(16)).slice(-2);
        }
        function colorRampValues(ramp, num) {
            var colors = [];
            var rampStops = Object.keys(ramp).filter(function(x) {
                return x.toString().charAt(0) != '$';
            });
            rampStops.sort();
            var ms = rampStops.map(function(k) {
                var val = ramp[k];
                return [parseInt('0x' + val.substr(1,2)),
                        parseInt('0x' + val.substr(3,2)),
                        parseInt('0x' + val.substr(5,2))
                ];
            });
            var step = 1.0/(num - 1);
            function getStops(val) {
                // @todo find stops
                return [rampStops[0], rampStops[1]];
            }

            // @todo hsv interpolation (yields brighter colors)?
            for (var i = 0; i < num; i++) {
                var val = i * step;
                var stops = getStops(val);
                var r = (val - stops[0]) / (stops[1] - stops[0]);
                var start = ms[stops[0]];
                var stop = ms[stops[1]];
                var red = Math.floor(start[0] + (stop[0] - start[0]) * r);
                var green = Math.floor(start[1] + (stop[1] - start[1]) * r);
                var blue = Math.floor(start[2] + (stop[2] - start[2]) * r);
                colors.push('#' + hex(red) + hex(green) + hex(blue));
            }
            return colors;
        }
        function buildRule(rule, context) {
            var type = context.styleType.rule;
            var ruleStyle = {};
            angular.forEach(type, function(copyRule, styleProp) {
                var target = {};
                angular.forEach(copyRule, function(copySource, copyDest) {
                    var val = null;
                    switch (copySource) {
                        case 'color':
                            if (context.colors) {
                                val = context.colors[context.index % context.colors.length];
                            }
                            break;
                        case 'range':
                            if (context.rangeStep) {
                                val = Math.round(context.rangeStep * context.index);
                            }
                            break;
                        default:
                            throw 'invalid copySource ' + copySource;
                    }
                    if (val !== null) {
                        target[copyDest] = val;
                    }
                });
                ruleStyle[styleProp] = target;
            });
            rule.style = ruleStyle;
        }
        
        return {
            _colorRampValues: colorRampValues,
            buildRuleStyles: function(style) {
                var colors;
                var rangeStep;
                if (style.classify) {
                    if (style.classify.colorRamp) {
                        colors = colorRampValues(style.classify.colorRamp, style.rules.length);
                    } else if (style.classify.colorPalette) {
                        var palette = styleChoices.getPalette(style.classify.colorPalette);
                        // @todo interpolate if needed?
                        colors = palette.vals;
                    }
                    if (style.classify.range) {
                        rangeStep = (style.classify.range.max - style.classify.range.min) / style.rules.length;
                    }
                }
                var context = {
                    colors: colors,
                    rangeStep: rangeStep,
                    style: style,
                    styleType: styleService.getStyleType(style.typeName)
                };
                style.rules.forEach(function(r, i) {
                    context.index = i;
                    buildRule(r, context);
                });
            }
        };
    });
})();