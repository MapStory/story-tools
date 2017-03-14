//'use strict';

exports.WFSDescribeFeatureType = function() {

    this.parseResult = function(xml) {
        if (!this.context) {
            this.context = new owsjs.Jsonix.Context([
                owsjs.mappings.XSD_1_0
            ]);
            this.unmarshaller = this.context.createUnmarshaller();
        }
        var schema = this.unmarshaller.unmarshalString(xml).value;
        var featureNS = schema.targetNamespace;
        var element = schema.complexType[0].complexContent.extension.sequence.element;
        var fields = [];
        var geometryType;
        var timeAttrs = [];
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
                  timeAttrs.push(el.name);
            }
            fields.push({name: el.name, type: el.type.localPart, typeNS: el.type.namespaceURI});
        }
        return {
            timeAttribute: (timeAttrs.length > 0)? timeAttrs[0]: null,
            featureNS: featureNS,
            geomType: geometryType,
            attributes: fields
        };
    };

};
