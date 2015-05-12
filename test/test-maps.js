var maps = require('../lib/core/time/maps.js');
require('../lib/ng/edit/ogc/module.js');

describe("test maps", function() {
    it("readCapabilitiesTimeDimensions works", function() {
        function makeCaps(config) {
            return {
                Capability: {
                    Layer: {
                        Layer: Object.getOwnPropertyNames(config).map(function(lyr) {
                            return {Name: lyr, Dimension: [{name: 'time', values: config[lyr]}]};
                        })
                    }
                }
            };
        }
        function expectData(args) {
            return expect(maps.readCapabilitiesTimeDimensions(makeCaps(args)));
        };
        function read(values) {
            return maps.readCapabilitiesTimeDimensions(makeCaps({data:values})).data;
        }
        function time(str) {
            return new Date(str).getTime();
        }
        var r = read('1990-01-01T00:00:00.000Z/2009-01-01T00:00:00.000Z/P1Y');
        expect(r.start).toBe(time('1990-01-01T00:00:00.000Z'));
        expect(r.end).toBe(time('2009-01-01T00:00:00.000Z'));
        expect(r.interval).toBe(31536000000);

        expectData({list: '1990'}).toEqual(
                {list: [time('1990')]}
        );
        expectData({list: '1990,1991,1992'}).toEqual(
                {list: [time('1990'),time('1991'),time('1992')]}
        );

        r = read('2000/2001');
        expect(r.start).toBe(time('2000'));
        expect(r.end).toBe(time('2001'));
    });
    it("readCapabilitiesTimeDimensions works for OpenLayers 2 config", function() {
        function makeCaps() {
            return {
                dimensions: {
                    'time': {
                        values: ["1989-01-01T00:00:00.000Z", "1990-01-01T00:00:00.000Z", "1991-01-01T00:00:00.000Z", "1992-01-01T00:00:00.000Z", "1993-01-01T00:00:00.000Z", "1994-01-01T00:00:00.000Z", "1995-01-01T00:00:00.000Z", "1996-01-01T00:00:00.000Z", "1997-01-01T00:00:00.000Z", "1998-01-01T00:00:00.000Z", "1999-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z", "2001-01-01T00:00:00.000Z", "2002-01-01T00:00:00.000Z", "2003-01-01T00:00:00.000Z", "2004-01-01T00:00:00.000Z", "2005-01-01T00:00:00.000Z", "2006-01-01T00:00:00.000Z", "2007-01-01T00:00:00.000Z", "2008-01-01T00:00:00.000Z", "2009-01-01T00:00:00.000Z", "2010-01-01T00:00:00.000Z", "2011-01-01T00:00:00.000Z", "2012-01-01T00:00:00.000Z", "2013-01-01T00:00:00.000Z"]
                    }
                }
            };
        }
        var data = maps.readCapabilitiesTimeDimensions(makeCaps(), true);
        expect(data.length).toBe(25);
        expect(data[0]).toBe(599616000000);
        expect(data[24]).toBe(1356998400000);
    });
    describe('computeVectorRange works', function() {
        var storyLayer, features, range, StoryLayer;

        beforeEach(function() {
            // window.angular.mock.module is work around browserify conflict
            window.angular.mock.module('storytools.edit.ogc');

            inject(function($injector) {
                StoryLayer = $injector.get('StoryLayer');
            });

            storyLayer = new StoryLayer({
                timeAttribute: "time",
                type: "VECTOR"
            });
            storyLayer.getLayer().setSource(new ol.source.Vector());

            features = [
                new ol.Feature({time: 1000})
            ];
            storyLayer.set('features', features);
        });

        it('using features as property', function() {
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(1000);
            expect(range.end).toBe(1000);
        });
        it('using features from source', function() {
            storyLayer.set('features', null);
            storyLayer.getLayer().getSource().addFeatures(features);
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(1000);
            expect(range.end).toBe(1000);
        });
        it('when empty endTimeAttribute', function() {
            storyLayer.set('endTimeAttribute', 'endTime');
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(1000);
            expect(range.end).toBe(1000);
        });
        it('when unsorted mixed data', function() {
            storyLayer.set('endTimeAttribute', 'endTime');
            features.push(new ol.Feature({time: 500}));
            features.push(new ol.Feature({time: 100, endTime: 900}));
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(100);
            expect(range.end).toBe(1000);
        });
        it('with single endAttribute', function() {
            storyLayer.set('endTimeAttribute', 'endTime');
            storyLayer.set('features', [new ol.Feature({endTime: 678})]);
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(678);
            expect(range.end).toBe(678);
        });
        it('when text', function() {
            // works with text
            storyLayer.set('features', [new ol.Feature({time: '2001'})]);
            range = maps.computeVectorRange(storyLayer);
            expect(range.start).toBe(Date.parse('2001'));
            expect(range.end).toBe(Date.parse('2001'));
        });
    });
    describe('filterVectorLayer works', function() {
        var storyLayer, features, StoryLayer;

        function ids() {
            var layer = storyLayer.getLayer();
            var ids = layer.getSource().getFeatures().map(function(f) {
                return f.get('id');
            });
            ids.sort();
            return ids;
        }

        beforeEach(function() {
            // window.angular.mock.module is work around browserify conflict
            window.angular.mock.module('storytools.edit.ogc');
                
            inject(function($injector) {
                StoryLayer = $injector.get('StoryLayer');
            });

            storyLayer = new StoryLayer({
              timeAttribute: "time",
              endTimeAttribute: "endTime",
              type: "VECTOR"
            });
            storyLayer.getLayer().setSource(new ol.source.Vector());
            var id = 1;
            features = [
                new ol.Feature({id:id++, time: 1000}),
                new ol.Feature({id:id++, time: 1000, endTime: 2000}),
                new ol.Feature({id:id++, time: 2000}),
                new ol.Feature({id:id++, time: 2000, endTime: 3000})
            ];
            storyLayer.set('features', features);
        });
        it('filters instants', function() {
            storyLayer.set('endTimeAttribute', null);
            // range before everything
            maps.filterVectorLayer(storyLayer, {start:500, end: 501});
            expect(ids()).toEqual([]);
            // range after everything
            maps.filterVectorLayer(storyLayer, {start:2500, end: 2600});
            expect(ids()).toEqual([]);
            // direct hit (ignores end exclusion)
            maps.filterVectorLayer(storyLayer, {start:2000, end: 2000});
            expect(ids()).toEqual([3,4]);
        });
        it('filters extents', function() {
            // range before everything
            maps.filterVectorLayer(storyLayer, {start:500, end: 501});
            expect(ids()).toEqual([]);
            // range before and after everything
            maps.filterVectorLayer(storyLayer, {start:500, end: 4000});
            expect(ids()).toEqual([1,2,3,4]);
            // excludes 3 due to intersection rules with end
            maps.filterVectorLayer(storyLayer, {start:1000, end:2000});
            expect(ids()).toEqual([1,2]);
            // 1 and 3 included as they are open ended and before
            maps.filterVectorLayer(storyLayer, {start:3000, end:4000});
            expect(ids()).toEqual([1,3,4]);
        });
    });

    describe('MapConfig', function() {

       beforeEach(function() {
              // window.angular.mock.module is work around browserify conflict
              window.angular.mock.module('storytools.edit.ogc');
  
              inject(function($injector) {
                  StoryMap = $injector.get('StoryMap');
                  stStoryMapBuilder = $injector.get('stStoryMapBuilder');
                  stLayerBuilder = $injector.get('stLayerBuilder');
                  $timeout = $injector.get('$timeout');
              });
        });

        it('should transform to Interval object', function(done) {
            var data = JSON.parse('{"id":214,"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"id":"foo","name":"foo","title":"My layer","geomType":"point","attributes": ["attr1", "attr2"],"timeAttribute":"attr1","resolutions":[0,10, 20],"bbox": [0,100,100,200],"latlonBBOX":[-10,-10,10,10],"times":{"start": 631152000000, "end": 1230768000000, "duration": "P1Y"},"singleTile":false,"type":"WMS","url":"http://myserver","params":{"LAYERS":"x"}}]}}');
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.getStoryLayers().on('change:length', function() {
              expect(storyMap.getStoryLayers().item(0).get('times').interval).toBe(31536000000);
              done();
            });
            stStoryMapBuilder.modifyStoryMap(storyMap, data);
            $timeout.flush();
        });

        it('should convert extent, zoom and projection', function() {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 215);
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            var config = storyMap.getState();
            var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[]},"id":215}';
            expect(JSON.stringify(config)).toBe(expected);
        });

        it('should convert a tiled WMS layer', function(done) {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 216); 
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            stLayerBuilder.buildEditableLayer({
              type: 'WMS',
              id: 'foo',
              name: 'x',
              title: 'My layer',
              geomType: 'point',
              timeAttribute: 'attr1',
              times: ['2001', '2002', '2003'],
              url: 'http://myserver',
              latlonBBOX: [-90,-180,90,180],
              bbox: [0,0,1,1],
              resolutions: [100,50,10],
              attributes: ['foo','bar']
            }, storyMap.getMap()).then(function(sl) {
              storyMap.addStoryLayer(sl);
              expect(sl.getLayer() instanceof ol.layer.Tile).toBe(true);
              expect(sl.getLayer().getSource() instanceof ol.source.TileWMS).toBe(true);
              var config = storyMap.getState();
              var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"WMS","id":"foo","name":"x","title":"My layer","geomType":"point","timeAttribute":"attr1","times":["2001","2002","2003"],"url":"http://myserver","latlonBBOX":[-90,-180,90,180],"bbox":[0,0,1,1],"resolutions":[100,50,10],"attributes":["foo","bar"]}]},"id":216}';
              expect(JSON.stringify(config)).toBe(expected);
              done();
            });
            $timeout.flush();
        });

        it('should convert an untiled WMS layer', function(done) {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 217);
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            stLayerBuilder.buildEditableLayer({
                type: 'WMS',
                singleTile: true,
                title: 'My layer',
                id: 'foo',
                name: 'x',
                geomType: 'point',
                timeAttr: 'attr1',
                times: ['2001', '2002', '2003'],
                url: 'http://myserver',
                latlonBBOX: [-90,-180,90,180],
                bbox: [0,0,1,1],
                resolutions: [100,50,10],
                attributes: ['foo','bar']
            }, storyMap.getMap()).then(function(sl) {
                storyMap.addStoryLayer(sl);
                expect(sl.getLayer() instanceof ol.layer.Image).toBe(true);
                expect(sl.getLayer().getSource() instanceof ol.source.ImageWMS).toBe(true);
                var config = storyMap.getState();
                var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"WMS","singleTile":true,"title":"My layer","id":"foo","name":"x","geomType":"point","timeAttr":"attr1","times":["2001","2002","2003"],"url":"http://myserver","latlonBBOX":[-90,-180,90,180],"bbox":[0,0,1,1],"resolutions":[100,50,10],"attributes":["foo","bar"]}]},"id":217}';
                expect(JSON.stringify(config)).toBe(expected);
                done();
            });
            $timeout.flush();
        });

        it('should convert a vector layer', function(done) {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 227);
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            stLayerBuilder.buildEditableLayer({
                type: 'VECTOR',
                id: 'foo',
                title: 'My layer',
                url: '/geoserver/wfs',
                geomType: 'point',
                timeAttr: 'attr1',
                typeName: 'foo',
                times: ['2001', '2002', '2003'],
                latlonBBOX: [-90,-180,90,180],
                bbox: [0,0,1,1],
                features: [],
                resolutions: [100,50,10],
                attributes: ['foo','bar']
            }, storyMap.getMap()).then(function(sl) {
                storyMap.addStoryLayer(sl);
                expect(sl.getLayer() instanceof ol.layer.Vector).toBe(true);
                var config = storyMap.getState();
                var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"VECTOR","id":"foo","title":"My layer","url":"/geoserver/wfs","geomType":"point","timeAttr":"attr1","typeName":"foo","times":["2001","2002","2003"],"latlonBBOX":[-90,-180,90,180],"bbox":[0,0,1,1],"features":[],"resolutions":[100,50,10],"attributes":["foo","bar"]}]},"id":227}';
                expect(JSON.stringify(config)).toBe(expected);
                done();
            });
            $timeout.flush();
        });

        it('should convert an OSM layer', function() {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 218);
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            stStoryMapBuilder.setBaseLayer(storyMap, {
                type: 'OSM'
            });
            var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"OSM","group":"background","visibility":true}]},"id":218}';
            expect(JSON.stringify(storyMap.getState())).toBe(expected);
        });

        it('should convert an MapQuest layer', function() {
            var storyMap = new StoryMap({target: 'foo'});
            storyMap.set('id', 219);
            storyMap.getMap().setView(new ol.View({center: [0,0], zoom: 3}));
            stStoryMapBuilder.setBaseLayer(storyMap, {
                type: 'MapQuest',
                layer: 'sat'
            });
            var expected = '{"map":{"center":[0,0],"projection":"EPSG:3857","zoom":3,"layers":[{"type":"MapQuest","layer":"sat","group":"background","visibility":true}]},"id":219}';
            expect(JSON.stringify(storyMap.getState())).toBe(expected);
        });

    });

});
