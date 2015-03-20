var MapConfig = require('../lib/mapstory/MapConfig.js').MapConfig;

var instance = new MapConfig();

describe('MapConfig', function() {

    it('should transform to Interval object', function() {
        var data = JSON.parse('{"id":214,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","title":"My layer","layerInfo":{"geomType":"point","attributes": ["attr1", "attr2"],"timeAttribute":"attr1","times":{"start": 631152000000, "end": 1230768000000, "duration": "P1Y"}},"singleTile":false,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}');
        instance.read(data, {
            mapid: 214,
            setBaseLayer: function() {
            },
            map: new ol.Map({view: new ol.View()})
        });
        expect(data.map.layers[0].layerInfo.times.interval).toBe(31536000000);
    });

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
            useOldAsInterimTiles: true,
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
        var expected = '{"id":216,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","name":"foo","title":"My layer","layerInfo":{"geomType":"point","timeAttribute":"attr1","times":["2001","2002","2003"]},"useOldAsInterimTiles":true,"singleTile":false,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}';
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
        var expected = '{"id":217,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","name":"foo","title":"My layer","layerInfo":{"geomType":"point","timeAttr":"attr1","times":["2001","2002","2003"]},"singleTile":true,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}';
        expect(JSON.stringify(config)).toBe(expected);
    });

    it('should convert a vector layer', function() {
        var mapManager = {
            mapid: 227
        };
        mapManager.map = new ol.Map({view: new ol.View({center: [0,0], zoom: 3})});
        mapManager.map.addLayer(new ol.layer.Vector({
            id: 'foo',
            title: 'My layer',
            layerInfo: {
                wfsUrl: '/geoserver/wfs',
                geomType: 'point',
                timeAttr: 'attr1',
                typeName: 'foo',
                times: ['2001', '2002', '2003']
            }
        }));
        var config = instance.write(mapManager);
        var expected = '{"id":227,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","name":"foo","title":"My layer","layerInfo":{"wfsUrl":"/geoserver/wfs","geomType":"point","timeAttr":"attr1","typeName":"foo","times":["2001","2002","2003"]},"type":"Vector"}]}}';
        expect(JSON.stringify(config)).toBe(expected);
        // if no typeName layer will not get exported
        mapManager.map.getLayers().item(0).get('layerInfo').typeName = undefined;
        config = instance.write(mapManager);
        expected = '{"id":227,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[]}}';
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
