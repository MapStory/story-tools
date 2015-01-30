var StyleComplete = require('../lib/edit/style/StyleComplete.js').StyleComplete;
var instance = new StyleComplete();

describe('StyleComplete', function() {

    it('unique classification needs attribute and colorPalette', function() {
        var style = {
            "classify": {
                "method": "unique",
                "attribute": null
            }
        };
        var result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.classify.attribute = 'foo';
        result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.classify.colorPalette = true;
        result = instance.isComplete(style);
        expect(result).toBeTruthy();
    });

    it('other classifcation types need to have all info', function() {
        var style = {
            "classify": {
                "method": null,
                "attribute": null,
                "colorRamp": null
            },
            rules: []
        };
        var result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.classify.method = 'foo';
        result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.classify.attribute = 'bar';
        result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.classify.colorRamp = true;
        result = instance.isComplete(style);
        expect(result).toBeFalsy();
        style.rules.push({});
        result = instance.isComplete(style);
        expect(result).toBeTruthy();
    });

});

