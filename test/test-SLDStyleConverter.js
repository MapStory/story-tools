require('../lib/style/services/SLDStyleConverter.js');

describe('SLDStyleConverter', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.SLDStyleConverter');

        inject(function(SLDStyleConverter) {
            this.SLDStyleConverter = SLDStyleConverter;
        });
    });

    it('should convert simple stypes', inject(function(SLDStyleConverter) {
        var styleConfig = {
            "symbol": {
                "size": 10,
                "shape": "circle",
                "graphic": null,
                "graphicType": null,
                "fillColor": "#ff0000",
                "fillOpacity": 80
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "solid",
                "strokeOpacity": 90
            }
        };
        var style = SLDStyleConverter.generateStyle(styleConfig);
        expect(style).toBe('<p0:StyledLayerDescriptor xmlns:p0="http://www.opengis.net/sld" version="1.0.0"><p0:NamedLayer><p0:UserStyle><p0:FeatureTypeStyle><p0:Rule><p0:PointSymbolizer><p0:Graphic><p0:Mark><p0:WellKnownName>circle</p0:WellKnownName><p0:Fill><p0:CssParameter name="fill">#ff0000</p0:CssParameter><p0:CssParameter name="fill-opacity">0.8</p0:CssParameter></p0:Fill><p0:Stroke><p0:CssParameter name="stroke">#ffff00</p0:CssParameter><p0:CssParameter name="stroke-width">3</p0:CssParameter><p0:CssParameter name="stroke-opacity">0.9</p0:CssParameter></p0:Stroke></p0:Mark></p0:Graphic></p0:PointSymbolizer></p0:Rule></p0:FeatureTypeStyle></p0:UserStyle></p0:NamedLayer></p0:StyledLayerDescriptor>');
    }));

});
