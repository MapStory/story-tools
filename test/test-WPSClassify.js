require('../lib/style/services/WPSClassify.js');

describe('WPSClassify', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.WPSClassify');

        inject(function(WPSClassify) {
            this.WPSClassify = WPSClassify;
        });
    });

    it('should create the correct WPS request', inject(function(WPSClassify) {
        var data = {
            typeName: 'cite:states',
            attribute: 'POPULATION',
            numClasses: 10,
            method: 'EQUAL_INTERVAL'
        };
        var request = WPSClassify.classifyVector(data);
        // TODO update when https://github.com/highsource/ogc-schemas/pull/36 gets resolved
        expect(request).toBe('<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ows="http://www.opengis.net/ows/1.1" service="WPS" version="1.0.0"><ows:Identifier>vec:FeatureClassStats</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>POPULATION</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>classes</ows:Identifier><wps:Data><wps:LiteralData>10</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>method</ows:Identifier><wps:Data><wps:LiteralData>EQUAL_INTERVAL</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>stats</ows:Identifier><wps:Data><wps:LiteralData>mean</wps:LiteralData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput><ows:Identifier>results</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>');
    }));

});
