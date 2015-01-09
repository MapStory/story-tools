//'use strict';

var Jsonix = require('../../../bower_components/jsonix/dist/Jsonix-all.js').Jsonix;
var XSD_1_0 = require('../../../bower_components/w3c-schemas/scripts/lib/XSD_1_0.js').XSD_1_0;

exports.WFSDescribeFeatureType = function() {

    this.parseResult = function(xml) {
        if (!this.context) {
            this.context = new Jsonix.Context([
                XSD_1_0
            ]);
            this.unmarshaller = this.context.createUnmarshaller();
        }
        var schema = this.unmarshaller.unmarshalString(xml).value;
        var featureNS = schema.targetNamespace;
        var element = schema.complexType[0].complexContent.extension.sequence.element;
        var fields = [];
        var geometryType;
        for (var i=0, ii=element.length; i<ii; ++i) {
            if (element[i].type.namespaceURI === 'http://www.opengis.net/gml') {
                var lp = element[i].type.localPart;
                if (lp.indexOf('Polygon') !== -1) {
                    // we currently do not have polygon styles, so fallback to line
                    geometryType = 'point';
                } else if (lp.indexOf('LineString') !== -1) {
                    geometryType = 'line';
                } else if (lp.indexOf('Point') !== -1) {
                    geometryType = 'point';
                }
            }
            // TODO also register type (namespaceURI and localPart)
            fields.push(element[i].name);
        }
        return {
            featureNS: featureNS,
            geomType: geometryType,
            attributes: fields
        };
    };

};
