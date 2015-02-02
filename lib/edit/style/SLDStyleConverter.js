//'use strict';
var Jsonix = require('../../../bower_components/jsonix/dist/Jsonix-all.js').Jsonix;
var XLink_1_0 = require('../../../bower_components/w3c-schemas/scripts/lib/XLink_1_0.js').XLink_1_0;
var Filter_1_0_0 = require('../../../bower_components/ogc-schemas/scripts/lib/Filter_1_0_0.js').Filter_1_0_0;
var GML_2_1_2 = require('../../../bower_components/ogc-schemas/scripts/lib/GML_2_1_2.js').GML_2_1_2;
var SLD_1_0_0 = require('../../../bower_components/ogc-schemas/scripts/lib/SLD_1_0_0.js').SLD_1_0_0;

exports.SLDStyleConverter = function() {
    return {
        generateStyle: function(style, layerName, asString) {
            var config = this.convertJSON(style, layerName);
            if (!this.context) {
                this.context = new Jsonix.Context([XLink_1_0, Filter_1_0_0, GML_2_1_2, SLD_1_0_0], {
                    namespacePrefixes: {
                        'http://www.w3.org/1999/xlink': 'xlink',
                        'http://www.opengis.net/sld': 'sld',
                        'http://www.opengis.net/ogc': 'ogc'
                    }
                });
                this.marshaller = this.context.createMarshaller();
            }
            if (asString === true) {
                return this.marshaller.marshalString(config);
            } else {
                return this.marshaller.marshalDocument(config);
            }
        },
        createFill: function(style, styleRule) {
            return {
                cssParameter: [{
                    name: 'fill',
                    content: [(styleRule && styleRule.style.symbol.fillColor) ? styleRule.style.symbol.fillColor : style.symbol.fillColor]
                }, {
                    name: 'fill-opacity',
                    content: [String(styleRule ? (styleRule.style.symbol.fillOpacity || 100) / 100 : (style.symbol.fillOpacity || 100) / 100)]
                }]
            };
        },
        createStroke: function(style) {
            var dashArray;
            if (style.stroke.strokeStyle === 'dashed') {
                dashArray = '5';
            } else if (style.stroke.strokeStyle ==='dotted') {
                dashArray = '1 2';
            }
            return {
                cssParameter: [{
                    name: 'stroke',
                    content: [style.stroke.strokeColor]
                }, {
                    name: 'stroke-width',
                    content: style.stroke.strokeWidth ? [String(style.stroke.strokeWidth)] : undefined
                }, {
                    name: 'stroke-opacity',
                    content: style.stroke.strokeOpacity ? [String(style.stroke.strokeOpacity / 100)] : undefined
                }, {
                    name: 'stroke-dasharray',
                    content: dashArray ? [dashArray] : undefined
                }]
            };
        },
        createPolygonSymbolizer: function(style, styleRule) {
            var fill = this.createFill(style, styleRule);
            var stroke = this.createStroke(style);
            var polygon = {
                name: {
                    localPart: 'PolygonSymbolizer',
                    namespaceURI: "http://www.opengis.net/sld"
                },
                value: {
                    fill: fill,
                    stroke: stroke
                }
            };
            return polygon;
        },
        createPointSymbolizer: function(style, styleRule) {
            var fill = this.createFill(style, styleRule); 
            var stroke = this.createStroke(style);
            var graphicOrMark;
            if (style.symbol && style.symbol.graphic) {
                var a = document.createElement("a");
                // @todo appending icon commons attributes should go elsewhere
                a.href = style.symbol.graphic + '?' +
                    'fill=' + encodeURIComponent(style.symbol.fillColor) +
                    "&stroke=" + encodeURIComponent(style.stroke.strokeColor);
                graphicOrMark = [{
                        TYPE_NAME: "SLD_1_0_0.ExternalGraphic",
                        fill: fill,
                        stroke: stroke,
                        format: "image/svg+xml",
                        onlineResource: {
                            href: a.href
                        }
                    }];
            } else {
                graphicOrMark = [{
                        TYPE_NAME: "SLD_1_0_0.Mark",
                        fill: fill,
                        stroke: stroke,
                        wellKnownName: style.symbol && style.symbol.shape || 'circle'
                    }];
            }
            var opacity = 1;
            if (style.symbol && angular.isDefined(style.symbol.fillOpacity)) {
                opacity = Math.max(0.01, style.symbol.fillOpacity) / 100;
            }
            return {
                name: {
                    localPart: 'PointSymbolizer',
                    namespaceURI: "http://www.opengis.net/sld"
                },
                value: {
                    graphic: {
                        externalGraphicOrMark: graphicOrMark,
                        opacity: {
                            content: [String(opacity)]
                        },
                        size: {
                            content: [String(style.symbol && style.symbol.size || 10)]
                        },
                        rotation: style.symbol && style.symbol.rotationAttribute ? {
                            content: [style.symbol.rotationUnits === 'degrees' ? {
                                name: {
                                    localPart: "PropertyName",
                                    namespaceURI: "http://www.opengis.net/ogc"
                                },
                                value: {
                                    content: style.symbol.rotationAttribute
                                }
                            } : {
                                name: {
                                    localPart: "Div",
                                    namespaceURI: "http://www.opengis.net/ogc"
                                },
                                value: {
                                    expression: [{
                                        name: {
                                            localPart: "PropertyName",
                                            namespaceURI: "http://www.opengis.net/ogc"
                                        },
                                        value: {
                                            content: style.symbol.rotationAttribute
                                        }
                                    }, {
                                        name: {
                                            localPart: "Div",
                                            namespaceURI: "http://www.opengis.net/ogc"
                                        },
                                        value: {
                                            expression: [{
                                                name: {
                                                    localPart: "Function",
                                                    namespaceURI: "http://www.opengis.net/ogc"
                                                },
                                                value: {
                                                    name: "pi"
                                                }
                                            }, {
                                                name: {
                                                    localPart: "Literal",
                                                    namespaceURI: "http://www.opengis.net/ogc"
                                                },
                                                value: {
                                                    content: ["360"]
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }]
                        } : undefined
                    }
                }
            };
        },
        createLineSymbolizer: function(style, styleRule) {
            var strokeStyleCss;
            if (style.stroke.strokeStyle === 'dashed') {
                strokeStyleCss = {
                    name: 'stroke-dasharray',
                    content: ['5 5']
                };
            } else if (style.stroke.strokeStyle === 'dotted') {
                strokeStyleCss = {
                    name: 'stroke-dasharray',
                    content: ['1 2']
                };
            }
            var line = {
                name: {
                    localPart: 'LineSymbolizer',
                    namespaceURI: "http://www.opengis.net/sld"
                },
                value: {
                    stroke: {
                        cssParameter: [{
                                name: 'stroke',
                                content: [(styleRule && styleRule.style.stroke.strokeColor) ? styleRule.style.stroke.strokeColor : style.stroke.strokeColor]
                            }, {
                                name: 'stroke-width',
                                content: [String(style.stroke.strokeWidth)]
                            }, {
                                name: 'stroke-opacity',
                                content: [String(style.stroke.strokeOpacity / 100)]
                            }]
                    }
                }
            };
            if (strokeStyleCss) {
                line.value.stroke.cssParameter.push(strokeStyleCss);
            }
            return line;
        },
        createTextSymbolizer: function(style) {
            return {
                name: {
                    localPart: 'TextSymbolizer',
                    namespaceURI: "http://www.opengis.net/sld"
                },
                value: {
                    fill: {
                        cssParameter: [{
                                name: 'fill',
                                content: [style.label.fillColor]
                            }]
                    },
                    font: {
                        cssParameter: [{
                                name: 'font-family',
                                content: [style.label.fontFamily]
                            }, {
                                name: 'font-size',
                                content: [String(style.label.fontSize)]
                            }, {
                                name: 'font-style',
                                content: [style.label.fontStyle]
                            }, {
                                name: 'font-weight',
                                content: [style.label.fontWeight]
                            }]
                    },
                    label: {
                        content: [{
                                name: {
                                    localPart: "PropertyName",
                                    namespaceURI: "http://www.opengis.net/ogc"
                                },
                                value: {
                                    content: style.label.attribute
                                }
                            }]
                    }
                }
            };
        },
        convertJSON: function(style, layerName) {
            var result = {
                name: {
                    namespaceURI: 'http://www.opengis.net/sld',
                    localPart: 'StyledLayerDescriptor'
                }
            };
            result.value = {
                version: "1.0.0",
                namedLayerOrUserLayer: [{
                        TYPE_NAME: "SLD_1_0_0.NamedLayer",
                        name: layerName,
                        namedStyleOrUserStyle: [{
                                TYPE_NAME: "SLD_1_0_0.UserStyle",
                                featureTypeStyle: [{
                                        rule: []
                                    }]
                            }]
                    }]
            };
            var rule, ruleContainer = result.value.namedLayerOrUserLayer[0].namedStyleOrUserStyle[0].featureTypeStyle[0].rule;
            if (style.rules) {
                for (var i = 0, ii = style.rules.length; i < ii; ++i) {
                    var styleRule = style.rules[i];
                    var filter;
                    if (styleRule.value) {
                        filter = {
                            comparisonOps: {
                                name: {
                                    namespaceURI: "http://www.opengis.net/ogc",
                                    localPart: "PropertyIsEqualTo"
                                },
                                value: {
                                    expression: [{
                                            name: {
                                                namespaceURI: "http://www.opengis.net/ogc",
                                                localPart: "PropertyName"
                                            },
                                            value: {
                                                content: style.classify.attribute
                                            }
                                        }, {
                                            name: {
                                                namespaceURI: "http://www.opengis.net/ogc",
                                                localPart: "Literal"
                                            },
                                            value: {
                                                content: [String(styleRule.value)]
                                            }
                                        }]
                                }
                            }
                        };
                    } else if (styleRule.range) {
                        filter = {
                            comparisonOps: {
                                name: {
                                    namespaceURI: "http://www.opengis.net/ogc",
                                    localPart: "PropertyIsBetween"
                                },
                                value: {
                                    expression: {
                                        name: {
                                            namespaceURI: "http://www.opengis.net/ogc",
                                            localPart: "PropertyName"
                                        },
                                        value: {
                                            content: style.classify.attribute
                                        }
                                    },
                                    lowerBoundary: {
                                        expression: {
                                            name: {
                                                namespaceURI: "http://www.opengis.net/ogc",
                                                localPart: "Literal"
                                            },
                                            value: {
                                                content: [String(styleRule.range.min)]
                                            }
                                        }
                                    },
                                    upperBoundary: {
                                        expression: {
                                            name: {
                                                namespaceURI: "http://www.opengis.net/ogc",
                                                localPart: "Literal"
                                            },
                                            value: {
                                                content: [String(styleRule.range.max)]
                                            }
                                        }
                                    }
                                }
                            }
                        };
                    }
                    rule = {
                        filter: filter,
                        symbolizer: []
                    };
                    if (style.geomType === "point") {
                        rule.symbolizer.push(this.createPointSymbolizer(style, styleRule));
                    } else if (style.geomType === "line") {
                        rule.symbolizer.push(this.createLineSymbolizer(style, styleRule));
                    } else if (style.geomType === "polygon") {
                        rule.symbolizer.push(this.createPolygonSymbolizer(style, styleRule));
                    }
                    if (style.label && style.label.attribute !== null) {
                        rule.symbolizer.push(this.createTextSymbolizer(style));
                    }
                    ruleContainer.push(rule);
                }
            } else {
                // single rule, multiple symbolizers
                rule = {
                    symbolizer: []
                };
                ruleContainer.push(rule);
                if (style.geomType === 'point') {
                    rule.symbolizer.push(this.createPointSymbolizer(style));
                } else if (style.geomType === 'line') {
                    rule.symbolizer.push(this.createLineSymbolizer(style));
                } else if (style.geomType === 'polygon') {
                    rule.symbolizer.push(this.createPolygonSymbolizer(style));
                }
                if (style.label && style.label.attribute !== null) {
                    rule.symbolizer.push(this.createTextSymbolizer(style));
                }
            }
            return result;
        }
    };
};
