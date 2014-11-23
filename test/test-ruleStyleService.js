require('../lib/style/services.js');

describe('ruleStyleService', function() {

    beforeEach(function() {
        // work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.services');

        inject(function(ruleStyleService) {
            ruleStyleService = ruleStyleService;
        });
    });

    it('should pick values from a 2-stop color ramp', inject(function(ruleStyleService) {
        vals = ruleStyleService._colorRampValues({0:'#ff0000',1:'#0000ff'},2);
        expect(vals.length).toBe(2);
        expect(vals).toEqual(['#ff0000','#0000ff']);

        vals = ruleStyleService._colorRampValues({0:'#ff0000',1:'#0000ff'},3);
        expect(vals.length).toBe(3);
        expect(vals).toEqual(['#ff0000', '#7f007f', '#0000ff']);
    }));

});