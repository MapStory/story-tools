//'use strict';

exports.WPSClassify = function() {

    this.parseResult = function(xml) {
        var doc = new DOMParser().parseFromString(xml, 'application/xml');
        var exceptions = doc.getElementsByTagNameNS('http://www.opengis.net/ows/1.1', 'ExceptionText');
        if (exceptions.length ===0) {
            var classes = doc.getElementsByTagName('Class');
            var rules = [];
            for (var i=0, ii=classes.length; i<ii; ++i) {
                var min = classes[i].getAttribute('lowerBound');
                var max = classes[i].getAttribute('upperBound');
                rules.push({
                    name: min + '-' + max,
                    range: {
                        min: min,
                        max: max
                    }
                });
            }
            return {
                success: true,
                rules: rules
            };
        } else {
            return {
                success: false,
                msg: exceptions[0].textContent
            };
        }
    };

    this.createContext = function() {
        this.context = new owsjs.Jsonix.Context([
            owsjs.mappings.XLink_1_0,
            owsjs.mappings.OWS_1_1_0,
            owsjs.mappings.Filter_1_1_0,
            owsjs.mappings.OWS_1_0_0,
            owsjs.mappings.SMIL_2_0,
            owsjs.mappings.SMIL_2_0_Language,
            owsjs.mappings.GML_3_1_1,
            owsjs.mappings.WFS_1_1_0,
            owsjs.mappings.WPS_1_0_0
        ], {
            namespacePrefixes: {
                'http://www.w3.org/1999/xlink': 'xlink',
                'http://www.opengis.net/wps/1.0.0': 'wps',
                'http://www.opengis.net/ows/1.1': 'ows',
                'http://www.opengis.net/wfs': 'wfs'
            }
        });
        this.marshaller = this.context.createMarshaller();
    };

    this.getUniqueValues = function(data, asString) {
        if (!this.context) {
            this.createContext();
        }
        var config = this.generateMainConfig('gs:Unique', "application/json", data);
        config.value.dataInputs.input.push({
            identifier: {
                value: 'attribute'
            },
            data: {
                literalData: {
                    value: data.attribute
                }
            }
        });
        if (asString === true) {
            return this.marshaller.marshalString(config);
        } else {
            return this.marshaller.marshalDocument(config);
        }
    };

    this.generateMainConfig = function(processId, mimeType, data) {
        return {
            name: {
                localPart: "Execute",
                namespaceURI: "http://www.opengis.net/wps/1.0.0"
            },
            value: {
                service: "WPS",
                version: "1.0.0",
                identifier: {
                    value: processId
                },
                responseForm: {
                    rawDataOutput: {
                        identifier: {
                            value: "result"
                        },
                        mimeType: mimeType
                    }
                },
                dataInputs: {
                    input: [{
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
                                                        typeName: [{ns: data.featureNS, lp: data.typeName.split(':')[1] || data.typeName, p: data.featurePrefix}]
                                                    }]
                                            }
                                        }]
                                }
                            }
                        }
                    ]
                }
            }
        };
    };

    this.classifyVector = function(data, asString) {
        if (!this.context) {
            this.createContext();
        }
        var config = this.generateMainConfig('vec:FeatureClassStats', undefined, data);
        config.value.dataInputs.input.push({
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
        });
        if (asString === true) {
            return this.marshaller.marshalString(config);
        } else {
            return this.marshaller.marshalDocument(config);
        }
    };
};
