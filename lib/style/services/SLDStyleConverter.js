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
                                rule: [{
                                    symbolizer: [{
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
                                    }]
                                }]
                            }]
                        }]
                    }]
                };
                return result;
            }
        };
    });
})();
