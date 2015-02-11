var MapConfig = require('../lib/mapstory/MapConfig.js').MapConfig;

var instance = new MapConfig();

describe('MapConfig', function() {

    it('should convert extent, zoom and projection', function() {
        var mapManager = {
            mapid: 215
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        var config = instance.write(mapManager);
        var expected = '{"id":215,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

    it('should convert a tiled WMS layer', function() {
        var mapManager = {
            mapid: 216
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        mapManager.map.addLayer(new ol.layer.Tile({
            id: 'foo',
            title: 'My layer',
            layerInfo: {
                geomType: 'point',
                timeAttribute: 'attr1',
                times: ['2001', '2002', '2003']
            },
            source: new ol.source.TileWMS({
                url: 'http://myserver',
                params: {
                    'LAYERS': 'x'
                }
            })
        }));
        var config = instance.write(mapManager);
        var expected = '{"id":216,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","title":"My layer","layerInfo":{"geomType":"point","timeAttribute":"attr1","times":["2001","2002","2003"]},"singleTile":false,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

    it('should convert an untiled WMS layer', function() {
        var mapManager = {
            mapid: 217
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        mapManager.map.addLayer(new ol.layer.Image({
            id: 'foo',
            title: 'My layer',
            layerInfo: {
                geomType: 'point',
                timeAttr: 'attr1',
                times: ['2001', '2002', '2003']
            },
            source: new ol.source.ImageWMS({
                url: 'http://myserver',
                params: {
                    'LAYERS': 'x'
                }
            })
        }));
        var config = instance.write(mapManager);
        var expected = '{"id":217,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","title":"My layer","layerInfo":{"geomType":"point","timeAttr":"attr1","times":["2001","2002","2003"]},"singleTile":true,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

    it('should convert an OSM layer', function() {
        var mapManager = {
            mapid: 218
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        mapManager.map.addLayer(new ol.layer.Tile({
            source: new ol.source.OSM()
        }));
        var config = instance.write(mapManager);
        var expected = '{"id":218,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"OSM"}]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

    it('should convert an MapQuest layer', function() {
        var mapManager = {
            mapid: 219
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        mapManager.map.addLayer(new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
        }));
        var config = instance.write(mapManager);
        var expected = '{"id":219,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"MapQuest","layer":"sat"}]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

});
