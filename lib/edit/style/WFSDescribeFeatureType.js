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
        var geometryType, timeAttr;
        for (var i=0, ii=element.length; i<ii; ++i) {
            var el = element[i];
            if (el.type.namespaceURI === 'http://www.opengis.net/gml') {
                var lp = el.type.localPart;
                if (lp.indexOf('Polygon') !== -1) {
                    geometryType = 'polygon';
                } else if (lp.indexOf('LineString') !== -1) {
                    geometryType = 'line';
                } else if (lp.indexOf('Point') !== -1) {
                    geometryType = 'point';
                }
            } else if (el.type.localPart === 'dateTime') {
                if (timeAttr === undefined) {
                    timeAttr = el.name;
                } else {
                    timeAttr = null;
                }
            }
            fields.push({name: el.name, type: el.type.localPart, typeNS: el.type.namespaceURI});
        }
        return {
            timeAttr: timeAttr,
            featureNS: featureNS,
            geomType: geometryType,
            attributes: fields
        };
    };

};
