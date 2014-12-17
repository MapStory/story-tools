(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.WPSClassify', []);

    module.factory('WPSClassify', function() {
        return {
            classifyVector: function(data) {
                if (!this.context) {
                    this.context = new Jsonix.Context([
                            XLink_1_0,
                            OWS_1_1_0,
                            Filter_1_1_0,
                            OWS_1_0_0,
                            SMIL_2_0,
                            SMIL_2_0_Language,
                            GML_3_1_1,
                            WFS_1_1_0,
                            WPS_1_0_0
                        ], {
                        namespacePrefixes : {
                            'http://www.w3.org/1999/xlink' : 'xlink',
                            'http://www.opengis.net/wps/1.0.0' : 'wps',
                            'http://www.opengis.net/ows/1.1' : 'ows'
                        }
                    });
                    this.marshaller = this.context.createMarshaller();
                }
                var config = {
                    name: {
                        localPart: "Execute",
                        namespaceURI: "http://www.opengis.net/wps/1.0.0"
                    },
                    value: {
                        service: "WPS",
                        version: "1.0.0",
                        identifier: {
                            value: "vec:FeatureClassStats"
                        },
                        responseForm: {
                            rawDataOutput: {
                                identifier: {
                                    value: "results"
                                }
                            }
                        },
                        dataInputs: {
                            // activate first input when https://github.com/highsource/ogc-schemas/pull/36 gets resolved
                            input: [/*{
                                identifier: {
                                    value: 'features'
                                },
                                reference: {
                                    method: 'POST',
                                    mimeType: 'text/xml',
                                    href: 'http://geoserver/wfs',
                                    body: {
                                        content: [{
                                            name: {
                                                namespaceURI: "http://www.opengis.net/wfs",
                                                localPart: "GetFeature"
                                            },
                                            value: {
                                                outputFormat: "GML2",
                                                service: "WFS",
                                                version: "1.1.0",
                                                query: [{
                                                    typeName: [data.typeName]
                                                }]
                                            }
                                        }]
                                    }
                                }
                            },*/ {
                                identifier: { 
                                    value: 'attribute'
                                },
                                data: {
                                    literalData: {
                                        value: data.attribute
                                    }
                                }
                            }, {
                                identifier: {
                                    value: 'classes'
                                },
                                data: {
                                    literalData: {
                                        value: String(data.numClasses)
                                    }
                                }
                            }, {
                                identifier: {
                                    value: 'method'
                                },
                                data: {
                                    literalData: {
                                        value: data.method
                                    }
                                }
                            }, {
                                identifier: {
                                    value: 'stats'
                                },
                                data: {
                                    literalData: {
                                        value: 'mean' /* TODO currently we need to send at least 1 stats input */
                                    }
                                }
                            }]
                        }
                    }
                };
                return this.marshaller.marshalString(config);
            }
        };
    });
})();
