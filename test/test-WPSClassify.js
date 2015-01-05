var WPSClassify = require('../lib/edit/style/WPSClassify.js').WPSClassify;
var instance = new WPSClassify();

describe('WPSClassify', function() {

    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
    });

    it('should create the correct WPS request', function() {
        var data = {
            typeName: 'cite:states',
            featureNS: 'http://www.opengeospatial.net/cite',
            featurePrefix: 'cite',
            attribute: 'POPULATION',
            numClasses: 10,
            method: 'EQUAL_INTERVAL'
        };
        var request = instance.classifyVector(data);
        expect(request).toBeXML('<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:wfs="http://www.opengis.net/wfs" service="WPS" version="1.0.0"><ows:Identifier>vec:FeatureClassStats</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference xlink:href="http://geoserver/wfs" method="POST" mimeType="text/xml"><wps:Body><wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2"><wfs:Query xmlns:cite="http://www.opengeospatial.net/cite" typeName="cite:states"/></wfs:GetFeature></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>POPULATION</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>classes</ows:Identifier><wps:Data><wps:LiteralData>10</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>method</ows:Identifier><wps:Data><wps:LiteralData>EQUAL_INTERVAL</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>stats</ows:Identifier><wps:Data><wps:LiteralData>mean</wps:LiteralData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput><ows:Identifier>results</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>');
    });

});
