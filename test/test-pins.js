pins = require('../lib/core/time/pins.js');

describe('test storyPins', function() {
    
    describe('StoryPin class', function() {
        it('constructor', function() {
            var sp = new pins.StoryPin({
                title: 'test',
                the_geom: '{"type":"Point","coordinates":[123,321]}',
                id: 22
            });
            expect(sp.get('title')).toBe('test');
            expect(sp.title).toBe('test');
            expect(sp.getId()).toBe(22);
            expect(sp.id).toBe(22);
            var coords = sp.getGeometry().getCoordinates();
            expect(coords[0]).toBe(123);
            expect(coords[1]).toBe(321);
        });
        it('update', function() {
            var sp = new pins.StoryPin({
                title: 'test',
                the_geom: '{"type":"Point","coordinates":[123,321]}'
            });
            expect(sp.content).toBe(null);
            expect(sp.title).toBe('test');
            sp.setProperties({
                title: null,
                content: 'content'
            });
            expect(sp.content).toBe('content');
            expect(sp.title).toBe(null);
            var coords = sp.getGeometry().getCoordinates();
            expect(coords[0]).toBe(123);
            expect(coords[1]).toBe(321);
        });
        it('empty', function() {
            var sp = new pins.StoryPin();
            expect(sp.content).toBe(null);
            expect(sp.title).toBe(null);
        });
    });

    geojson = {
        features: [
            {
                id: 24,
                geometry: { type:'Point', coordinates:[-90,45] },
                properties: {
                    title: 'test',
                    start_time: 1000000
                }
            }
        ]
    };
    describe('loadFromGeoJSON', function() {
        it('works', function() {
            var loaded = pins.loadFromGeoJSON(geojson);
            expect(loaded.length).toBe(1);
            var sp = loaded[0];
            expect(sp.id).toBe(24);
            expect(sp.getGeometry().getCoordinates()[0]).toBe(-90);
            expect(sp.getGeometry().getCoordinates()[1]).toBe(45);
            expect(sp.start_time).toBe(1000000);
            expect(sp.end_time).toBe(null);
        });
        it('works with projection', function() {
            var loaded = pins.loadFromGeoJSON(geojson, ol.proj.get('EPSG:3857'));
            var sp = loaded[0];
            expect(sp.getGeometry().getCoordinates()[0]).toBe(-10018754.171394622);
            expect(sp.getGeometry().getCoordinates()[1]).toBe(5621521.486192066);
        });
    });
    describe('toGeoJSON', function() {
        it('works', function() {
            // to do this correctly, we need to understand the current projection
            // this test just verifies the ol3 format works properly
            var format = new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            });
            var sp = new pins.StoryPin({
                title: 'test',
                the_geom: '{"type":"Point","coordinates":[123,321]}',
                id: 22
            });
            var sp = format.readFeature(format.writeFeature(sp));
            expect(sp.get('title')).toBe('test');
            expect(sp.getId()).toBe(22);
            var coords = sp.getGeometry().getCoordinates();
            expect(coords[0]).toBe(123);
            expect(coords[1]).toBe(321);
        });
    });
});
