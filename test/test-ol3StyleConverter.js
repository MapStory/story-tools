require('../lib/style/services/ol3StyleConverter.js');

describe('ol3StyleConverter', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.ol3StyleConverter');

        inject(function(ol3StyleConverter) {
            this.ol3StyleConverter = ol3StyleConverter;
        });
    });

    it('should convert simple stypes', inject(function(ol3StyleConverter) {
        var style = ol3StyleConverter.generateStyle({
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
        });
        expect(style.length).toBe(1);
        expect(style[0] instanceof ol.style.Style).toBeTruthy();
        var image = style[0].getImage();
        expect(image instanceof ol.style.Circle).toBeTruthy();
        expect(image.getRadius()).toBe(10);
        expect(image.getFill().getColor()).toBe('rgba(255,0,0,0.8)');
        expect(image.getStroke().getColor()).toBe('rgba(255,255,0,0.9)');
        expect(image.getStroke().getWidth()).toBe(3);
    }));

    it('should convert to square', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "square"
            }
        });
        expect(shapeConfig.points).toBe(4);
        expect(shapeConfig.radius).toBe(10);
        expect(shapeConfig.angle).toBe(Math.PI / 4);
    }));

    it('should convert to triangle', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "triangle"
            }
        });
        expect(shapeConfig.points).toBe(3);
        expect(shapeConfig.radius).toBe(10);
        expect(shapeConfig.angle).toBe(0);
    }));

    it('should convert to star', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "star"
            }
        });
        expect(shapeConfig.points).toBe(5);
        expect(shapeConfig.radius).toBe(10);
        expect(shapeConfig.radius2).toBe(10/2);
        expect(shapeConfig.angle).toBe(0);
    }));

    it('should convert to cross', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "cross"
            }
        });
        expect(shapeConfig.points).toBe(4);
        expect(shapeConfig.radius).toBe(10);
        expect(shapeConfig.radius2).toBe(0);
        expect(shapeConfig.angle).toBe(0);
    }));

    it('should convert to x', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "x"
            }
        });
        expect(shapeConfig.points).toBe(4);
        expect(shapeConfig.radius).toBe(10);
        expect(shapeConfig.radius2).toBe(0);
        expect(shapeConfig.angle).toBe( Math.PI / 4);
    }));

});
