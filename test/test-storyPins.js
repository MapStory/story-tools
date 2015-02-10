require('../lib/ng/core/pins/module.js');

describe('test storyPins', function() {
    var StoryPin;
    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('storytools.core.pins');

        inject(function($injector) {
            StoryPin = $injector.get('StoryPin');
        });
    });

    describe('StoryPin class', function() {
        it('constructor', function() {
            var sp = new StoryPin({
                title: 'test',
                the_geom: '{"type":"Point","coordinates":[123,321]}'
            });
            var feature = sp.$feature;
            expect(feature).not.toBe(null);
            expect(feature.get('title')).toBe('test');
            var coords = feature.getGeometry().getCoordinates();
            expect(coords[0]).toBe(123);
            expect(coords[1]).toBe(321);
        });
        it('update', function() {
            var sp = new StoryPin({
                title: 'test',
                the_geom: '{"type":"Point","coordinates":[123,321]}'
            });
            expect(sp.content).toBe(null);
            expect(sp.title).toBe('test');
            sp.update({
                title: null,
                content: 'content'
            });
            expect(sp.content).toBe('content');
            expect(sp.title).toBe(null);
            var feature = sp.$feature;
            var coords = feature.getGeometry().getCoordinates();
            expect(coords[0]).toBe(123);
            expect(coords[1]).toBe(321);
            expect(feature.get('content')).toBe('content');
        });
    });

    describe('StoryPinLayerManager', function() {

    });

});