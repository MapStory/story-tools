//'use strict';

var Jsonix = require('../../../bower_components/jsonix/dist/Jsonix-all.js').Jsonix;
var XLink_1_0 = require('../../../bower_components/w3c-schemas/scripts/lib/XLink_1_0.js').XLink_1_0;
var OWS_1_1_0 = require('../../../bower_components/ogc-schemas/scripts/lib/OWS_1_1_0.js').OWS_1_1_0;
var Filter_1_1_0 = require('../../../bower_components/ogc-schemas/scripts/lib/Filter_1_1_0.js').Filter_1_1_0;
var OWS_1_0_0 = require('../../../bower_components/ogc-schemas/scripts/lib/OWS_1_0_0.js').OWS_1_0_0;
var SMIL_2_0 = require('../../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0.js').SMIL_2_0;
var SMIL_2_0_Language = require('../../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0_Language.js').SMIL_2_0_Language;
var GML_3_1_1 = require('../../../bower_components/ogc-schemas/scripts/lib/GML_3_1_1.js').GML_3_1_1;
var WFS_1_1_0 = require('../../../bower_components/ogc-schemas/scripts/lib/WFS_1_1_0.js').WFS_1_1_0;
var WPS_1_0_0 = require('../../../bower_components/ogc-schemas/scripts/lib/WPS_1_0_0.js').WPS_1_0_0;

exports.WPSClassify = function() {

    this.parseResult = function(xml) {
        var doc = new DOMParser().parseFromString(xml, 'application/xml');
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
        return rules;
    };

    this.classifyVector = function(data, asString) {
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
                namespacePrefixes: {
                    'http://www.w3.org/1999/xlink': 'xlink',
                    'http://www.opengis.net/wps/1.0.0': 'wps',
                    'http://www.opengis.net/ows/1.1': 'ows',
                    'http://www.opengis.net/wfs': 'wfs'

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
                                                        typeName: [{ns: data.featureNS, lp: data.typeName.split(':')[1], p: data.featurePrefix}]
                                                    }]
                                            }
                                        }]
                                }
                            }
                        }, {
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
        if (asString === true) {
            return this.marshaller.marshalString(config);
        } else {
            return this.marshaller.marshalDocument(config);
        }
    };
};
