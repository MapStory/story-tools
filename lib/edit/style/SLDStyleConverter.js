//'use strict';

exports.SLDStyleConverter = function() {
    return {
        generateStyle: function(style, asString) {
            var config = this.convertJSON(style);
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
        createPointSymbolizer: function(style, styleRule) {
            var fill = {
                cssParameter: [{
                        name: 'fill',
                        content: [styleRule ? styleRule.style.symbol.fillColor : style.symbol.fillColor]
                    }, {
                        name: 'fill-opacity',
                        content: [String(styleRule ? (styleRule.style.symbol.fillOpacity || 100) / 100 : (style.symbol.fillOpacity || 100) / 100)]
                    }]
            };
            var stroke = {
                cssParameter: [{
                        name: 'stroke',
                        content: [style.stroke.strokeColor]
                    }, {
                        name: 'stroke-width',
                        content: style.stroke.strokeWidth ? [String(style.stroke.strokeWidth)] : undefined
                    }, {
                        name: 'stroke-opacity',
                        content: style.stroke.strokeOpacity ? [String(style.stroke.strokeOpacity / 100)] : undefined
                    }]
            };
            var graphicOrMark;
            if (style.symbol && style.symbol.graphic) {
                graphicOrMark = [{
                        TYPE_NAME: "SLD_1_0_0.ExternalGraphic",
                        fill: fill,
                        stroke: stroke,
                        format: "image/svg+xml",
                        onlineResource: {
                            href: style.symbol.graphic
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
            return {
                name: {
                    localPart: 'PointSymbolizer',
                    namespaceURI: "http://www.opengis.net/sld"
                },
                value: {
                    graphic: {
                        externalGraphicOrMark: graphicOrMark
                    },
                    size: {
                        content: [String(style.symbol && style.symbol.size || 10)]
                    }
                }
            };
        },
        createLineSymbolizer: function(style) {
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
                                content: [style.stroke.strokeColor]
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
        convertJSON: function(style) {
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
                        name: style.typeName,
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
                }
                if (style.label && style.label.attribute !== null) {
                    rule.symbolizer.push(this.createTextSymbolizer(style));
                }
            }
            return result;
        }
    };
};
