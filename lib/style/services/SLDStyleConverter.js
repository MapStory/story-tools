(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.SLDStyleConverter', []);

    module.factory('SLDStyleConverter', function() {
        return {
            generateStyle: function(style) {
                var config = this.convertJSON(style);
                if (!this.context) {
                    this.context = new Jsonix.Context([XLink_1_0, Filter_1_0_0, GML_2_1_2, SLD_1_0_0]);
                    this.marshaller = this.context.createMarshaller();
                }
                return this.marshaller.marshalString(config);
            },
            createPointSymbolizer: function(style) {
                return {
                    name: {
                        localPart: 'PointSymbolizer',
                        namespaceURI: "http://www.opengis.net/sld"
                    },
                    value: {
                        graphic: {
                            externalGraphicOrMark: [{
                                TYPE_NAME: "SLD_1_0_0.Mark",
                                fill: {
                                    cssParameter: [{
                                        name: 'fill',
                                        content: [style.symbol.fillColor]
                                    }, {
                                        name: 'fill-opacity',
                                        content: [String(style.symbol.fillOpacity/100)]
                                    }]
                                },
                                stroke: {
                                    cssParameter: [{
                                        name: 'stroke',
                                        content: [style.stroke.strokeColor]
                                    }, {
                                        name: 'stroke-width',
                                        content: [String(style.stroke.strokeWidth)]
                                    }, {
                                        name: 'stroke-opacity',
                                        content: [String(style.stroke.strokeOpacity/100)]
                                    }]
                                },
                                wellKnownName: style.symbol.shape
                            }]
                        },
                        size: {
                            content: [String(style.symbol.size)]
                        }
                    }
                };
            },
            createLineSymbolizer: function(style) {
                return {
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
                                content: [String(style.stroke.strokeOpacity/100)]
                            }]
                        }
                    }
                };
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
                                } /* TODO add propertyname value see https://github.com/highsource/ogc-schemas/pull/32 */
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
                // single rule, multiple symbolizers
                var rule = {
                    symbolizer: []
                };
                result.value.namedLayerOrUserLayer[0].namedStyleOrUserStyle[0].featureTypeStyle[0].rule.push(rule);
                if (style.geomType === 'point') {
                    rule.symbolizer.push(this.createPointSymbolizer(style));
                } else if (style.geomType === 'line') {
                    rule.symbolizer.push(this.createLineSymbolizer(style));
                }
                if (style.label && style.label.attribute !== null) {
                    rule.symbolizer.push(this.createTextSymbolizer(style));
                }
                return result;
            }
        };
    });
})();
