(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.styleRuleBuilder', [
        'storytools.edit.style.styleTypes',
        'storytools.edit.style.styleChoices'
    ]);

    module.factory('stStyleRuleBuilder', function(stStyleTypes, stStyleChoices) {
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
                return [parseInt('0x' + val.substr(1, 2)),
                    parseInt('0x' + val.substr(3, 2)),
                    parseInt('0x' + val.substr(5, 2))
                ];
            });
            var step = 1.0 / (num - 1);
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
                        var palette = stStyleChoices.getPalette(style.classify.colorPalette);
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
                    styleType: stStyleTypes.getStyleType(style.typeName)
                };
                style.rules.forEach(function(r, i) {
                    context.index = i;
                    buildRule(r, context);
                });
            }
        };
    });
})();
