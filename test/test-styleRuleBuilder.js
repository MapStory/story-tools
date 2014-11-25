require('../lib/style/services/styleRuleBuilder.js');
require('../lib/style/services/styleChoices.js');
require('../lib/style/services/styleTypes.js');

describe('styleRuleBuilder', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.styleRuleBuilder');
        window.angular.mock.module('mapstory.styleEditor.styleChoices');
        window.angular.mock.module('mapstory.styleEditor.styleTypes');

        inject(function(stStyleRuleBuilder) {
            this.stStyleRuleBuilder = stStyleRuleBuilder;
        });
    });

    it('should pick values from a 2-stop color ramp', inject(function(stStyleRuleBuilder) {
        vals = stStyleRuleBuilder._colorRampValues({0:'#ff0000',1:'#0000ff'},2);
        expect(vals.length).toBe(2);
        expect(vals).toEqual(['#ff0000','#0000ff']);
    }));

    it('should pick values from a 3-stop color ramp', inject(function(stStyleRuleBuilder) {
        vals = stStyleRuleBuilder._colorRampValues({0:'#ff0000',1:'#0000ff'},3);
        expect(vals.length).toBe(3);
        expect(vals).toEqual(['#ff0000', '#7f007f', '#0000ff']);
    }));
});