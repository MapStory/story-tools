require('../lib/ng/core/style/ol3StyleConverter.js');
require('../lib/ng/core/style/svgIcon.js');

describe('ol3StyleConverter', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.ol3StyleConverter');
        window.angular.mock.module('mapstory.styleEditor.svgIcon');

        inject(function(ol3StyleConverter) {
            this.ol3StyleConverter = ol3StyleConverter;
        });
    });

    it('should convert simple stypes', inject(function(ol3StyleConverter) {
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
        var style = ol3StyleConverter.generateStyle(styleConfig);
        expect(style.length).toBe(1);
        expect(style[0] instanceof ol.style.Style).toBeTruthy();
        var image = style[0].getImage();
        expect(image instanceof ol.style.Circle).toBeTruthy();
        expect(image.getRadius()).toBe(10/2);
        expect(image.getFill().getColor()).toBe('rgba(255,0,0,0.8)');
        expect(image.getStroke().getColor()).toBe('rgba(255,255,0,0.9)');
        expect(image.getStroke().getWidth()).toBe(3);
        var newStyle = ol3StyleConverter.generateStyle(styleConfig);
        expect(style === newStyle).toBeTruthy();
    }));

    it('should convert to square', inject(function(ol3StyleConverter) {
        var shapeConfig = ol3StyleConverter.generateShapeConfig({
            "symbol": {
                "size": 10,
                "shape": "square"
            }
        });
        expect(shapeConfig.points).toBe(4);
        expect(shapeConfig.radius).toBe(10/2);
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
        expect(shapeConfig.radius).toBe(10/2);
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
        expect(shapeConfig.radius).toBe(10/2);
        expect(shapeConfig.radius2).toBe(10/4);
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
        expect(shapeConfig.radius).toBe(10/2);
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
        expect(shapeConfig.radius).toBe(10/2);
        expect(shapeConfig.radius2).toBe(0);
        expect(shapeConfig.angle).toBe(Math.PI / 4);
    }));

    it('should convert labels', inject(function(ol3StyleConverter) {
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
            },
            "label": {
                "attribute": "foo",
                "fontStyle": "italic",
                "fontWeight": "bold",
                "fontSize": 12,
                "fontFamily": "Serif",
                "fillColor": "#0000ff"
            }
        }, new ol.Feature({'foo': 'bar'}));
        expect(style.length).toBe(1);
        var text = style[0].getText();
        expect(text instanceof ol.style.Text).toBeTruthy();
        expect(text.getText()).toBe('bar');
        expect(text.getFont()).toBe('italic bold 12px Serif');
        expect(text.getFill().getColor()).toBe('#0000ff');
    }));

    it('should convert unique classification', inject(function(ol3StyleConverter) {
        var styleConfig = {
            "stroke": {
                "strokeColor": "#ffff00"
            },
            "geomType": "point",
            "classify": {
                "attribute": "foo"
            },
            "rules": [{
                "value": "bar",
                "style": {
                    "symbol": {
                        "fillColor": "#ff9900"
                    }
                }
            }, {
                "value": "baz",
                "style": {
                    "symbol": {
                        "fillColor": "#b36b00"
                    }
                }
            }]    
        };
        var style = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'bar'}));
        expect(style[0].getImage().getFill().getColor()).toBe('#ff9900');
        expect(style[0].getImage().getStroke().getColor()).toBe('rgba(255,255,0,1)');
        style = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'baz'}));
        expect(style[0].getImage().getFill().getColor()).toBe('#b36b00'); 
    }));

    it('should convert ranges of a classification', inject(function(ol3StyleConverter) {
        var styleConfig = {
            "stroke": {
                "strokeColor": "#ffff00"
            },
            "geomType": "point",
            "classify": {
                "attribute": "foo"
            },
            "rules": [{
                "range": {
                    "min": 0,
                    "max": 10
                },
                "style": {
                    "symbol": {
                        "fillColor": "#ff9900"
                    }
                }
            }, {
                "range": {
                    "min": 10,
                    "max": 20
                },
                "style": {
                    "symbol": {
                        "fillColor": "#b36b00"
                    }
                }
            }]
        };
        var style = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 5}));
        expect(style[0].getImage().getFill().getColor()).toBe('#ff9900');
        style = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 15}));
        expect(style[0].getImage().getFill().getColor()).toBe('#b36b00');
    }));

    it('should convert unique classification with label', inject(function(ol3StyleConverter) {
        var styleConfig = {
            "stroke": {
                "strokeColor": "#ffff00"
            },
            "geomType": "point",
            "classify": {
                "attribute": "foo"
            },
            "label": {
                "attribute": "foo",
                "fontWeight": "bold",
                "fontSize": 12,
                "fontFamily": "Serif",
                "fillColor": "#0000ff"
            },
            "rules": [{
                "value": "bar",
                "style": {
                    "symbol": {
                        "fillColor": "#ff9900"
                    }
                }
            }, {
                "value": "baz",
                "style": {
                    "symbol": {
                        "fillColor": "#b36b00"
                    }
                }
            }]
        };
        var style = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'baz'}));
        expect(style[0].getText().getText()).toBe('baz');
        var newStyle = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'baz'}));
        // taken from style cache
        expect(newStyle === style).toBeTruthy();
        newStyle = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'bar'}));
        // not taken from style cache
        expect(newStyle === style).toBeFalsy();
        styleConfig.stroke.strokeColor = "#ff0000";
        newStyle = ol3StyleConverter.generateStyle(styleConfig, new ol.Feature({'foo': 'baz'}));
        // not taken from style cache since strokeColor changed
        expect(newStyle === style).toBeFalsy();
    }));

});
