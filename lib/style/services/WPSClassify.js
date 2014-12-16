(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.WPSClassify', []);

    module.factory('WPSClassify', function() {
        return {
            classifyVector: function(classification) {
                if (!this.context) {
                    this.context = new Jsonix.Context([XLink_1_0, OWS_1_1_0, Filter_1_1_0, OWS_1_0_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, WFS_1_1_0, WPS_1_0_0], {
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
                        dataInputs: {
                            inputs: [{
                                identifier: {
                                    value: 'features'
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
